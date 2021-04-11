import {inputSetSeq} from "./../script/input-set-seq"
import {testScript} from "./../script/test-script"
import {testReportSet} from "./../script/test-report-set"
import {inputScript} from "./../script/input-script"
import {Stepper} from "./stepper";
import {Stage} from "./stage"
import {State} from "./state"
import {Inputs} from "./inputs"
import {TestHelper} from "./test-helper";
import {Sprites} from "./sprites";
const seedrandom = require('seedrandom');
const _ = require('lodash');


class VM {

    constructor (ide) {
        this.ide = ide; //@type {IDE_Morph}
        this.stepper = new Stepper(this);
        this.inputs = new Inputs(this);
        this.stage = new Stage(this);
        this.sprites = new Sprites(this);
        this.state = new State(this);
        this.testHelper = new TestHelper(this);
        this.testReportSet = testReportSet;
        this.stat = {};
        this.stoppedStateProxy = {'success': 0, 'fail': 0};
        this.programStarted = false;
    }


    reset () {
        this.programStarted = false;
        this.stepper.reset();
        this.stoppedStateProxy = {'success': 0, 'fail': 0};
    }

    exitCondition(r, curDuration) {
        let timeOutID = setTimeout(r, curDuration);
        let myself = this;
        let stoppedState = {'success': this.stoppedStateProxy.success, 'fail': this.stoppedStateProxy.fail};
        this.stoppedStateProxy = new Proxy(stoppedState, {
            set: function(stoppedState, key, value){
                console.log('stoppedState, key, value: ',
                    stoppedState, key, value);
                if (key === 'success' && stoppedState.success > 0 && myself.programStarted === true) {
                    console.log('exit because no movement');
                    window.clearTimeout(timeOutID);
                    r();
                }
                return Reflect.set(...arguments);
            }
        })
    }


    async testProject (alias, str){
        for (const item of this.testReportSet) {
            this.stat[item] = {'success': 0, 'fail': 0};
        }
        for (let i = 0; i < inputSetSeq.length; i++) {
            for (let seed of [4]) {
            // for (let seed of [4, 6, 14]) {
                console.log('-----starting---------: ', alias, i, seed);
                seedrandom(seed.toString(), {global: true});
                this.reset();
                let msg;
                let testCases = testScript.concat(inputScript.filter(
                    (el) => {
                        return inputSetSeq[i].name.includes(el.name)
                    }));
                // console.log('testCases: ', testCases);
                this.ide.nextSteps([
                    () => msg = this.ide.showMessage('Opening project...'),
                    () => {
                        this.ide.rawOpenProjectString(str);
                        msg.destroy();
                    },
                    () => {
                        this.stepper.start(testCases);
                        this.ide.world().worldCanvas.focus(); //must have this, otherwise, the keyboard press will not have reactions.
                        window.setTimeout(() => {
                            this.programStarted = true;
                        }, 300);
                    }
                ]);
                let curDuration = inputSetSeq[i].duration;

                // await new Promise((r) => this.exitCondition(r, curDuration));
                await new Promise((r) => setTimeout(r, curDuration));
                console.log("-----ending---------stat: ", this.stat);
                // let conditionsMet = Object.keys(this.stat).map((m) => this.stat[m].success + this.stat[m].fail);
                // console.log(conditionsMet);
            }
        }
        console.log("stat: ", this.stat);
        return this.stat;
    }
}

export {VM};
