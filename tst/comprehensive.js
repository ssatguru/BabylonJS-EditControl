//import  {EditControl} from 'babylonjs-editcontrol';
//import * as BABYLON from 'babylonjs';
var box, box1, box2, box3;
var commonEC, ec1, ec2, ec3;
//let camera;
window.onload = function () {
    main();
};
var main = function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = addScene(engine);
    var camera = addCamera(scene, canvas);
    addGrid(scene);
    addBoxes(scene);
    addEditControls(camera, canvas);
    setButtons(camera);
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener("resize", function () {
        engine.resize();
    });
};
var addScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.75, 0.75, 0.75, 1);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = .5;
    return scene;
};
var addCamera = function (scene, canvas) {
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 4, Math.PI / 4, 20, new BABYLON.Vector3(0, 0, 0), scene);
    camera.wheelPrecision = 15;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
    return camera;
};
var addGrid = function (scene) {
    var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 10, scene);
    var gridMaterial = new BABYLON.StandardMaterial("Grid Material", scene);
    gridMaterial.wireframe = true;
    ground.material = gridMaterial;
};
var addBoxes = function (scene) {
    var mat1 = new BABYLON.StandardMaterial("mat", scene);
    var mat2 = new BABYLON.StandardMaterial("mat2", scene);
    var mat3 = new BABYLON.StandardMaterial("mat3", scene);
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
};
var addEditControls = function (camera, canvas) {
    ec1 = attachEditControl(box1, camera, canvas);
    ec2 = attachEditControl(box2, camera, canvas);
    ec3 = attachEditControl(box3, camera, canvas);
    box = box1;
    commonEC = ec1;
};
var attachEditControl = function (mesh, camera, canvas) {
    mesh.rotationQuaternion = BABYLON.Quaternion.Identity();
    var ec = new EditControl(mesh, camera, canvas, 0.5, false);
    ec.enableTranslation();
    ec.setRotSnapValue(3.14 / 18);
    ec.setTransSnapValue(0.5);
    ec.setScaleSnapValue(0.25);
    ec.addActionStartListener(actionStartListener);
    ec.addActionListener(actionListener);
    ec.addActionEndListener(actionEndListener);
    return ec;
};
var actionStartListener = function (actionType) {
    if (actionType === 0) {
        console.log("translation started");
    }
    else if (actionType === 1) {
        console.log("rotation started");
    }
    else if (actionType === 2) {
        console.log("scaling started");
    }
};
var actionListener = function (actionType) {
    if (actionType === 0) {
        console.log("translating");
    }
    else if (actionType === 1) {
        //console.log("rotating");
    }
    else if (actionType === 2) {
        console.log("scaling");
    }
};
var actionEndListener = function (actionType) {
    if (actionType === 0) {
        console.log("translation done");
    }
    else if (actionType === 1) {
        console.log("rotation done");
    }
    else if (actionType === 2) {
        console.log("scaling done");
    }
};
var setButtons = function (camera) {
    var hideButton = document.getElementById("hide");
    hideButton.onclick = function () {
        if (commonEC.isHidden()) {
            commonEC.show();
        }
        else
            commonEC.hide();
    };
    var transButton = document.getElementById("trans");
    var rotButton = document.getElementById("rotate");
    var scaleButton = document.getElementById("scale");
    transButton.onclick = function () {
        commonEC.enableTranslation();
    };
    rotButton.onclick = function () {
        commonEC.enableRotation();
    };
    scaleButton.onclick = function () {
        commonEC.enableScaling();
        if (!commonEC.isLocal()) {
            alert("Please note that you cannot scale in global mode");
        }
    };
    var snapTButton = document.getElementById("snaptrans");
    var snapRButton = document.getElementById("snaprot");
    var snapSButton = document.getElementById("snapscale");
    snapTButton.checked = false;
    snapRButton.checked = false;
    snapSButton.checked = false;
    snapTButton.onclick = function () {
        commonEC.setTransSnap(snapTButton.checked);
    };
    snapRButton.onclick = function () {
        commonEC.setRotSnap(snapRButton.checked);
    };
    snapSButton.onclick = function () {
        commonEC.setScaleSnap(snapSButton.checked);
    };
    var boundTButton = document.getElementById("boundTrans");
    var boundRButton = document.getElementById("boundRot");
    var boundSButton = document.getElementById("boundScale");
    boundTButton.checked = false;
    boundRButton.checked = false;
    boundSButton.checked = false;
    boundTButton.onclick = function () {
        if (boundTButton.checked) {
            commonEC.setTransBounds(new BABYLON.Vector3(-5, -5, -5), // min
            new BABYLON.Vector3(5, 5, 5) // max
            );
        }
        else {
            commonEC.removeTransBounds();
        }
    };
    boundRButton.onclick = function () {
        alert("Rotation Bounds has not been implemented yet");
    };
    boundSButton.onclick = function () {
        if (boundSButton.checked) {
            commonEC.setScaleBounds(
            // new BABYLON.Vector3(0.00000001,0.00000001,0.00000001),     // works
            new BABYLON.Vector3(0, 0, 0), // causes bug
            new BABYLON.Vector3(2, 2, 2) // max
            );
        }
        else {
            commonEC.removeScaleBounds();
        }
    };
    var rotGuideFull = document.getElementById("rotGuideFull");
    rotGuideFull.checked = false;
    rotGuideFull.onclick = function () {
        commonEC.setRotGuideFull(rotGuideFull.checked);
    };
    var undoButton = document.getElementById("undo");
    var redoButton = document.getElementById("redo");
    undoButton.onclick = function () {
        commonEC.undo();
    };
    redoButton.onclick = function () {
        commonEC.redo();
    };
    var focusButton = document.getElementById("focus");
    focusButton.onclick = function () {
        camera.target.copyFrom(box.getAbsolutePosition());
    };
    var pRotButton = document.getElementById("pRot");
    var eulerButton = document.getElementById("euler");
    pRotButton.onclick = function () {
        console.log(box.rotation);
        console.log(box.rotationQuaternion);
    };
    var euler = false;
    eulerButton.onclick = function () {
        euler = !euler;
        commonEC.returnEuler(euler);
        console.log("enable euler : " + euler);
    };
    var selectBox1 = document.getElementById("selectBox1");
    var selectBox2 = document.getElementById("selectBox2");
    var selectBox3 = document.getElementById("selectBox3");
    var switchBox = function () {
        if (selectBox1.checked) {
            commonEC = ec1;
            box = box1;
        }
        else if (selectBox2.checked) {
            commonEC = ec2;
            box = box2;
        }
        else {
            commonEC = ec3;
            box = box3;
        }
        switchSpace();
        snapTButton.onclick(null);
        snapRButton.onclick(null);
        snapSButton.onclick(null);
        boundTButton.onclick(null);
        boundSButton.onclick(null);
        rotGuideFull.onclick(null);
    };
    selectBox1.onclick = switchBox;
    selectBox2.onclick = switchBox;
    selectBox3.onclick = switchBox;
    var local = document.getElementById("local");
    var global = document.getElementById("global");
    var switchSpace = function () {
        commonEC.setLocal(local.checked);
        if (commonEC.isScalingEnabled() && !commonEC.isLocal()) {
            alert("Please note that you cannot scale in global mode");
        }
    };
    local.onclick = switchSpace;
    global.onclick = switchSpace;
};
//# sourceMappingURL=Test-EditControl.js.map