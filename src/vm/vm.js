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
        this.accelerationFactor = 2;
        this.stat = {};
        // this.timeOutCall = null;
        // this.myInterval = null;
    }


    reset () {
        this.stepper.reset();
        // clearTimeout(this.timeOutCall);
        // clearInterval(this.myInterval);
    }
     // load file, add inputs and tests, based on file name (alias).
    // str is the project xml.
    async testProject (alias, str){
        for (const item of this.testReportSet) {
            this.stat[item] = {'success': 0, 'fail': 0};
        }
        for (let i = 0; i < inputSetSeq.length; i++) {
            this.reset();
            this.stat['threeSecStateUnchanged'] = {'success': 0, 'fail': 0};
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
                }
            ]);
            let curDuration = inputSetSeq[i].duration;
            // console.log("-------------------------i----------------: ", i);
            let myself = this;
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms))
            }
            let loopCounter = 0;
            async function loop() {
                console.log("myself.stat.threeSecStateUnchanged.success: ",
                    myself.stat.threeSecStateUnchanged.success);
                console.log('loopCounter: ', loopCounter);
                while ((myself.stat.threeSecStateUnchanged.success <= 3) &&
                       loopCounter < curDuration/500) {
                    loopCounter ++;
                    await delay(500);
                }
            }
            await loop();
            console.log("out of await");
            // for (const item of this.testHelper.statistics) {
            //     if (Object.keys(stat).includes(item.name)) {
            //         stat[item.name][item.status ? 'success' : 'fail']++;
            //     }
            // }
            this.stat['threeSecStateUnchanged'].success = 10;
            let conditionsMet = Object.keys(this.stat).map((m) => this.stat[m].success + this.stat[m].fail);
            console.log(conditionsMet);
            if (Math.min(...conditionsMet) > 5) {
                console.log("met early stat: ", this.stat);
                return this.stat;
            }
        }
        console.log("stat: ", this.stat);
        return this.stat;
    }
}

export {VM};
