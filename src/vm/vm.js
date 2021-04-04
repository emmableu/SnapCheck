import {testReportSet} from "./../script/test-set"
import {inputSetSeq} from "./../script/input-set-seq"
import {testScript} from "./../script/test-script"
import {inputScript} from "./../script/input-script"
const fs = require('fs');

const _ = require('lodash');

import {Stepper} from "./stepper";
import {Stage} from "./stage"
import {State} from "./state"
import {Inputs} from "./inputs"
import {TestDriver} from "./test-driver";

class VM {

    constructor (ide) {
        this.ide = ide; //@type {IDE_Morph}
        this.projectStarted = false;
        this.stepper = new Stepper(this);
        this.inputs = new Inputs(this);
        this.stage = new Stage(this);
        this.testDriver = new TestDriver(this);
        // this.inputsSeq =
        // this.allTests = inputScript.concat(testScript); // a list of @type {TestCase}s.
    }

    reset () {
        this.stepper.reset();
        this.instrumenter.reset();
        this.inputs.reset();
        this.projectStarted = false;
    }

    exitCondition (r, curDuration)  {
        // console.log("SnapCheck.testController.statistics: ", SnapCheck.testController.statistics);
        const timeOutCall = setTimeout(r, curDuration);
        const myInterval= setInterval(()=> {
            const threeSecUnChangedStat = this.testDriver.statistics.filter((r) => {
                return r.name === 'threeSecStateUnchanged'
            });

            // console.log('SnapCheck.stat[\'threeSecStateUnchanged\']: ', threeSecUnChangedStat);
            if (threeSecUnChangedStat.length > 0) {
                if (threeSecUnChangedStat[threeSecUnChangedStat.length - 1].status) {
                    clearTimeout(timeOutCall);
                    clearInterval(myInterval);
                    r();
                    console.log("interval and timeout cleared")
                }
            }
        }, 5000);

    };

     // load file, add inputs and tests, based on file name (alias).
    // i is the number of time (each time use different inputs)
    async testProject (projectInputFolder, alias){
        for (let i = 0; i < inputSetSeq.length; i++) {
            let str = fs.readFile(projectInputFolder, alias);
            console.log("str: ", str);
            let msg;
            let testCases = testScript.concat(inputScript.filter(
                (el) => {
                    inputSetSeq[i].name.includes(el.name);
                }
            ));
            this.ide.nextSteps([
                () => msg = this.ide.showMessage('Opening project...'),
                () => {
                    this.ide.rawOpenProjectString(str);
                    msg.destroy();
                },
                () => {
                    this.stepper.start(testCases);
                }
            ]);
            const curDuration = inputSetSeq[i].duration;
            await new Promise((r) => this.exitCondition(r, curDuration));
            // stop();
        }
    }
}

export {VM};
