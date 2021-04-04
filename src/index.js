const fs = require('fs');
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

let projectInputFolder = 'temp-xmls';

let aliasList = fs.readdirSync(projectInputFolder)
    .filter(fileName =>
        fs.lstatSync(path.join(projectInputFolder, fileName))
            .isFile() && fileName !==".DS_Store"
    );
aliasList.sort().reverse();
for (let alias of aliasList) {
    vm.testProject(projectInputFolder, alias);
}


