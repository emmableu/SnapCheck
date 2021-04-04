class State {
    constructor (vm) {
        this.vm = vm;
        this.update();
    }
    update () {
        let targetSeq = [this.vm.stage, this.vm.sprites];
        for (let target of targetSeq){
            target.update();
        }
    }

    getFirstVariableValue (isCur = true) {
        /**
         * @type{Any}
         */
        if (isCur) {
            return this.variableCache.cur.firstVariable;
        }
        return this.variableCache.old.firstVariable;

    }
}
export {State};
