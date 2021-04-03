import {IDE_Morph} from "isnap/src/gui";
import {WorldMorph} from "isnap/src/morphic";
var world, ide;
window.onload = function () {
    world = new WorldMorph(document.getElementById('world'),
        true, true);
    world.worldCanvas.focus();
    ide = new IDE_Morph();
    ide.openIn(world);
    loop();
    if (window.onWorldLoaded) {
        window.onWorldLoaded();
    }
};
function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}
