class Stage {
    constructor (vm) {
        this.ide = vm.ide;
    }
    update() {
        let globalVars = this.ide.stage.globalVariables().vars;
        this.data =  {
            stageVar: Object.keys(globalVars)
                .map(v => ({
                    name: v,
                    value: globalVars[v].value
                })),
        };
    }
}

export {Stage};
