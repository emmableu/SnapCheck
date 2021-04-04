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
    loop();
    if (window.onWorldLoaded) {
        window.onWorldLoaded();
    }
};
function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}
console.log("$: ", $);
const getProjectList = async function () {
    return await Promise.resolve(
        $.ajax({
            url:`${serverUrl}/project_list`,
            type: "GET",
            crossDomain: true
        }));
};
const getProject = async function (alias) {
    return await Promise.resolve($.get({
        url: `${serverUrl}/project_file/${alias}`,
        dataType: 'text'
    }));
};

const test = async function () {
    let projectList = await getProjectList();
    for (let alias of projectList) {
        let projectXML = getProject(alias);
        vm.testProject(alias, projectXML).then(r => null);
    }
};

test();
