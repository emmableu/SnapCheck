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
    }

    exitCondition (r, curDuration)  {
        // console.log("SnapCheck.testController.statistics: ", SnapCheck.testController.statistics);
        const timeOutCall = setTimeout(r, curDuration);
        const myInterval= setInterval(()=> {
            const threeSecUnChangedStat = this.testHelper.statistics.filter((r) => {
                return r.name === 'threeSecStateUnchanged'
            });

            console.log('SnapCheck.stat[\'threeSecStateUnchanged\']: ', threeSecUnChangedStat);
            if (threeSecUnChangedStat.length > 0) {
                if (threeSecUnChangedStat[threeSecUnChangedStat.length - 1].status) {
                    clearTimeout(timeOutCall);
                    clearInterval(myInterval);
                    r();
                    console.log("interval and timeout cleared")
                }
            }
        }, 100);

    };

    reset () {
        this.stepper.reset();
    }
     // load file, add inputs and tests, based on file name (alias).
    // str is the project xml.
    async testProject (alias, str){
        let stat = {};
        for (const item of this.testReportSet) {
            stat[item] = {'success': 0, 'fail': 0};
        }
        for (let i = 0; i < inputSetSeq.length; i++) {
            this.reset();
            let msg;
            let testCases = testScript.concat(inputScript.filter(
                (el) => {
                    return inputSetSeq[i].name.includes(el.name)
                }));
            console.log('testCases: ', testCases);
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
            for (const item of this.testHelper.statistics) {
                if (Object.keys(stat).includes(item.name)) {
                    stat[item.name][item.status ? 'success' : 'fail']++;
                }
            }
            console.log("stat: ", stat);
        }
        console.log("stat: ", stat);
        return stat;
    }
}

export {VM};
