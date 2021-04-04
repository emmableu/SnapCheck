import {IDE_Morph} from "isnap/src/gui";
import {WorldMorph} from "isnap/src/morphic";
import {extend, extendObject} from "isnap/src/isnap/util";
import {VM} from "./vm/vm"

let world, ide, vm;

window.onload = function () {
    world = new WorldMorph(document.getElementById('world'),
        true, true);
    world.worldCanvas.focus();
    ide = new IDE_Morph();
    ide.openIn(world);
    vm = new VM(ide);
    loop();
    if (window.onWorldLoaded) {
        window.onWorldLoaded();
    }
};
function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}


for (let alias of aliasList) {
    vm.testProject(alias);
}


