import * as BABYLON from 'babylonjs';
import { EditControl } from '../dist/EditControl';

let box, box1, box2, box3;
let editControl, ec1, ec2, ec3;
//let camera;

window.onload = function () {
    main();
}

let main = function () {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("renderCanvas");
    let engine = new BABYLON.Engine(canvas, true);
    let scene = addScene(engine);
    let camera = addCamera(scene, canvas);
    addGrid(scene);
    addBoxes(scene);
    addEditControls(camera, canvas)

    setButtons(camera);

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}


let addScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.75, 0.75, 0.75, 1);
    let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = .5;
    return scene;
};

let addCamera = function (scene, canvas) {
    let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 4, Math.PI / 4,
        20, new BABYLON.Vector3(0, 0, 0), scene);
    camera.wheelPrecision = 15;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
    return camera;
}

let addGrid = function (scene) {
    let ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 10, scene);
    let gridMaterial = new BABYLON.StandardMaterial("Grid Material", scene);
    gridMaterial.wireframe = true;
    ground.material = gridMaterial;
}

let addBoxes = function (scene) {
    let mat1 = new BABYLON.StandardMaterial("mat", scene);
    let mat2 = new BABYLON.StandardMaterial("mat2", scene);
    let mat3 = new BABYLON.StandardMaterial("mat3", scene);

    mat1.diffuseColor = BABYLON.Color3.Red();
    mat2.diffuseColor = BABYLON.Color3.Teal();
    mat3.diffuseColor = BABYLON.Color3.Magenta();

    box1 = BABYLON.MeshBuilder.CreateBox("box1", { height: 5, width: 3, depth: 2 });
    box2 = BABYLON.MeshBuilder.CreateBox("box2", { height: 3, width: 2, depth: 1 });
    box3 = BABYLON.MeshBuilder.CreateBox("box3", { height: 2, width: 1, depth: 2 });

    box1.rotationQuaternion = BABYLON.Quaternion.Identity();
    box2.rotationQuaternion = BABYLON.Quaternion.Identity();
    box3.rotationQuaternion = BABYLON.Quaternion.Identity();

    box1.position = new BABYLON.Vector3(0, 1, 0);
    box2.position = new BABYLON.Vector3(-4, 0, 0);
    box3.position = new BABYLON.Vector3(-4, 0, 0);

    box1.material = mat1;
    box2.material = mat2;
    box3.material = mat3;

    box2.parent = box1;
    box3.parent = box2;
}

let addEditControls = function (camera, canvas) {
    ec1 = attachEditControl(box1, camera, canvas);
    ec2 = attachEditControl(box2, camera, canvas);
    ec3 = attachEditControl(box3, camera, canvas);

    box = box1;
    editControl = ec1;
}

let attachEditControl = function (mesh, camera, canvas) {
    mesh.rotationQuaternion = BABYLON.Quaternion.Identity();
    let ec = new EditControl(mesh, camera, canvas, 0.5, false);
    ec.enableTranslation();
    ec.setRotSnapValue(3.14 / 18);
    ec.setTransSnapValue(0.5);
    ec.setScaleSnapValue(0.25);
    ec.addActionStartListener(actionStartListener);
    ec.addActionListener(actionListener);
    ec.addActionEndListener(actionEndListener);
    return ec;
}

let actionStartListener = function (actionType) {
    if (actionType === 0) {
        console.log("translation started");
    } else if (actionType === 1) {
        console.log("rotation started");
    } else if (actionType === 2) {
        console.log("scaling started");
    }
}
let actionListener = function (actionType) {
    if (actionType === 0) {
        console.log("translating");
    } else if (actionType === 1) {
        //console.log("rotating");
    } else if (actionType === 2) {
        console.log("scaling");
    }
}
let actionEndListener = function (actionType) {
    if (actionType === 0) {
        console.log("translation done");
    } else if (actionType === 1) {
        console.log("rotation done");
    } else if (actionType === 2) {
        console.log("scaling done");
    }
}

let setButtons = function (camera) {

    let hideButton = document.getElementById("hide");
    hideButton.onclick = function () {
        if (editControl.isHidden()) {
            editControl.show();
        } else
            editControl.hide();
    };

    let transButton = document.getElementById("trans");
    let rotButton = document.getElementById("rotate");
    let scaleButton = document.getElementById("scale");
    transButton.onclick = function () {
        editControl.enableTranslation();
    };
    rotButton.onclick = function () {
        editControl.enableRotation();
    };
    scaleButton.onclick = function () {
        editControl.enableScaling()
        if (!editControl.isLocal()) {
            alert("Please note that you cannot scale in global mode");
        }
    };

    let snapTButton = <HTMLInputElement>document.getElementById("snaptrans");
    let snapRButton = <HTMLInputElement>document.getElementById("snaprot");
    let snapSButton = <HTMLInputElement>document.getElementById("snapscale");
    snapTButton.checked = false;
    snapRButton.checked = false;
    snapSButton.checked = false;
    snapTButton.onclick = function () {
        editControl.setTransSnap(snapTButton.checked);
    };
    snapRButton.onclick = function () {
        editControl.setRotSnap(snapRButton.checked);
    };
    snapSButton.onclick = function () {
        editControl.setScaleSnap(snapSButton.checked);
    };

    let boundTButton = <HTMLInputElement>document.getElementById("boundTrans");
    let boundRButton = <HTMLInputElement>document.getElementById("boundRot");
    let boundSButton = <HTMLInputElement>document.getElementById("boundScale");
    boundTButton.checked = false;
    boundRButton.checked = false;
    boundSButton.checked = false;
    boundTButton.onclick = function () {
        if (boundTButton.checked) {
            editControl.setTransBounds(
                new BABYLON.Vector3(-5, -5, -5),// min
                new BABYLON.Vector3(5, 5, 5)      // max
            );
        } else {
            editControl.removeTransBounds();
        }
    };
    boundRButton.onclick = function () {
        alert("Rotation Bounds has not been implemented yet");
    }
    boundSButton.onclick = function () {
        if (boundSButton.checked) {
            editControl.setScaleBounds(
                // new BABYLON.Vector3(0.00000001,0.00000001,0.00000001),     // works
                new BABYLON.Vector3(0, 0, 0),// causes bug
                new BABYLON.Vector3(2, 2, 2)      // max
            );
        } else {
            editControl.removeScaleBounds();
        }
    };

    let rotGuideFull = <HTMLInputElement>document.getElementById("rotGuideFull");
    rotGuideFull.checked = false;
    rotGuideFull.onclick = function () {
        editControl.setRotGuideFull(rotGuideFull.checked);
    }

    let undoButton = document.getElementById("undo");
    let redoButton = document.getElementById("redo");
    undoButton.onclick = function () {
        editControl.undo();
    };
    redoButton.onclick = function () {
        editControl.redo();
    };

    let focusButton = document.getElementById("focus");
    focusButton.onclick = function () {
        camera.target.copyFrom(box.getAbsolutePosition());
    };

    let pRotButton = document.getElementById("pRot");
    let eulerButton = document.getElementById("euler");
    pRotButton.onclick = function () {
        console.log(box.rotation);
        console.log(box.rotationQuaternion);
    };
    let euler = false;
    eulerButton.onclick = function () {
        euler = !euler;
        editControl.returnEuler(euler);
        console.log("enable euler : " + euler);
    };

    let selectBox1 = <HTMLInputElement>document.getElementById("selectBox1");
    let selectBox2 = <HTMLInputElement>document.getElementById("selectBox2");
    let selectBox3 = <HTMLInputElement>document.getElementById("selectBox3");
    let switchBox = function () {
        if (selectBox1.checked) {
            editControl = ec1;
            box = box1;
        } else if (selectBox2.checked) {
            editControl = ec2;
            box = box2;
        } else {
            editControl = ec3;
            box = box3;
        }
        switchSpace();
        snapTButton.onclick(null);
        snapRButton.onclick(null);
        snapSButton.onclick(null);
        boundTButton.onclick(null);
        boundSButton.onclick(null);
        rotGuideFull.onclick(null);
    }
    selectBox1.onclick = switchBox;
    selectBox2.onclick = switchBox;
    selectBox3.onclick = switchBox;

    let local = <HTMLInputElement>document.getElementById("local");
    let global = <HTMLInputElement>document.getElementById("global");
    let switchSpace = function () {
        editControl.setLocal(local.checked);
        if (editControl.isScalingEnabled() && !editControl.isLocal()) {
            alert("Please note that you cannot scale in global mode");
        }
    };
    local.onclick = switchSpace;
    global.onclick = switchSpace;
}





