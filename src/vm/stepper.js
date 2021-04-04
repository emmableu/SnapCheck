import {TestCase, Callback} from './test-case'

class Stepper {

    constructor (vm) {
        /**
         * @type {vm}
         */
        this.vm = vm;

        /**
         * @type {TestCase[]}
         */
        this.testCases = [];

        /**
         * @type {Boolean}
         */
        this.running = false;

        /**
         * @type{number}
         */
        this.stepCount = 0;

        /**
         * @type {Callback[]}
         */
        this._callbacks = [];

        /**
         * @type {number}
         */
        this._stepDuration = 50;


    }

    reset () {
        this.clearTestCases();
        this.running = false;
        this.stepCount = 0;
    }

    addTestCase (testCase) {
        this.testCases.unshift(testCase);
    }

    removeTestCaseByName (name) {
        this.testCases.filter(t => t.name === name).forEach(t => t.withdraw());
    }

    clearTestCases () {
        this.testCases = [];
        this._callbacks = [];
    }

    async run () {
        if (!this.vm.projectStarted) {
            await this.vm.start();
        }
        this.running = true;
        this.vm.state.update();

    }

    stop () {
        console.log('stop stepper');
        this.running = false;
    }

    step () {

        this.stepCount++;
        // console.log(this.testCases);

        this.testCases.forEach(t => {
            t._precondition = t.precondition();
        });

        // firing testCases are those whose callback will be added
        const firingTestCases = this.testCases
            .filter(t => t.active)
            // either it is a regular testCase and precondition is satisfied
            // or it is debounced testCase at trailling edge
            .filter(t => (!t.debounce && t._precondition) ||
                (t.debounce && t._continuing && !t._precondition));

        // save states for testCases
        this.testCases.filter(t => t.active)
        // either it is a firing regular testCase
        // or a debounced testCase at leading edge
            .filter(t => (!t.debounce && t._precondition) ||
                (t.debounce && !t._continuing && t._precondition))
            .forEach(t => {
                t._savedState = t.stateSaver();
            });

        // set continuing status for all testCases
        this.testCases.forEach(t => {
            t._continuing = t._precondition;
        });

        // get the callbacks of these testCases
        const callbacks = firingTestCases
            .map(t => {
                t.deactivate();
                t._callback = new Callback(
                    t._savedState,
                    t.delay,
                    t.callback,
                    t);
                return t._callback;
            });
        // add all activated callbacks to the callback queues
        this._callbacks.unshift(...callbacks);

        // fire callback if delay reaches 0
        this._callbacks.forEach(c => c.countdown());

        // cleanup callbacks and testCases that are no longer alive
        this._callbacks = this._callbacks.filter(c => c.alive);
        this.testCases = this.testCases.filter(t => t.alive);

        this.vm.inputs.tick();

        /* this.vm.resume();
        return new Promise(resolve =>
            setTimeout(() => {
                this.vm.pause();
                this.vm.state.update();

                resolve(this.STEP_FINISHED);
            }, this._stepDuration)
        );*/
    }

    static get STEP_FINISHED () {
        return 'step_done';
    }
}

export {Stepper};
