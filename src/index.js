import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import {IDE_Morph} from "isnap/src/gui";
import {WorldMorph} from "isnap/src/morphic";
import {VM} from "./vm/vm"

let world, ide, vm;
// const serverUrl = 'http://localhost:3000';
const serverUrl = 'http://localhost:5000';

window.onload = function () {
    world = new WorldMorph(document.getElementById('world'),
        true, true);
    world.worldCanvas.focus();
    ide = new IDE_Morph();
    ide.openIn(world);
    vm = new VM(ide);
    test();
    loop();
};
function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}
console.log("$: ", $);
const getAliasList = async function () {
    return await Promise.resolve(
        $.ajax({
            url:`${serverUrl}/alias_list`,
            type: "GET",
            crossDomain: true
        }));
};
const getFile = async function (alias) {
    let str = await Promise.resolve($.get({
        url: `${serverUrl}/alias_file/${alias}`,
        dataType: 'text'
    }));
    return str.replace(/\\/gm, '');
};

const test = async function () {
    let aliasList = await getAliasList();
    console.log("aliasList: ", aliasList);
    for (let alias of aliasList) {
        let str = await getFile(alias);
        await vm.testProject(alias, str);
    }
};

// vm = new VM(ide);



