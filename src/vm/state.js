class State {
    constructor (vm) {
        this.vm = vm;
    }
    update () {
        let targetSeq = [this.vm.stage, this.vm.sprites];
        for (let target of targetSeq){
            target.update();
        }
    }

    getFirstVariableValue () {
        /**
         * @type{Any}
         */
        return this.vm.ide.stage.data.stageVar;

    }
}
export {State};
