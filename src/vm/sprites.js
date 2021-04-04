import {Sprite} from "./sprite";

class Sprites {
    constructor (vm) {
        this.ide = vm.ide;
        this.update();
    }
    update() {
        let allSpriteMorphs =  this.ide.sprites.contents;
        this.data = {};
        for (let s of allSpriteMorphs){
            this.data[s.name] = Sprite(this, s).data;
        }
    }
}

export {Sprites};
