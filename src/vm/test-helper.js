const {TestCase} = require('./test-case');
const _ = require('lodash');


class TestHelper {

    constructor (vm) {

        /**
         * @type {vm}
         */
        this.vm = vm;

        this.addTestCase = this.vm.stepper.addTestCase.bind(this.vm.stepper);
        this.removeTestCaseByName = this.vm.stepper.removeTestCaseByName.bind(this.vm.stepper);
        this.clearTestCases = this.vm.stepper.clearTestCases.bind(this.vm.stepper);
        this.state = this.vm.state;
        this.isKeyDown = this.vm.inputs.isKeyDown.bind(this.vm.inputs);
        this.inputKey = this.vm.inputs.inputKey.bind(this.vm.inputs);
        this.getFirstVariableValue = this.vm.state.getFirstVariableValue
            .bind(this.vm.state);
        this.random = _.random.bind(_);
        this.statistics = []
    }

    getSpriteByName (name) {
        return this.vm.sprites.data[name];
    }

    spriteIsTouching (nameA, nameB) {
        return this.getSpriteByName(nameA).touchSprites.includes(nameB);
    }

    spriteIsOnEdge (name, arrayOfEdges) {
        return arrayOfEdges.filter(r => this.getSpriteByName(name).touchEdges.includes(r)).length > 0;
    }

    clearStatistics () {
        this.statistics = [];
    }

    reportCase (testName, status, info) {
        this.statistics.push({name: testName, status: status, info: info});
    }

    bindTestCase (tr) {
        return new TestCase(
            tr.name,
            tr.precondition.bind(null, this),
            tr.callback.bind(null, this),
            tr.stateSaver.bind(null, this),
            tr.delay,
            tr.once,
            tr.debounce
        );
    }

    addTestCaseByName (name) {
        this.addTestCase(this.getTestCaseByName(name));
    }

    getTestCaseByName (name) {
        const tr = this.vm.stepper.testCases.find(t => t.name === name);
        return this.bindTestCase(tr);
    }

    newTestCase (
        name, precondition, callback,
        // eslint-disable-next-line no-unused-vars
        stateSaver = t => null,
        delay = 0, once = true, debounce = false
    ) {
        return new TestCase(
            name,
            precondition.bind(null, this),
            callback.bind(null, this),
            stateSaver.bind(null, this), delay, once, debounce
        );
    }

    get keysDown () {
        return this.vm.inputs.keysDown;
    }
}

export {TestHelper};