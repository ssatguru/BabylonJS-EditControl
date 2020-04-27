window.onload = function () {
  main();
};

let main = function () {
  let canvas = document.getElementById("renderCanvas");
  let engine = new BABYLON.Engine(canvas, true);
  let scene = createScene(engine);
  let camera = addCamera(scene, canvas);
  addGUI();
  addGrid(scene);
  let box = addBox(scene);
  let editControl = attachEditControl(box, camera, canvas);
  setButtons(editControl, canvas);

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });
};

let createScene = function (engine) {
  let scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.75, 0.75, 0.75);
  let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.5;
  return scene;
};

let addCamera = function (scene, canvas) {
  let camera = new BABYLON.FlyCamera("FlyCamera", new BABYLON.Vector3(10, 10, 10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);
  return camera;
};

let addGUI = function () {
  let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  var text1 = new BABYLON.GUI.TextBlock();
  text1.text = "X";
  text1.color = "black";
  text1.fontSize = 24;
  advancedTexture.addControl(text1);
};

let addGrid = function (scene) {
  let ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 10, scene);
  let gridMaterial = new BABYLON.StandardMaterial("Grid Material", scene);
  gridMaterial.wireframe = true;
  ground.material = gridMaterial;
};

let addBox = function (scene) {
  let mat = new BABYLON.StandardMaterial("mat", scene);
  mat.diffuseColor = new BABYLON.Color3(1, 0, 0);

  box = BABYLON.MeshBuilder.CreateBox("", { height: 5, width: 3, depth: 2 });
  box.material = mat;

  return box;
};

//------------------EDIT COTROL -------------------------------------------------
let attachEditControl = function (mesh, camera, canvas) {
  //if we are planning on doing rotation in quaternion then make sure the rotationQuaternion is atleast initialized
  //else edit control will throw following exception
  //"Eulerian is set to false but the mesh's rotationQuaternion is not set."
  mesh.rotationQuaternion = BABYLON.Quaternion.Identity();
  mesh.position = new BABYLON.Vector3(0, 1, 0);
  //create edit control (mesh to attach to,camera, canvas, scale of editcontrol, if doing rotation in euler)
  let ec = new EditControl(mesh, camera, canvas, 0.75, false, 0.02);
  //show translation controls
  ec.enableTranslation();
  return ec;
};

var isLocked = false;
let setButtons = function (editControl, canvas) {
  let transButton = document.getElementById("trans");
  let rotButton = document.getElementById("rotate");
  let scaleButton = document.getElementById("scale");
  let plButton = document.getElementById("pl");

  transButton.onclick = function () {
    editControl.enableTranslation();
  };
  rotButton.onclick = function () {
    editControl.enableRotation();
  };
  scaleButton.onclick = function () {
    editControl.enableScaling();
  };

  plButton.onclick = function () {
    if (!isLocked) {
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
      if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
      }
    } else {
      document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
      document.exitPointerLock();
    }
  };
};
