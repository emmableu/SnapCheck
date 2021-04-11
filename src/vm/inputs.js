class Input {

    constructor (vm, name, timeout = 1) {

        this.vm = vm;

        this.name = name;

        this.timeout = timeout;

        /**
         * @type{boolean} Inactive inputs will be cleaned
         */
        this.active = true;

    }

    tick () {
        this.timeout--;
        if (this.timeout < 0) {
            this.release();
        }
    }

    release () {
        this.active = false;
        this.vm.ide.stage.removePressedKey(this.name);
    }
}

class Inputs {

    constructor (vm) {
        /**
         * @type{vm}
         */
        this.vm = vm;
        /**
         * @type{Array<Input>}
         */
        this._inputs = [];

    }

    inputKey (key, duration) {
        this.vm.ide.world().worldCanvas.focus();
        this.vm.ide.stage.fireKeyEvent(key);
        // console.log('key: ', key);

        const keyInput = this._inputs.find(x => x.name === key);
        if (keyInput) {
            keyInput.active = false;
        }
        this._inputs.push(new Input(this.vm,
            key,
            duration
        ));

    }

    tick () {
        this._inputs.forEach(x => x.tick());
        this._inputs = this._inputs.filter(x => x.active);
    }

    reset () {
        this._inputs.forEach(x => x.release());
        this._inputs = [];
    }

    isKeyDown (key) {
        return this.keysDown.includes(key);
    }

    get keysDown () {
        const keysPressed = this.vm.ide.stage.keysPressed;
        return Object.keys(keysPressed).filter(k => keysPressed[k]);
    }

}

export {Inputs}
