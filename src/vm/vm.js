import {inputScript} from "./../script/input-script"
import {testScript} from "./../script/test-script"

const _ = require('lodash');
const Stepper = require('./stepper.js');
const Inputs = require('./inputs.js');
const Variables = require('./variables.js');
const {Cache, State} = require('./state');
// const Instrumenter = require('./instrumenter');



class VM {

    constructor (ide) {
        this.ide = ide; //@type {IDE_Morph}
        this.projectStarted = false;
        this.stepper = new Stepper(this);
        this.inputs = new Inputs(this);
        this.variables = new Variables(this);
        this.inputScript = inputScript;
        this.testScript = testScript;
    }

    reset () {
        this.stepper.reset();
        this.instrumenter.reset();
        this.inputs.reset();
        this.projectStarted = false;
    }

    async loadFile(alias){

    }

    runInputs(){

    }

    runTests(){

    }

     // load file, add inputs and tests, based on file name (alias).
    loadTest (alias){
        let str = this.loadFile(alias);
        let msg;
        this.ide.nextSteps([
            () => msg = this.ide.showMessage('Opening project...'),
            () => {
                this.ide.rawOpenProjectString(str);
                msg.destroy();
            },
            () =>{
                this.runInputs();
                this.runTests();
            }
        ]);
    }
}

export {VM};
