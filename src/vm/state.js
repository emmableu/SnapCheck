class State {
    constructor (vm) {
        this.vm = vm;
    }
    update () {
        let targetSeq = [this.vm.stage, this.vm.sprites];
        if (this.vm.sprites.data !== undefined) {
            this.old = {
                'stage': this.vm.stage.data,
                'sprites': this.vm.sprites.data
            }
        }
        for (let target of targetSeq){
            target.update();
        }
    }

    getAllVars (state='cur') {
        /**
         * @type{Any}
         */
        let vars;
        let spritesData;
        if (state === 'old'){
            vars = this.old.stage.stageVar;
            spritesData = this.old.sprites;
        }
        else {
            vars = this.vm.stage.data.stageVar;
            spritesData = this.vm.sprites.data;
        }

        let retArray = vars.map(a => parseInt(a.value));
        let ret = retArray.reduce((a, b) => a + b, 0);
        for (let sprite of Object.keys(spritesData)){
            let tempArray =  spritesData[sprite].variables.map(a => parseInt(a.value));
            ret += tempArray.reduce((a, b) => a + b, 0);
        }
        // console.log("vars: ", vars);
        // console.log("ret: ", ret);
        return ret;
    }
}
export {State};
