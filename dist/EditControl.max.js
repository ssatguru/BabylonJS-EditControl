(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define(["babylonjs"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("babylonjs")) : factory(root["BABYLON"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_babylonjs__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/EditControl.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/EditControl.ts":
/*!****************************!*\
  !*** ./src/EditControl.ts ***!
  \****************************/
/*! exports provided: EditControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditControl", function() { return EditControl; });
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);

var ActionType;
(function (ActionType) {
    ActionType[ActionType["TRANS"] = 0] = "TRANS";
    ActionType[ActionType["ROT"] = 1] = "ROT";
    ActionType[ActionType["SCALE"] = 2] = "SCALE";
})(ActionType || (ActionType = {}));
/**
 * Draws a transform widget at the mesh's location (its pivot location).
 * The widget transforms(translates,rotates and scales) the mesh based on user
 * interactions with the widget.
 * The widget shows the mesh position and rotation at any time.
 * The widget follows the mesh constantly.
 * Note: An alternate approach would have been for the mesh to follow the widget.
 * The problem with the alternate approach - syncing the transforms
 * if the mesh was being transformed by entities other than the widget say physics
 * or script for example.
 *
 */
var EditControl = /** @class */ (function () {
    function EditControl(mesh, camera, canvas, scale, eulerian, pickWidth) {
        var _this = this;
        this._local = true;
        this._snapT = false;
        this._snapR = false;
        this._transSnap = 1;
        this._rotSnap = Math.PI / 18;
        this._axesLen = 0.4;
        this._axesScale = 1;
        //how close to an axis should we get before we can pick it 
        this._pickWidth = 0.02;
        this._redCol = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](1, 0.2, 0.2);
        this._greenCol = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](0.2, 1, 0.2);
        this._blueCol = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](0.2, 0.2, 1);
        this._whiteCol = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](1, 1, 1);
        this._yellowCol = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](1, 1, 0.2);
        //axes visibility
        this._visibility = 0.75;
        //lhs-rhs issue. lhs mesh in rhs or rhs mesh in lhs
        this._lhsRhs = false;
        this._ecMatrix = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Matrix"]();
        //edit control to camera vector
        this._ecTOcamera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        //how far away from camera should the edit control appear to be
        this._distFromCamera = 2;
        //vector from camera to edit control
        this._cameraTOec = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._cameraNormal = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._prevState = "";
        this._hidden = false;
        this._actionListener = null;
        this._actionStartListener = null;
        this._actionEndListener = null;
        this._pDown = false;
        this._pointerIsOver = false;
        this._editing = false;
        //rotate differently if camera is too close to the rotation plane
        this._rotate2 = false;
        //TODO when translating, the orientation of pALL keeps changing
        //TODo this is not so with rotation or scaling
        //TODO so for translation instead of pALL maybe we should use the camera view plane for picking
        this._transBy = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._snapTV = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._snapS = false;
        this._snapSV = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._scaleSnap = 0.25;
        this._scale = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._localX = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._localY = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._localZ = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._eulerian = false;
        this._snapRA = 0;
        this._transEnabled = false;
        this._rotEnabled = false;
        this._scaleEnabled = false;
        this._guideSize = 180;
        this._tSnap = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](this._transSnap, this._transSnap, this._transSnap);
        //few temp vectors & matrix
        this._tv1 = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._tv2 = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._tv3 = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._tm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Matrix"]();
        this._mesh = mesh;
        this._mainCamera = camera;
        this._canvas = canvas;
        if (scale != null) {
            this._axesScale = scale;
        }
        if (eulerian !== null) {
            this._eulerian = eulerian;
        }
        else {
            this._eulerian = false;
        }
        this._checkQuaternion();
        if (pickWidth != null) {
            this._pickWidth = pickWidth;
        }
        this._scene = mesh.getScene();
        this._actHist = new ActHist(mesh, 10);
        mesh.computeWorldMatrix(true);
        this._boundingDimesion = this._getBoundingDimension(mesh);
        this._setLocalAxes(mesh);
        this._lhsRhs = this._check_LHS_RHS(mesh);
        console.log("lhs rhs issue " + this._lhsRhs);
        //build the edit control axes
        this._ecRoot = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"]("", this._scene);
        this._ecRoot.rotationQuaternion = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].Identity();
        this._ecRoot.visibility = 0;
        this._ecRoot.isPickable = false;
        this._createMaterials(this._scene);
        var guideAxes = this._createCommonAxes();
        guideAxes.parent = this._ecRoot;
        //build the pickplanes
        var pickPlanes = this._createPickPlanes();
        pickPlanes.parent = this._ecRoot;
        this._pointerdown = function (evt) { return _this._onPointerDown(evt); };
        this._pointerup = function (evt) { return _this._onPointerUp(evt); };
        this._pointermove = function (evt) { return _this._onPointerMove(evt); };
        //use canvas rather than scene to handle pointer events
        //scene cannot have mutiple eventlisteners for an event
        //with canvas one will have to do ones own pickinfo generation.
        canvas.addEventListener("pointerdown", this._pointerdown, false);
        canvas.addEventListener("pointerup", this._pointerup, false);
        canvas.addEventListener("pointermove", this._pointermove, false);
        this._renderer = function () { return _this._renderLoopProcess(); };
        this._scene.registerBeforeRender(this._renderer);
    }
    EditControl.prototype.getRoot = function () {
        return this._ecRoot;
    };
    //make sure that if eulerian is set to false then mesh's rotation is in quaternion
    //throw error and exit if not so.
    EditControl.prototype._checkQuaternion = function () {
        if (!this._eulerian) {
            if ((this._mesh.rotationQuaternion == null) || (this._mesh.rotationQuaternion == undefined)) {
                throw "Error: Eulerian is set to false but the mesh's rotationQuaternion is not set.";
            }
        }
    };
    /**
        * checks if a have left hand , right hand issue.
        * In other words if a mesh is a LHS mesh in RHS system or
        * a RHS mesh in LHS system
        * The X axis will be reversed in such cases.
        * thus Cross product of X and Y should be inverse of Z.
        *
        * if no parent then we are ok.
        * If parent and parent has issue then we have issue.
        *
        */
    EditControl.prototype._check_LHS_RHS = function (mesh) {
        var _issue = false;
        var root = mesh.parent;
        if (root == null)
            return false;
        this._setLocalAxes(root);
        var actualZ = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Cross(this._localX, this._localY);
        //same direction or opposite direction of Z
        if (babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(actualZ, this._localZ) < 0)
            _issue = true;
        else
            _issue = false;
        this._setLocalAxes(mesh);
        return _issue;
    };
    EditControl.prototype._renderLoopProcess = function () {
        //sync the edit control position and rotation with that of mesh
        this._ecRoot.position = this._mesh.getAbsolutePivotPoint();
        this._setECRotation();
        //scale the EditControl so it seems at the same distance from camera/user
        this._setECScale();
        //rotate the free move,rotate,scale pick plane to face the camera/user
        if (this._local) {
            this._ecRoot.getWorldMatrix().invertToRef(this._ecMatrix);
            babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinatesToRef(this._mainCamera.position, this._ecMatrix, this._ecTOcamera);
            //note pALL is child of ecRoot hence lookAt in local space
            this._pALL.lookAt(this._ecTOcamera, 0, 0, 0, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].LOCAL);
        }
        else {
            this._mainCamera.position.subtractToRef(this._ecRoot.position, this._ecTOcamera);
            this._pALL.lookAt(this._mainCamera.position, 0, 0, 0, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].WORLD);
        }
        //rotate the rotation and planar guide to face the camera/user
        if (this._rotEnabled) {
            this._rotRotGuides();
        }
        else if (this._transEnabled)
            this._rotPlanarGuides(this._tXZ, this._tZY, this._tYX);
        else if (this._scaleEnabled)
            this._rotPlanarGuides(this._sXZ, this._sZY, this._sYX);
        //check pointer over axes only during pointer moves
        //this.onPointerOver();
    };
    /**
     * sets rotaion of edit control to that of the mesh
     */
    EditControl.prototype._setECRotation = function () {
        if (this._local) {
            if (this._mesh.parent == null) {
                if (this._eulerian) {
                    var rot = this._mesh.rotation;
                    babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].RotationYawPitchRollToRef(rot.y, rot.x, rot.z, this._ecRoot.rotationQuaternion);
                }
                else {
                    this._ecRoot.rotationQuaternion.copyFrom(this._mesh.rotationQuaternion);
                }
            }
            else {
                if (this._isScaleUnEqual(this._mesh))
                    return;
                this._mesh.getWorldMatrix().getRotationMatrixToRef(this._tm);
                babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].FromRotationMatrixToRef(this._tm, this._ecRoot.rotationQuaternion);
                //this._ecRoot.rotationQuaternion.normalize();
            }
        }
    };
    /**
     * checks if any of the mesh's ancestors has non uniform scale
     */
    EditControl.prototype._isScaleUnEqual = function (mesh) {
        if (mesh.parent == null)
            return false;
        while (mesh.parent != null) {
            if ((mesh.parent.scaling.x != mesh.parent.scaling.y ||
                mesh.parent.scaling.y != mesh.parent.scaling.z)) {
                return true;
            }
            else {
                mesh = mesh.parent;
            }
        }
        return false;
    };
    EditControl.prototype._setECScale = function () {
        this._ecRoot.position.subtractToRef(this._mainCamera.position, this._cameraTOec);
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].FromFloatArrayToRef(this._mainCamera.getWorldMatrix().asArray(), 8, this._cameraNormal);
        //get distance of edit control from the camera plane 
        //project "camera to edit control" vector onto the camera normal
        var parentOnNormal = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(this._cameraTOec, this._cameraNormal) / this._cameraNormal.length();
        var s = Math.abs(parentOnNormal / this._distFromCamera);
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].FromFloatsToRef(s, s, s, this._ecRoot.scaling);
        //Vector3.FromFloatsToRef(s,s,s,this.pALL.scaling);
    };
    //rotate the rotation guides so that they are facing the camera
    EditControl.prototype._rotRotGuides = function () {
        var rotX = Math.atan(this._ecTOcamera.y / this._ecTOcamera.z);
        if (this._ecTOcamera.z >= 0) {
            this._rX.rotation.x = -rotX;
        }
        else {
            this._rX.rotation.x = -rotX - Math.PI;
        }
        var rotY = Math.atan(this._ecTOcamera.x / this._ecTOcamera.z);
        if (this._ecTOcamera.z >= 0) {
            this._rY.rotation.y = rotY;
        }
        else {
            this._rY.rotation.y = rotY + Math.PI;
        }
        var rotZ = Math.atan(this._ecTOcamera.x / this._ecTOcamera.y);
        if (this._ecTOcamera.y >= 0) {
            this._rZ.rotation.z = -rotZ;
        }
        else {
            this._rZ.rotation.z = -rotZ - Math.PI;
        }
    };
    /**
     * rotate the planar guide so that they are facing the camera
     */
    EditControl.prototype._rotPlanarGuides = function (XZ, ZY, YX) {
        var ec = this._ecTOcamera;
        XZ.rotation.x = 0;
        XZ.rotation.y = 0;
        XZ.rotation.z = 0;
        ZY.rotation.x = 0;
        ZY.rotation.y = 0;
        ZY.rotation.z = 0;
        YX.rotation.x = 0;
        YX.rotation.y = 0;
        YX.rotation.z = 0;
        if (ec.x <= 0 && ec.y >= 0 && ec.z >= 0) {
            XZ.rotation.z = 3.14;
            YX.rotation.y = 3.14;
        }
        else if (ec.x <= 0 && ec.y >= 0 && ec.z <= 0) {
            XZ.rotation.y = 3.14;
            ZY.rotation.y = 3.14;
            YX.rotation.y = 3.14;
        }
        else if (ec.x >= 0 && ec.y >= 0 && ec.z <= 0) {
            XZ.rotation.x = 3.14;
            ZY.rotation.y = 3.14;
        }
        else if (ec.x >= 0 && ec.y <= 0 && ec.z >= 0) {
            ZY.rotation.z = 3.14;
            YX.rotation.x = 3.14;
        }
        else if (ec.x <= 0 && ec.y <= 0 && ec.z >= 0) {
            XZ.rotation.z = 3.14;
            ZY.rotation.z = 3.14;
            YX.rotation.z = 3.14;
        }
        else if (ec.x <= 0 && ec.y <= 0 && ec.z <= 0) {
            XZ.rotation.y = 3.14;
            ZY.rotation.x = 3.14;
            YX.rotation.z = 3.14;
        }
        else if (ec.x >= 0 && ec.y <= 0 && ec.z <= 0) {
            XZ.rotation.x = 3.14;
            ZY.rotation.x = 3.14;
            YX.rotation.x = 3.14;
        }
    };
    EditControl.prototype.switchTo = function (mesh, eulerian) {
        mesh.computeWorldMatrix(true);
        this._mesh = mesh;
        if (eulerian != null) {
            this._eulerian = eulerian;
        }
        this._checkQuaternion();
        this._setLocalAxes(mesh);
        this._actHist = new ActHist(mesh, 10);
        this._lhsRhs = this._check_LHS_RHS(mesh);
        this.refreshBoundingInfo();
    };
    EditControl.prototype.switchCamera = function (camera) {
        this._mainCamera = camera;
    };
    EditControl.prototype.setUndoCount = function (c) {
        this._actHist.setCapacity(c);
    };
    EditControl.prototype.undo = function () {
        var at = this._actHist.undo();
        this._mesh.computeWorldMatrix(true);
        this._setLocalAxes(this._mesh);
        this._callActionStartListener(at);
        this._callActionListener(at);
        this._callActionEndListener(at);
    };
    EditControl.prototype.redo = function () {
        var at = this._actHist.redo();
        this._mesh.computeWorldMatrix(true);
        this._setLocalAxes(this._mesh);
        this._callActionStartListener(at);
        this._callActionListener(at);
        this._callActionEndListener(at);
    };
    /**
     * detach the edit control from the mesh and dispose off all
     * resources created by the edit control
     */
    EditControl.prototype.detach = function () {
        this._canvas.removeEventListener("pointerdown", this._pointerdown, false);
        this._canvas.removeEventListener("pointerup", this._pointerup, false);
        this._canvas.removeEventListener("pointermove", this._pointermove, false);
        this._scene.unregisterBeforeRender(this._renderer);
        this.removeAllActionListeners();
        this._disposeAll();
    };
    /**
     * hide the edit control. use show() to unhide the control.
     */
    EditControl.prototype.hide = function () {
        this._hidden = true;
        if (this._transEnabled) {
            this._prevState = "T";
            this.disableTranslation();
        }
        else if (this._rotEnabled) {
            this._prevState = "R";
            this.disableRotation();
        }
        else if (this._scaleEnabled) {
            this._prevState = "S";
            this.disableScaling();
        }
        this._hideCommonAxes();
    };
    EditControl.prototype._hideCommonAxes = function () {
        this._xaxis.visibility = 0;
        this._yaxis.visibility = 0;
        this._zaxis.visibility = 0;
    };
    EditControl.prototype._showCommonAxes = function () {
        this._xaxis.visibility = this._visibility;
        this._yaxis.visibility = this._visibility;
        this._zaxis.visibility = this._visibility;
    };
    /**
     * unhide the editcontrol hidden using the hide() method
     */
    EditControl.prototype.show = function () {
        this._hidden = false;
        this._showCommonAxes();
        if (this._prevState == "T")
            this.enableTranslation();
        else if (this._prevState == "R")
            this.enableRotation();
        else if (this._prevState == "S")
            this.enableScaling();
    };
    /**
     * check if the editcontrol was hidden using the hide() methods
     */
    EditControl.prototype.isHidden = function () {
        return this._hidden;
    };
    EditControl.prototype._disposeAll = function () {
        this._ecRoot.dispose();
        this._disposeMaterials();
        this._actHist = null;
    };
    EditControl.prototype.addActionListener = function (actionListener) {
        this._actionListener = actionListener;
    };
    EditControl.prototype.removeActionListener = function () {
        this._actionListener = null;
    };
    EditControl.prototype.addActionStartListener = function (actionStartListener) {
        this._actionStartListener = actionStartListener;
    };
    EditControl.prototype.removeActionStartListener = function () {
        this._actionStartListener = null;
    };
    EditControl.prototype.addActionEndListener = function (actionEndListener) {
        this._actionEndListener = actionEndListener;
    };
    EditControl.prototype.removeActionEndListener = function () {
        this._actionEndListener = null;
    };
    EditControl.prototype.removeAllActionListeners = function () {
        this._actionListener = null;
        this._actionStartListener = null;
        this._actionEndListener = null;
    };
    EditControl.prototype._onPointerDown = function (evt) {
        var _this = this;
        evt.preventDefault();
        this._pDown = true;
        if (evt.button != 0)
            return;
        var engine = this._scene.getEngine();
        var x = (engine.isPointerLock) ? this._canvas.width * 0.5 : this._scene.pointerX;
        var y = (engine.isPointerLock) ? this._canvas.height * 0.5 : this._scene.pointerY;
        var pickResult = this._scene.pick(x, y, function (mesh) {
            if (_this._transEnabled) {
                if ((mesh == _this._tX) || (mesh == _this._tY) || (mesh == _this._tZ) || (mesh == _this._tXZ) || (mesh == _this._tZY) || (mesh == _this._tYX) || (mesh == _this._tAll))
                    return true;
            }
            else if ((_this._rotEnabled)) {
                if ((mesh == _this._rX) || (mesh == _this._rY) || (mesh == _this._rZ) || (mesh == _this._rAll))
                    return true;
            }
            else if ((_this._scaleEnabled)) {
                if ((mesh == _this._sX) || (mesh == _this._sY) || (mesh == _this._sZ) || (mesh == _this._sXZ) || (mesh == _this._sZY) || (mesh == _this._sYX) || (mesh == _this._sAll))
                    return true;
            }
            return false;
        }, null, this._mainCamera);
        if (pickResult.hit) {
            //this.setAxesVisiblity(0);
            this._axisPicked = pickResult.pickedMesh;
            var childs = this._axisPicked.getChildren();
            if (childs.length > 0) {
                childs[0].visibility = this._visibility;
            }
            else {
                this._axisPicked.visibility = this._visibility;
            }
            var name_1 = this._axisPicked.name;
            if ((name_1 == "X"))
                this._bXaxis.visibility = 1;
            else if ((name_1 == "Y"))
                this._bYaxis.visibility = 1;
            else if ((name_1 == "Z"))
                this._bZaxis.visibility = 1;
            else if ((name_1 == "XZ")) {
                this._bXaxis.visibility = 1;
                this._bZaxis.visibility = 1;
            }
            else if ((name_1 == "ZY")) {
                this._bZaxis.visibility = 1;
                this._bYaxis.visibility = 1;
            }
            else if ((name_1 == "YX")) {
                this._bYaxis.visibility = 1;
                this._bXaxis.visibility = 1;
            }
            else if ((name_1 == "ALL")) {
                this._bXaxis.visibility = 1;
                this._bYaxis.visibility = 1;
                this._bZaxis.visibility = 1;
            }
            this._setEditing(true);
            //lets find out where we are on the pickplane
            this._pickedPlane = this._getPickPlane(this._axisPicked);
            if (this._pickedPlane != null) {
                this._prevPos = this._getPosOnPickPlane();
            }
            else {
                this._prevPos = null;
            }
            window.setTimeout((function (cam, can) { return _this._detachCamera(cam, can); }), 0, this._mainCamera, this._canvas);
        }
    };
    EditControl.prototype._setEditing = function (editing) {
        this._editing = editing;
        if (editing) {
            this._setActionType();
            if (this._actionType == ActionType.ROT) {
                this._snapRA = 0;
            }
            this._callActionStartListener(this._actionType);
        }
        else {
            this._callActionEndListener(this._actionType);
        }
    };
    EditControl.prototype.isEditing = function () {
        return this._editing;
    };
    /**
     * no camera movement during edit
     */
    EditControl.prototype._detachCamera = function (cam, can) {
        var camera = cam;
        var canvas = can;
        var engine = this._scene.getEngine();
        if (!engine.isPointerLock) {
            camera.detachControl(canvas);
        }
    };
    EditControl.prototype.isPointerOver = function () {
        return this._pointerIsOver;
    };
    EditControl.prototype._onPointerOver = function () {
        var _this = this;
        //if(this.pDown) return;
        var engine = this._scene.getEngine();
        var x = (engine.isPointerLock) ? this._canvas.width * 0.5 : this._scene.pointerX;
        var y = (engine.isPointerLock) ? this._canvas.height * 0.5 : this._scene.pointerY;
        var pickResult = this._scene.pick(x, y, function (mesh) {
            if (_this._transEnabled) {
                if ((mesh == _this._tX) || (mesh == _this._tY) || (mesh == _this._tZ) || (mesh == _this._tXZ) || (mesh == _this._tZY) || (mesh == _this._tYX) || (mesh == _this._tAll))
                    return true;
            }
            else if ((_this._rotEnabled)) {
                if ((mesh == _this._rX) || (mesh == _this._rY) || (mesh == _this._rZ) || (mesh == _this._rAll))
                    return true;
            }
            else if (_this._scaleEnabled) {
                if ((mesh == _this._sX) || (mesh == _this._sY) || (mesh == _this._sZ) || (mesh == _this._sXZ) || (mesh == _this._sZY) || (mesh == _this._sYX) || (mesh == _this._sAll))
                    return true;
            }
            return false;
        }, null, this._mainCamera);
        if (pickResult.hit) {
            //if we are still over the same axis mesh then don't do anything
            if (pickResult.pickedMesh != this._prevOverMesh) {
                this._pointerIsOver = true;
                //if we moved directly from one axis mesh to this then clean up the prev axis mesh
                this._clearPrevOverMesh();
                this._prevOverMesh = pickResult.pickedMesh;
                if (this._rotEnabled) {
                    this._savedCol = this._prevOverMesh.getChildren()[0].color;
                    this._prevOverMesh.getChildren()[0].color = this._whiteCol;
                }
                else {
                    var childs = this._prevOverMesh.getChildren();
                    if (childs.length > 0) {
                        this._savedMat = childs[0].material;
                        childs[0].material = this._whiteMat;
                    }
                    else {
                        this._savedMat = this._prevOverMesh.material;
                        this._prevOverMesh.material = this._whiteMat;
                    }
                }
                if (this._prevOverMesh.name == "X") {
                    this._xaxis.color = this._whiteCol;
                }
                else if (this._prevOverMesh.name == "Y") {
                    this._yaxis.color = this._whiteCol;
                }
                else if (this._prevOverMesh.name == "Z") {
                    this._zaxis.color = this._whiteCol;
                }
            }
        }
        else {
            this._pointerIsOver = false;
            if (this._prevOverMesh != null) {
                this._restoreColor(this._prevOverMesh);
                this._prevOverMesh = null;
            }
        }
    };
    //clean up any axis we might have been howering over before
    EditControl.prototype._clearPrevOverMesh = function () {
        if (this._prevOverMesh != null) {
            this._prevOverMesh.visibility = 0;
            this._restoreColor(this._prevOverMesh);
        }
    };
    EditControl.prototype._restoreColor = function (mesh) {
        switch (mesh.name) {
            case "X":
                this._xaxis.color = this._redCol;
                break;
            case "Y":
                this._yaxis.color = this._greenCol;
                break;
            case "Z":
                this._zaxis.color = this._blueCol;
                break;
        }
        if (this._rotEnabled) {
            mesh.getChildren()[0].color = this._savedCol;
        }
        else {
            var childs = mesh.getChildren();
            if (childs.length > 0) {
                childs[0].material = this._savedMat;
            }
            else {
                mesh.material = this._savedMat;
            }
        }
    };
    EditControl.prototype._onPointerUp = function (evt) {
        this._pDown = false;
        if (this._editing) {
            var engine = this._scene.getEngine();
            if (!engine.isPointerLock) {
                this._mainCamera.attachControl(this._canvas);
            }
            this._setEditing(false);
            //this.setAxesVisiblity(1);
            this._hideBaxis();
            if (this._prevOverMesh != null) {
                this._restoreColor(this._prevOverMesh);
                this._prevOverMesh = null;
            }
            this._actHist.add(this._actionType);
        }
    };
    EditControl.prototype._setActionType = function () {
        if (this._transEnabled) {
            this._actionType = ActionType.TRANS;
        }
        else if ((this._rotEnabled)) {
            this._actionType = ActionType.ROT;
        }
        else if ((this._scaleEnabled)) {
            this._actionType = ActionType.SCALE;
        }
    };
    EditControl.prototype._callActionListener = function (at) {
        //call actionListener if registered
        if (this._actionListener != null) {
            this._actionListener(at);
        }
    };
    EditControl.prototype._callActionStartListener = function (at) {
        //call actionListener if registered
        if (this._actionStartListener != null) {
            this._actionStartListener(at);
        }
    };
    EditControl.prototype._callActionEndListener = function (at) {
        //call actionListener if registered
        if (this._actionEndListener != null) {
            this._actionEndListener(at);
        }
    };
    EditControl.prototype._onPointerMove = function (evt) {
        if (!this._pDown) {
            this._onPointerOver();
            return;
        }
        if (!this._editing)
            return;
        if (this._prevPos == null)
            return;
        var newPos = this._getPosOnPickPlane();
        if (newPos == null)
            return;
        if (this._rotEnabled) {
            this._doRotation(this._mesh, this._axisPicked, newPos, this._prevPos);
        }
        else {
            var diff = newPos.subtract(this._prevPos);
            if (diff.x == 0 && diff.y == 0 && diff.z == 0)
                return;
            if (this._transEnabled) {
                this._doTranslation(diff);
            }
            else {
                if (this._scaleEnabled && this._local)
                    this._doScaling(diff);
            }
        }
        this._prevPos = newPos;
        this._callActionListener(this._actionType);
    };
    EditControl.prototype._getPickPlane = function (axis) {
        var n = axis.name;
        if (this._transEnabled || this._scaleEnabled) {
            if (n == "XZ")
                return this._pXZ;
            else if (n == "ZY")
                return this._pZY;
            else if (n == "YX")
                return this._pYX;
            else if (n == "ALL")
                return this._pALL;
            else {
                //get the position of camera in the edit control frame of reference
                this._ecRoot.getWorldMatrix().invertToRef(this._ecMatrix);
                babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinatesToRef(this._mainCamera.position, this._ecMatrix, this._ecTOcamera);
                var c = this._ecTOcamera;
                if (n === "X") {
                    if (Math.abs(c.y) > Math.abs(c.z)) {
                        return this._pXZ;
                    }
                    else
                        return this._pYX;
                }
                else if (n === "Z") {
                    if (Math.abs(c.y) > Math.abs(c.x)) {
                        return this._pXZ;
                    }
                    else
                        return this._pZY;
                }
                else if (n === "Y") {
                    if (Math.abs(c.z) > Math.abs(c.x)) {
                        return this._pYX;
                    }
                    else
                        return this._pZY;
                }
            }
        }
        else if (this._rotEnabled) {
            this._rotate2 = false;
            //get the position of camera in the edit control frame of reference
            this._ecRoot.getWorldMatrix().invertToRef(this._ecMatrix);
            babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinatesToRef(this._mainCamera.position, this._ecMatrix, this._ecTOcamera);
            var c = this._ecTOcamera;
            //if camera is too close to the rotation plane then use alternate rotation process
            switch (n) {
                case "X":
                    if (Math.abs(c.x) < 0.2) {
                        this._rotate2 = true;
                        return this._pALL;
                    }
                    else
                        return this._pZY;
                case "Y":
                    if (Math.abs(c.y) < 0.2) {
                        this._rotate2 = true;
                        return this._pALL;
                    }
                    else
                        return this._pXZ;
                case "Z":
                    if (Math.abs(c.z) < 0.2) {
                        this._rotate2 = true;
                        return this._pALL;
                    }
                    else
                        return this._pYX;
                default:
                    return this._pALL;
            }
        }
        else
            return null;
    };
    EditControl.prototype._doTranslation = function (diff) {
        if ((this._mesh.parent != null) && this._isScaleUnEqual(this._mesh)) {
            this._setLocalAxes(this._ecRoot);
        }
        else {
            this._setLocalAxes(this._mesh);
        }
        var n = this._axisPicked.name;
        this._transBy.x = 0;
        this._transBy.y = 0;
        this._transBy.z = 0;
        if ((n == "X") || (n == "XZ") || (n == "YX") || (n == "ALL")) {
            if (this._local)
                this._transBy.x = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(diff, this._localX) / this._localX.length();
            else
                this._transBy.x = diff.x;
        }
        if ((n == "Y") || (n == "ZY") || (n == "YX") || (n == "ALL")) {
            if (this._local)
                this._transBy.y = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(diff, this._localY) / this._localY.length();
            else
                this._transBy.y = diff.y;
        }
        if ((n == "Z") || (n == "XZ") || (n == "ZY") || (n == "ALL")) {
            if (this._local)
                this._transBy.z = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(diff, this._localZ) / this._localZ.length();
            else
                this._transBy.z = diff.z;
        }
        this._transWithSnap(this._mesh, this._transBy, this._local);
        // bound the translation
        if (this._transBoundsMin) {
            this._mesh.position.x = Math.max(this._mesh.position.x, this._transBoundsMin.x);
            this._mesh.position.y = Math.max(this._mesh.position.y, this._transBoundsMin.y);
            this._mesh.position.z = Math.max(this._mesh.position.z, this._transBoundsMin.z);
        }
        if (this._transBoundsMax) {
            this._mesh.position.x = Math.min(this._mesh.position.x, this._transBoundsMax.x);
            this._mesh.position.y = Math.min(this._mesh.position.y, this._transBoundsMax.y);
            this._mesh.position.z = Math.min(this._mesh.position.z, this._transBoundsMax.z);
        }
        this._mesh.computeWorldMatrix(true);
    };
    EditControl.prototype._transWithSnap = function (mesh, trans, local) {
        if (this._snapT) {
            var snapit = false;
            this._snapTV.addInPlace(trans);
            if (Math.abs(this._snapTV.x) > this._tSnap.x) {
                if (this._snapTV.x > 0)
                    trans.x = this._tSnap.x;
                else
                    trans.x = -this._tSnap.x;
                snapit = true;
            }
            if (Math.abs(this._snapTV.y) > this._tSnap.y) {
                if (this._snapTV.y > 0)
                    trans.y = this._tSnap.y;
                else
                    trans.y = -this._tSnap.y;
                snapit = true;
            }
            if (Math.abs(this._snapTV.z) > this._tSnap.z) {
                if (this._snapTV.z > 0)
                    trans.z = this._tSnap.z;
                else
                    trans.z = -this._tSnap.z;
                snapit = true;
            }
            if (snapit) {
                if (Math.abs(trans.x) !== this._tSnap.x)
                    trans.x = 0;
                if (Math.abs(trans.y) !== this._tSnap.y)
                    trans.y = 0;
                if (Math.abs(trans.z) !== this._tSnap.z)
                    trans.z = 0;
                babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].FromFloatsToRef(0, 0, 0, this._snapTV);
                snapit = false;
            }
            else {
                return;
            }
        }
        if (local) {
            //locallyTranslate moves the mesh wrt the absolute location not pivotlocation :(
            //this.mesh.locallyTranslate(trans);
            //
            this._localX.normalizeToRef(this._tv1);
            this._localY.normalizeToRef(this._tv2);
            this._localZ.normalizeToRef(this._tv3);
            this._mesh.translate(this._tv1, trans.x, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].WORLD);
            this._mesh.translate(this._tv2, trans.y, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].WORLD);
            this._mesh.translate(this._tv3, trans.z, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].WORLD);
        }
        else {
            if (this._mesh.parent == null) {
                this._mesh.position.addInPlace(trans);
            }
            else {
                this._mesh.setAbsolutePosition(trans.addInPlace(this._mesh.absolutePosition));
            }
        }
    };
    EditControl.prototype._doScaling = function (diff) {
        this._setLocalAxes(this._mesh);
        this._scale.x = 0;
        this._scale.y = 0;
        this._scale.z = 0;
        var n = this._axisPicked.name;
        if ((n == "X") || (n == "XZ") || (n == "YX")) {
            this._scale.x = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(diff, this._localX) / this._localX.length();
            if (this._mesh.scaling.x < 0)
                this._scale.x = -this._scale.x;
            //if(this.lhsRhs) this.scale.x=-this.scale.x;
        }
        if ((n == "Y") || (n == "ZY") || (n == "YX")) {
            this._scale.y = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(diff, this._localY) / this._localY.length();
            if (this._mesh.scaling.y < 0)
                this._scale.y = -this._scale.y;
        }
        if ((n == "Z") || (n == "XZ") || (n == "ZY")) {
            this._scale.z = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(diff, this._localZ) / this._localZ.length();
            if (this._mesh.scaling.z < 0)
                this._scale.z = -this._scale.z;
        }
        //as the mesh becomes large reduce the amount by which we scale.
        var bbd = this._boundingDimesion;
        this._scale.x = this._scale.x / bbd.x;
        this._scale.y = this._scale.y / bbd.y;
        this._scale.z = this._scale.z / bbd.z;
        if (n == "ALL") {
            //project movement along camera up vector
            //if up then scale up else scale down
            var s = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(diff, this._mainCamera.upVector);
            s = s / Math.max(bbd.x, bbd.y, bbd.z);
            this._scale.copyFromFloats(s, s, s);
        }
        else {
            var inPlane = false;
            if (n == "XZ") {
                inPlane = true;
                if (Math.abs(this._scale.x) > Math.abs(this._scale.z)) {
                    this._scale.z = this._scale.x;
                }
                else
                    this._scale.x = this._scale.z;
            }
            else if (n == "ZY") {
                inPlane = true;
                if (Math.abs(this._scale.z) > Math.abs(this._scale.y)) {
                    this._scale.y = this._scale.z;
                }
                else
                    this._scale.z = this._scale.y;
            }
            else if (n == "YX") {
                inPlane = true;
                if (Math.abs(this._scale.y) > Math.abs(this._scale.x)) {
                    this._scale.x = this._scale.y;
                }
                else
                    this._scale.y = this._scale.x;
            }
            if (inPlane) {
                //check if the mouse/pointer was moved towards camera or away from camera
                //if towards then scale up else scale down
                this._ecRoot.position.subtractToRef(this._mainCamera.position, this._cameraTOec);
                var s = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(diff, this._cameraTOec);
                this._scale.x = Math.abs(this._scale.x);
                this._scale.y = Math.abs(this._scale.y);
                this._scale.z = Math.abs(this._scale.z);
                if (s > 0) {
                    if (this._mesh.scaling.x > 0)
                        this._scale.x = -this._scale.x;
                    //if(this.lhsRhs) this.scale.y=Math.abs(this.scale.y);
                    if (this._mesh.scaling.y > 0)
                        this._scale.y = -this._scale.y;
                    if (this._mesh.scaling.z > 0)
                        this._scale.z = -this._scale.z;
                }
                else {
                    //this.scale.x=Math.abs(this.scale.x);
                    //if(this.lhsRhs) this.scale.y=-Math.abs(this.scale.y);
                    //else this.scale.y=Math.abs(this.scale.y);
                    if (this._mesh.scaling.x < 0)
                        this._scale.x = -this._scale.x;
                    if (this._mesh.scaling.y < 0)
                        this._scale.y = -this._scale.y;
                    if (this._mesh.scaling.z < 0)
                        this._scale.z = -this._scale.z;
                }
            }
        }
        this._scaleWithSnap(this._mesh, this._scale);
        // bound the scale
        if (this._scaleBoundsMin) {
            this._mesh.scaling.x = Math.max(this._mesh.scaling.x, this._scaleBoundsMin.x);
            this._mesh.scaling.y = Math.max(this._mesh.scaling.y, this._scaleBoundsMin.y);
            this._mesh.scaling.z = Math.max(this._mesh.scaling.z, this._scaleBoundsMin.z);
        }
        if (this._scaleBoundsMax) {
            this._mesh.scaling.x = Math.min(this._mesh.scaling.x, this._scaleBoundsMax.x);
            this._mesh.scaling.y = Math.min(this._mesh.scaling.y, this._scaleBoundsMax.y);
            this._mesh.scaling.z = Math.min(this._mesh.scaling.z, this._scaleBoundsMax.z);
        }
    };
    EditControl.prototype._scaleWithSnap = function (mesh, p) {
        if (this._snapS) {
            var snapit = false;
            this._snapSV.addInPlace(p);
            if (Math.abs(this._snapSV.x) > this._scaleSnap) {
                if (p.x > 0)
                    p.x = this._scaleSnap;
                else
                    p.x = -this._scaleSnap;
                snapit = true;
            }
            if (Math.abs(this._snapSV.y) > this._scaleSnap) {
                if (p.y > 0)
                    p.y = this._scaleSnap;
                else
                    p.y = -this._scaleSnap;
                snapit = true;
            }
            if (Math.abs(this._snapSV.z) > this._scaleSnap) {
                if (p.z > 0)
                    p.z = this._scaleSnap;
                else
                    p.z = -this._scaleSnap;
                snapit = true;
            }
            if (!snapit)
                return;
            if ((Math.abs(p.x) !== this._scaleSnap) && (p.x !== 0))
                p.x = 0;
            if ((Math.abs(p.y) !== this._scaleSnap) && (p.y !== 0))
                p.y = 0;
            if ((Math.abs(p.z) !== this._scaleSnap) && (p.z !== 0))
                p.z = 0;
            babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].FromFloatsToRef(0, 0, 0, this._snapSV);
            snapit = false;
        }
        mesh.scaling.addInPlace(p);
    };
    /*
     * This would be called after rotation or scaling as the local axes direction or length might have changed
     * We need to set the local axis as these are used in all three modes to figure out
     * direction of mouse move wrt the axes
     * TODO should use world pivotmatrix instead of worldmatrix - incase pivot axes were rotated?
     */
    EditControl.prototype._setLocalAxes = function (mesh) {
        var meshMatrix = mesh.getWorldMatrix();
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].FromFloatArrayToRef(meshMatrix.m, 0, this._localX);
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].FromFloatArrayToRef(meshMatrix.m, 4, this._localY);
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].FromFloatArrayToRef(meshMatrix.m, 8, this._localZ);
    };
    EditControl.prototype._getBoundingDimension = function (mesh) {
        if (mesh instanceof babylonjs__WEBPACK_IMPORTED_MODULE_0__["AbstractMesh"]) {
            { }
            var bb = mesh.getBoundingInfo().boundingBox;
            var bd = bb.maximum.subtract(bb.minimum);
            if (bd.x == 0)
                bd.x = 1;
            if (bd.y == 0)
                bd.y = 1;
            if (bd.z == 0)
                bd.z = 1;
            return bd;
        }
        else
            return new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1, 1, 1);
    };
    /*
     *
     * For the sake of speed the editcontrol calculates bounding info only once.
     * This is in the constructor.
     * Now The boundingbox dimension can change if the mesh is baked.
     * If the editcontrol is attached to the mesh when the mesh was baked then
     * the scaling speed will be incorrect.
     * Thus client application should call refreshBoundingInfo if it bakes the mesh.
     *
     */
    EditControl.prototype.refreshBoundingInfo = function () {
        this._boundingDimesion = this._getBoundingDimension(this._mesh);
    };
    EditControl.prototype._doRotation = function (mesh, axis, newPos, prevPos) {
        //for now no rotation if parents have non uniform scale
        if (this._local && (this._mesh.parent != null) && this._isScaleUnEqual(mesh)) {
            this._setLocalAxes(this._ecRoot);
        }
        else {
            this._setLocalAxes(mesh);
        }
        var angle = 0;
        //rotation axis
        var rAxis;
        if (axis == this._rX)
            rAxis = this._local ? this._localX : babylonjs__WEBPACK_IMPORTED_MODULE_0__["Axis"].X;
        else if (axis == this._rY)
            rAxis = this._local ? this._localY : babylonjs__WEBPACK_IMPORTED_MODULE_0__["Axis"].Y;
        else if (axis == this._rZ)
            rAxis = this._local ? this._localZ : babylonjs__WEBPACK_IMPORTED_MODULE_0__["Axis"].Z;
        this._ecRoot.position.subtractToRef(this._mainCamera.position, this._cameraTOec);
        /**
         * A)first find the angle and the direction (clockwise or anticlockwise) by which the user was trying to rotate
         * from the user(camera) perspective
         */
        if (this._rotate2) {
            angle = this._getAngle2(prevPos, newPos, this._mainCamera.position, this._cameraTOec, rAxis);
            //TODO check why we need to handle righ hand this way
            if (this._scene.useRightHandedSystem)
                angle = -angle;
        }
        else {
            angle = this._getAngle(prevPos, newPos, mesh.getAbsolutePivotPoint(), this._cameraTOec);
        }
        if (this._lhsRhs) {
            angle = -angle;
        }
        /**
         * B)then rotate based on users(camera) postion and orientation in the local/world space
         *
         */
        if (this._snapR) {
            this._snapRA += angle;
            angle = 0;
            if (Math.abs(this._snapRA) >= this._rotSnap) {
                if (this._snapRA > 0)
                    angle = this._rotSnap;
                else
                    angle = -this._rotSnap;
                this._snapRA = 0;
            }
        }
        if (angle !== 0) {
            this._cameraTOec.normalize();
            if (axis == this._rAll) {
                mesh.rotate(this._cameraTOec, -angle, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].WORLD);
            }
            else {
                if (babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(rAxis, this._cameraTOec) >= 0)
                    angle = -angle;
                mesh.rotate(rAxis, angle, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].WORLD);
            }
            if (this._eulerian) {
                mesh.rotation = mesh.rotationQuaternion.toEulerAngles();
                mesh.rotationQuaternion = null;
            }
            if (this._local) {
                if (this._lhsRhs) {
                    angle = -angle;
                }
                if ((this._mesh.parent != null) && this._isScaleUnEqual(mesh)) {
                    if (axis == this._rAll) {
                        this._ecRoot.rotate(this._cameraTOec, -angle, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].WORLD);
                    }
                    else {
                        this._ecRoot.rotate(rAxis, angle, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Space"].WORLD);
                    }
                }
            }
        }
    };
    EditControl.prototype._getPosOnPickPlane = function () {
        var _this = this;
        var engine = this._scene.getEngine();
        var x = (engine.isPointerLock) ? this._canvas.width * 0.5 : this._scene.pointerX;
        var y = (engine.isPointerLock) ? this._canvas.height * 0.5 : this._scene.pointerY;
        var pickinfo = this._scene.pick(x, y, function (mesh) {
            return mesh == _this._pickedPlane;
        }, null, this._mainCamera);
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }
        else {
            return null;
        }
    };
    EditControl.prototype._hideBaxis = function () {
        this._bXaxis.visibility = 0;
        this._bYaxis.visibility = 0;
        this._bZaxis.visibility = 0;
    };
    //    private _setAxesVisiblity(v: number) {
    //        if (this._transEnabled) {
    //            this._tEndX.visibility = v;
    //            this._tEndY.visibility = v;
    //            this._tEndZ.visibility = v;
    //            this._tEndXZ.visibility = v;
    //            this._tEndZY.visibility = v;
    //            this._tEndYX.visibility = v;
    //            this._tEndAll.visibility = v;
    //        }
    //        if (this._rotEnabled) {
    //            this._rEndX.visibility = v;
    //            this._rEndY.visibility = v;
    //            this._rEndZ.visibility = v;
    //            this._rEndAll.visibility = v;
    //        }
    //        if (this._scaleEnabled) {
    //            this._sEndX.visibility = v;
    //            this._sEndY.visibility = v;
    //            this._sEndZ.visibility = v;
    //            this._sEndXZ.visibility = v;
    //            this._sEndZY.visibility = v;
    //            this._sEndYX.visibility = v;
    //            this._sEndAll.visibility = v;
    //        }
    //    }
    EditControl.prototype.getRotationQuaternion = function () {
        return this._ecRoot.rotationQuaternion;
    };
    EditControl.prototype.getPosition = function () {
        return this._ecRoot.position;
    };
    EditControl.prototype.isTranslationEnabled = function () {
        return this._transEnabled;
    };
    EditControl.prototype.enableTranslation = function () {
        if (this._hidden)
            return;
        if (this._tX == null) {
            this._createTransAxes();
            this._tCtl.parent = this._ecRoot;
        }
        this._clearPrevOverMesh();
        if (!this._transEnabled) {
            this._setVisibility(this._all_tEnd, this._visibility);
            this._transEnabled = true;
            this.disableRotation();
            this.disableScaling();
        }
    };
    EditControl.prototype.disableTranslation = function () {
        if (this._transEnabled) {
            this._setVisibility(this._all_tEnd, 0);
            this._transEnabled = false;
        }
    };
    EditControl.prototype.isRotationEnabled = function () {
        return this._rotEnabled;
    };
    EditControl.prototype.returnEuler = function (euler) {
        this._eulerian = euler;
    };
    EditControl.prototype.enableRotation = function () {
        if (this._hidden)
            return;
        if (this._rCtl == null) {
            this._createRotAxes();
            this._rCtl.parent = this._ecRoot;
        }
        this._clearPrevOverMesh();
        if (!this._rotEnabled) {
            this._setVisibility(this._all_rEnd, this._visibility);
            this._rotEnabled = true;
            this.disableTranslation();
            this.disableScaling();
        }
    };
    EditControl.prototype.disableRotation = function () {
        if (this._rotEnabled) {
            this._setVisibility(this._all_rEnd, 0);
            this._rotEnabled = false;
        }
    };
    EditControl.prototype.isScalingEnabled = function () {
        return this._scaleEnabled;
    };
    EditControl.prototype.enableScaling = function () {
        if (this._hidden)
            return;
        if (this._sX == null) {
            this._createScaleAxes();
            this._sCtl.parent = this._ecRoot;
        }
        this._clearPrevOverMesh();
        if (!this._scaleEnabled) {
            this._setVisibility(this._all_sEnd, this._visibility);
            this._scaleEnabled = true;
            this.disableTranslation();
            this.disableRotation();
        }
    };
    EditControl.prototype.disableScaling = function () {
        if (this._scaleEnabled) {
            this._setVisibility(this._all_sEnd, 0);
            this._scaleEnabled = false;
        }
    };
    EditControl.prototype.setScaleBounds = function (min, max) {
        this._scaleBoundsMin = min ? min : null;
        this._scaleBoundsMax = max ? max : null;
        if (this._scaleBoundsMin != null) {
            if (this._scaleBoundsMin.x == 0)
                this._scaleBoundsMin.x = 0.00000001;
            if (this._scaleBoundsMin.y == 0)
                this._scaleBoundsMin.y = 0.00000001;
            if (this._scaleBoundsMin.z == 0)
                this._scaleBoundsMin.z = 0.00000001;
        }
    };
    EditControl.prototype.removeScaleBounds = function () {
        this._scaleBoundsMin = null;
        this._scaleBoundsMax = null;
    };
    EditControl.prototype.setTransBounds = function (min, max) {
        this._transBoundsMin = min ? min : null;
        this._transBoundsMax = max ? max : null;
    };
    EditControl.prototype.removeTransBounds = function () {
        this._transBoundsMin = null;
        this._transBoundsMax = null;
    };
    EditControl.prototype.setRotBounds = function (min, max) {
        this._rotBoundsMin = min ? min : null;
        this._rotBoundsMax = max ? max : null;
    };
    EditControl.prototype.removeRotBounds = function () {
        this._rotBoundsMin = null;
        this._rotBoundsMax = null;
    };
    /*
     * create big and small axeses which will be shown in translate, rotate and scale mode.
     *
     */
    EditControl.prototype._createCommonAxes = function () {
        var guideAxes = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"]("", this._scene);
        //the big axes, shown when an axis is selected
        this._bXaxis = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateLines("", [new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-100, 0, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](100, 0, 0)], this._scene);
        this._bYaxis = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateLines("", [new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, -100, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 100, 0)], this._scene);
        this._bZaxis = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateLines("", [new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, -100), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 100)], this._scene);
        //lines are now pickable too
        this._bXaxis.isPickable = false;
        this._bYaxis.isPickable = false;
        this._bZaxis.isPickable = false;
        this._bXaxis.parent = guideAxes;
        this._bYaxis.parent = guideAxes;
        this._bZaxis.parent = guideAxes;
        this._bXaxis.color = this._redCol;
        this._bYaxis.color = this._greenCol;
        this._bZaxis.color = this._blueCol;
        this._hideBaxis();
        //the small axis
        var al = this._axesLen * this._axesScale * 0.75;
        this._xaxis = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateLines("", [new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](al, 0, 0)], this._scene);
        this._yaxis = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateLines("", [new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, al, 0)], this._scene);
        this._zaxis = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateLines("", [new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, al)], this._scene);
        //lines are now pickable too
        this._xaxis.isPickable = false;
        this._yaxis.isPickable = false;
        this._zaxis.isPickable = false;
        this._xaxis.parent = guideAxes;
        this._yaxis.parent = guideAxes;
        this._zaxis.parent = guideAxes;
        this._xaxis.color = this._redCol;
        this._yaxis.color = this._greenCol;
        this._zaxis.color = this._blueCol;
        this._xaxis.renderingGroupId = 1;
        this._yaxis.renderingGroupId = 1;
        this._zaxis.renderingGroupId = 1;
        return guideAxes;
    };
    EditControl.prototype._createPickPlanes = function () {
        this._pALL = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreatePlane("", 5, this._scene);
        this._pXZ = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreatePlane("", 5, this._scene);
        this._pZY = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreatePlane("", 5, this._scene);
        this._pYX = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreatePlane("", 5, this._scene);
        this._pALL.isPickable = false;
        this._pXZ.isPickable = false;
        this._pZY.isPickable = false;
        this._pYX.isPickable = false;
        this._pALL.visibility = 0;
        this._pXZ.visibility = 0;
        this._pZY.visibility = 0;
        this._pYX.visibility = 0;
        this._pALL.renderingGroupId = 1;
        this._pXZ.renderingGroupId = 1;
        this._pZY.renderingGroupId = 1;
        this._pYX.renderingGroupId = 1;
        this._pALL.lookAt(this._mainCamera.position);
        this._pXZ.rotate(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Axis"].X, 1.57);
        this._pZY.rotate(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Axis"].Y, 1.57);
        var pickPlanes = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"]("", this._scene);
        this._pALL.parent = pickPlanes;
        this._pXZ.parent = pickPlanes;
        this._pZY.parent = pickPlanes;
        this._pYX.parent = pickPlanes;
        return pickPlanes;
    };
    EditControl.prototype._createTransAxes = function () {
        var r = this._pickWidth * 2 * this._axesScale;
        var l = this._axesLen * this._axesScale;
        this._tCtl = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"]("", this._scene);
        /*pickable invisible boxes around axes lines*/
        this._createPickableTrans(r, l, this._tCtl, this._scene);
        //non pickable but visible cones at end of axes lines
        this._createNonPickableTrans(r, l, this._scene);
    };
    EditControl.prototype._createPickableTrans = function (r, l, tCtl, scene) {
        var tX = this._extrudeBox(r / 2, l);
        tX.name = "X";
        var tY = tX.clone("Y");
        var tZ = tX.clone("Z");
        var tXZ = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("XZ", { size: r * 2 }, scene);
        var tZY = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("ZY", { size: r * 2 }, scene);
        var tYX = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("YX", { size: r * 2 }, scene);
        tXZ.rotation.x = 1.57;
        tZY.rotation.y = -1.57;
        tXZ.position.x = 2 * r;
        tXZ.position.z = 2 * r;
        tZY.position.z = 2 * r;
        tZY.position.y = 2 * r;
        tYX.position.y = 2 * r;
        tYX.position.x = 2 * r;
        tXZ.bakeCurrentTransformIntoVertices();
        tZY.bakeCurrentTransformIntoVertices();
        tYX.bakeCurrentTransformIntoVertices();
        var tAll = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateBox("ALL", r * 2, scene);
        tX.parent = tCtl;
        tY.parent = tCtl;
        tZ.parent = tCtl;
        tXZ.parent = tCtl;
        tZY.parent = tCtl;
        tYX.parent = tCtl;
        tAll.parent = tCtl;
        tX.rotation.y = 1.57;
        tY.rotation.x -= 1.57;
        this._tX = tX;
        this._tY = tY;
        this._tZ = tZ;
        this._tXZ = tXZ;
        this._tZY = tZY;
        this._tYX = tYX;
        this._tAll = tAll;
        this._all_t = [tX, tY, tZ, tXZ, tZY, tYX, tAll];
        this._setVisibility(this._all_t, 0);
        //do not want clients picking this
        //we will pick using mesh filter in scene.pick function
        this._setPickableFalse(this._all_t);
    };
    EditControl.prototype._createNonPickableTrans = function (r, l, scene) {
        //cone length
        var cl = l / 5;
        //cone base radius
        //let cr: number = r;
        var tEndX = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateCylinder("", cl, 0, r, 6, 1, scene);
        var tEndY = tEndX.clone("");
        var tEndZ = tEndX.clone("");
        var s = r * 2;
        var tEndXZ = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("XZ", { size: s }, scene);
        var tEndZY = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("ZY", { size: s }, scene);
        var tEndYX = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("YX", { size: s }, scene);
        var tEndAll = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateBox("ALL", r, scene);
        tEndX.rotation.x = 1.57;
        tEndY.rotation.x = 1.57;
        tEndZ.rotation.x = 1.57;
        tEndXZ.rotation.x = 1.57;
        tEndZY.rotation.y = 1.57;
        //tEndYX.rotation.x = 0;
        tEndXZ.position.x = s;
        tEndXZ.position.z = s;
        tEndZY.position.z = s;
        tEndZY.position.y = s;
        tEndYX.position.y = s;
        tEndYX.position.x = s;
        tEndX.parent = this._tX;
        tEndY.parent = this._tY;
        tEndZ.parent = this._tZ;
        tEndXZ.parent = this._tXZ;
        tEndZY.parent = this._tZY;
        tEndYX.parent = this._tYX;
        tEndAll.parent = this._tAll;
        tEndX.position.z = l - cl / 2;
        tEndY.position.z = l - cl / 2;
        tEndZ.position.z = l - cl / 2;
        tEndX.material = this._redMat;
        tEndY.material = this._greenMat;
        tEndZ.material = this._blueMat;
        tEndXZ.material = this._greenMat;
        tEndZY.material = this._redMat;
        tEndYX.material = this._blueMat;
        tEndAll.material = this._yellowMat;
        this._tEndX = tEndX;
        this._tEndY = tEndY;
        this._tEndZ = tEndZ;
        this._tEndXZ = tEndXZ;
        this._tEndZY = tEndZY;
        this._tEndYX = tEndYX;
        this._tEndAll = tEndAll;
        this._all_tEnd = [tEndX, tEndY, tEndZ, tEndXZ, tEndZY, tEndYX, tEndAll];
        this._setPickableFalse(this._all_tEnd);
        this._setRenderingGroup(this._all_tEnd);
    };
    EditControl.prototype.setRotGuideFull = function (y) {
        if (y)
            this._guideSize = 360;
        else
            this._guideSize = 180;
        if (this._rCtl != null) {
            this._rCtl.dispose();
            this._rAll.dispose();
            this._rCtl = null;
            this.enableRotation();
        }
    };
    EditControl.prototype._createRotAxes = function () {
        var d = this._axesLen * this._axesScale * 2;
        this._rCtl = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"]("", this._scene);
        //pickable invisible torus around the rotation circles
        this._createPickableRot(d, this._rCtl);
        /*non pickable but visible circles */
        this._createNonPickableRot(d);
    };
    EditControl.prototype._createPickableRot = function (d, rCtl) {
        var rX = this._createTube(d / 2, this._guideSize);
        var rY = this._createTube(d / 2, this._guideSize);
        var rZ = this._createTube(d / 2, this._guideSize);
        var rAll = this._createTube(d / 1.75, 360);
        rX.name = "X";
        rY.name = "Y";
        rZ.name = "Z";
        rAll.name = "ALL";
        rX.rotation.z = 1.57;
        rZ.rotation.x = -1.57;
        rX.bakeCurrentTransformIntoVertices();
        rZ.bakeCurrentTransformIntoVertices();
        rAll.rotation.x = 1.57;
        rX.parent = rCtl;
        rY.parent = rCtl;
        rZ.parent = rCtl;
        rAll.parent = this._pALL;
        this._rX = rX;
        this._rY = rY;
        this._rZ = rZ;
        this._rAll = rAll;
        this._all_r = [rX, rY, rZ, rAll];
        this._setVisibility(this._all_r, 0);
        //do not want clients picking this
        //we will pick using mesh filter in scene.pick function
        this._setPickableFalse(this._all_r);
    };
    EditControl.prototype._createNonPickableRot = function (d) {
        var rEndX = this._createCircle(d / 2, this._guideSize, false);
        var rEndY = rEndX.clone("");
        var rEndZ = rEndX.clone("");
        var rEndAll = this._createCircle(d / 1.75, 360, false);
        var rEndAll2 = this._createCircle(d / 2, 360, false);
        rEndX.parent = this._rX;
        rEndY.parent = this._rY;
        rEndZ.parent = this._rZ;
        rEndX.rotation.z = 1.57;
        rEndZ.rotation.x = -1.57;
        rEndAll.parent = this._rAll;
        rEndAll2.parent = this._rAll;
        rEndX.color = this._redCol;
        rEndY.color = this._greenCol;
        rEndZ.color = this._blueCol;
        rEndAll.color = this._yellowCol;
        rEndAll2.color = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"].Gray();
        this._rEndX = rEndX;
        this._rEndY = rEndY;
        this._rEndZ = rEndZ;
        this._rEndAll = rEndAll;
        this._rEndAll2 = rEndAll2;
        this._all_rEnd = [rEndX, rEndY, rEndZ, rEndAll, rEndAll2];
        this._setPickableFalse(this._all_rEnd);
        this._setRenderingGroup(this._all_rEnd);
    };
    EditControl.prototype._setVisibility = function (meshes, v) {
        meshes.map(function (m) { return m.visibility = v; });
    };
    EditControl.prototype._setPickableFalse = function (meshes) {
        meshes.map(function (m) { m.isPickable = false; });
    };
    EditControl.prototype._setRenderingGroup = function (meshes) {
        meshes.map(function (m) { return m.renderingGroupId = 2; });
    };
    EditControl.prototype._extrudeBox = function (w, l) {
        var shape = [new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](w, w, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-w, w, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-w, -w, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](w, -w, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](w, w, 0)];
        var path = [new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0), new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, l)];
        var box = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].ExtrudeShape("", shape, path, 1, 0, 2, this._scene);
        return box;
    };
    EditControl.prototype._createCircle = function (r, t, double) {
        if (t === null)
            t = 360;
        var points = [];
        var x;
        var z;
        var a = 3.14 / 180;
        var p = 0;
        for (var i = 0; i <= t; i = i + 5) {
            x = r * Math.cos(i * a);
            if (i == 90)
                z = r;
            else if (i == 270)
                z = -r;
            else
                z = r * Math.sin(i * a);
            points[p] = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](x, 0, z);
            p++;
        }
        if (double) {
            r = r - 0.04;
            for (var i = 0; i <= t; i = i + 5) {
                x = r * Math.cos(i * a);
                if (i == 90)
                    z = r;
                else if (i == 270)
                    z = -r;
                else
                    z = r * Math.sin(i * a);
                points[p] = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](x, 0, z);
                p++;
            }
        }
        var circle = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateLines("", points, this._scene);
        return circle;
    };
    EditControl.prototype._createTube = function (r, t) {
        if (t === null)
            t = 360;
        var points = [];
        var x;
        var z;
        var a = 3.14 / 180;
        var p = 0;
        for (var i = 0; i <= t; i = i + 30) {
            x = r * Math.cos(i * a);
            if (i == 90)
                z = r;
            else if (i == 270)
                z = -r;
            else
                z = r * Math.sin(i * a);
            points[p] = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](x, 0, z);
            p++;
        }
        var tube = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateTube("", points, this._pickWidth * this._axesScale * 2, 3, null, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].NO_CAP, this._scene);
        return tube;
    };
    EditControl.prototype._createScaleAxes = function () {
        var r = this._pickWidth * 2 * this._axesScale;
        var l = this._axesLen * this._axesScale;
        this._sCtl = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"]("", this._scene);
        /* pickable , invisible part */
        this._createPickableScale(r, l, this._sCtl);
        /* non pickable visible boxes at end of axes */
        this._createNonPickableScale(r, l);
    };
    EditControl.prototype._createPickableScale = function (r, l, sCtl) {
        var sX = this._extrudeBox(r / 2, l);
        sX.name = "X";
        var sY = sX.clone("Y");
        var sZ = sX.clone("Z");
        var sXZ = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("XZ", { size: r * 2 }, this._scene);
        var sZY = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("ZY", { size: r * 2 }, this._scene);
        var sYX = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("YX", { size: r * 2 }, this._scene);
        sXZ.rotation.x = 1.57;
        sZY.rotation.y = -1.57;
        sXZ.position.x = 2 * r;
        sXZ.position.z = 2 * r;
        sZY.position.z = 2 * r;
        sZY.position.y = 2 * r;
        sYX.position.y = 2 * r;
        sYX.position.x = 2 * r;
        sXZ.bakeCurrentTransformIntoVertices();
        sZY.bakeCurrentTransformIntoVertices();
        sYX.bakeCurrentTransformIntoVertices();
        var sAll = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateBox("ALL", 2 * r, this._scene);
        sX.parent = sCtl;
        sY.parent = sCtl;
        sZ.parent = sCtl;
        sAll.parent = sCtl;
        sXZ.parent = sCtl;
        sZY.parent = sCtl;
        sYX.parent = sCtl;
        sX.rotation.y = 1.57;
        sY.rotation.x -= 1.57;
        this._sX = sX;
        this._sY = sY;
        this._sZ = sZ;
        this._sXZ = sXZ;
        this._sZY = sZY;
        this._sYX = sYX;
        this._sAll = sAll;
        this._all_s = [sX, sY, sZ, sXZ, sZY, sYX, sAll];
        this._setVisibility(this._all_s, 0);
        //do not want clients picking this
        //we will pick using mesh filter in scene.pick function
        this._setPickableFalse(this._all_s);
    };
    EditControl.prototype._createNonPickableScale = function (r, l) {
        var sEndX = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateBox("", r, this._scene);
        var sEndY = sEndX.clone("");
        var sEndZ = sEndX.clone("");
        var s = r * 2;
        var sEndXZ = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("XZ", { size: s }, this._scene);
        var sEndZY = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("ZY", { size: s }, this._scene);
        var sEndYX = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("YX", { size: s }, this._scene);
        var sEndAll = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateBox("ALL", r, this._scene);
        sEndXZ.rotation.x = 1.57;
        sEndZY.rotation.y = -1.57;
        sEndXZ.position.x = s;
        sEndXZ.position.z = s;
        sEndZY.position.z = s;
        sEndZY.position.y = s;
        sEndYX.position.y = s;
        sEndYX.position.x = s;
        sEndX.parent = this._sX;
        sEndY.parent = this._sY;
        sEndZ.parent = this._sZ;
        sEndXZ.parent = this._sXZ;
        sEndZY.parent = this._sZY;
        sEndYX.parent = this._sYX;
        sEndAll.parent = this._sAll;
        sEndX.position.z = l - r / 2;
        sEndY.position.z = l - r / 2;
        sEndZ.position.z = l - r / 2;
        sEndX.material = this._redMat;
        sEndY.material = this._greenMat;
        sEndZ.material = this._blueMat;
        sEndXZ.material = this._greenMat;
        sEndZY.material = this._redMat;
        sEndYX.material = this._blueMat;
        sEndAll.material = this._yellowMat;
        this._sEndX = sEndX;
        this._sEndY = sEndY;
        this._sEndZ = sEndZ;
        this._sEndXZ = sEndXZ;
        this._sEndZY = sEndZY;
        this._sEndYX = sEndYX;
        this._sEndAll = sEndAll;
        this._all_sEnd = [sEndX, sEndY, sEndZ, sEndXZ, sEndZY, sEndYX, sEndAll];
        this._setPickableFalse(this._all_sEnd);
        this._setRenderingGroup(this._all_sEnd);
    };
    /**
     * checks if a have left hand , right hand issue.
     * In other words if a mesh is a LHS mesh in RHS system or
     * a RHS mesh in LHS system
     * The X axis will be reversed in such cases.
     * thus Cross product of X and Y should be inverse of Z.
     *
     */
    //    private _check_LHS_RHS(mesh: Mesh) {
    //        let actualZ = Vector3.Cross(this._localX, this._localY);
    //        //same direction or opposite direction of Z
    //        if (Vector3.Dot(actualZ, this._localZ) < 0) return true;
    //        else return false;
    //    }
    /**
     * set how transparent the axes are
     * 0 to 1
     * 0 - completely transparent
     * 1 - completely non transparent
     * default is 0.75
     */
    EditControl.prototype.setVisibility = function (v) {
        this._visibility = v;
    };
    EditControl.prototype.setLocal = function (l) {
        if (this._local == l)
            return;
        this._local = l;
        if (!l) {
            this._ecRoot.rotationQuaternion = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].Identity();
        }
    };
    EditControl.prototype.isLocal = function () {
        return this._local;
    };
    EditControl.prototype.setTransSnap = function (s) {
        this._snapT = s;
    };
    EditControl.prototype.isTransSnap = function () {
        return this._snapT;
    };
    EditControl.prototype.setRotSnap = function (s) {
        this._snapR = s;
    };
    EditControl.prototype.isRotSnap = function () {
        return this._snapR;
    };
    EditControl.prototype.setScaleSnap = function (s) {
        this._snapS = s;
    };
    EditControl.prototype.isScaleSnap = function () {
        return this._snapS;
    };
    EditControl.prototype.setTransSnapValue = function (t) {
        this._tSnap.copyFromFloats(t, t, t);
        this._transSnap = t;
    };
    EditControl.prototype.getTransSnapValue = function () {
        return this._transSnap;
    };
    EditControl.prototype.setRotSnapValue = function (r) {
        this._rotSnap = r;
    };
    EditControl.prototype.getRotSnapValue = function () {
        return this._rotSnap;
    };
    EditControl.prototype.setScaleSnapValue = function (r) {
        this._scaleSnap = r;
    };
    EditControl.prototype.getScaleSnapValue = function () {
        return this._scaleSnap;
    };
    EditControl.prototype._getAngle2 = function (p1, p2, cameraPos, c2ec, mN) {
        /**
         * A) find out if the camera is above , below, left, right of the rotation plane
         */
        //project "camera to ec" vector onto mesh normal to get distance to rotation plane
        var d = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(c2ec, mN);
        //scale mesh normal by above ammount to get vector to rotation plane
        mN.scaleToRef(d, this._tv1);
        //get the point of intersection of vector from camera perpendicular to rotation plane
        cameraPos.addToRef(this._tv1, this._tv2);
        var i = this._tv2; //save some typing
        //find the co-ordinate of this point in the cameras frame of reference
        this._mainCamera.getWorldMatrix().invertToRef(this._tm);
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinatesToRef(this._tv2, this._tm, this._tv2);
        //find in which quadarant the point (and thus the rotation plane) is in the camera xy plane
        var q = 0; //(1=x y,2=-x y,3=-x -y,4=x -y)
        if (i.x >= 0 && i.y >= 0)
            q = 1;
        else if (i.x <= 0 && i.y >= 0)
            q = 2;
        else if (i.x <= 0 && i.y <= 0)
            q = 3;
        else if (i.x >= 0 && i.y <= 0)
            q = 4;
        /**
         * B) find out if the user moved pointer up,down, right, left
         */
        //find movement vector in camera frame of reference
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinatesToRef(p1, this._tm, this._tv1);
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinatesToRef(p2, this._tm, this._tv2);
        this._tv2.subtractInPlace(this._tv1);
        var mv = this._tv2; //save some typing
        //for now lets set the angle magnitutde same as amount by which the mouse moved
        var angle = mv.length();
        var m = ""; //(u ,d ,r,l)
        if (mv.x >= 0 && mv.y >= 0) {
            if (mv.x >= mv.y)
                m = "r";
            else
                m = "u";
        }
        else if (mv.x <= 0 && mv.y >= 0) {
            if (-mv.x >= mv.y)
                m = "l";
            else
                m = "u";
        }
        else if (mv.x <= 0 && mv.y <= 0) {
            if (-mv.x >= -mv.y)
                m = "l";
            else
                m = "d";
        }
        else if (mv.x >= 0 && mv.y <= 0) {
            if (mv.x >= -mv.y)
                m = "r";
            else
                m = "d";
        }
        /**
         * C) decide if the user was trying to rotate clockwise (+1) or anti-clockwise(-1)
         */
        var r = 0;
        //if mouse moved down /up and rotation plane is on  right or left side of user
        if (m == "d") {
            if (q == 1 || q == 4)
                r = 1;
            else
                r = -1;
        }
        else if (m == "u") {
            if (q == 1 || q == 4)
                r = -1;
            else
                r = 1;
            //if mouse moved right/left and  rotation plane is above or below user
        }
        else if (m == "r") {
            if (q == 2 || q == 1)
                r = 1;
            else
                r = -1;
        }
        else if (m == "l") {
            if (q == 2 || q == 1)
                r = -1;
            else
                r = 1;
        }
        return r * angle;
    };
    /**
     * finds the angle subtended from points p1 to p2 around the point p
     * checks if the user was trying to rotate clockwise (+ve in LHS) or anticlockwise (-ve in LHS)
     * to figure this check the orientation of the user(camera)to ec vector with the rotation normal vector
     */
    EditControl.prototype._getAngle = function (p1, p2, p, c2ec) {
        p1.subtractToRef(p, this._tv1);
        p2.subtractToRef(p, this._tv2);
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].CrossToRef(this._tv1, this._tv2, this._tv3);
        var angle = Math.asin(this._tv3.length() / (this._tv1.length() * this._tv2.length()));
        //camera looking down from front of plane or looking up from behind plane
        if ((babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(this._tv3, c2ec) > 0)) {
            angle = -1 * angle;
        }
        return angle;
    };
    EditControl._getStandardMaterial = function (col, scene) {
        var mat = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("", scene);
        mat.emissiveColor = col;
        mat.diffuseColor = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"].Black();
        mat.specularColor = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"].Black();
        mat.backFaceCulling = false;
        return mat;
    };
    EditControl.prototype._createMaterials = function (scene) {
        this._redMat = EditControl._getStandardMaterial(this._redCol, scene);
        this._greenMat = EditControl._getStandardMaterial(this._greenCol, scene);
        this._blueMat = EditControl._getStandardMaterial(this._blueCol, scene);
        this._whiteMat = EditControl._getStandardMaterial(this._whiteCol, scene);
        this._yellowMat = EditControl._getStandardMaterial(this._yellowCol, scene);
    };
    EditControl.prototype._disposeMaterials = function () {
        this._redMat.dispose();
        this._greenMat.dispose();
        this._blueMat.dispose();
        this._whiteMat.dispose();
        this._yellowMat.dispose();
    };
    return EditControl;
}());

var ActHist = /** @class */ (function () {
    function ActHist(mesh, capacity) {
        this.lastMax = 10;
        this.acts = new Array();
        this.last = -1;
        this.current = -1;
        this.mesh = mesh;
        this.lastMax = capacity - 1;
        this.add();
    }
    ActHist.prototype.setCapacity = function (c) {
        if ((c == 0)) {
            console.error("capacity should be more than zero");
            return;
        }
        this.lastMax = c - 1;
        this.last = -1;
        this.current = -1;
        this.acts = new Array();
        this.add();
    };
    ActHist.prototype.add = function (at) {
        if (at === undefined)
            at = null;
        var act = new Act(this.mesh, at);
        if ((this.current < this.last)) {
            this.acts.splice(this.current + 1);
            this.last = this.current;
        }
        if ((this.last == this.lastMax)) {
            this.acts.shift();
            this.acts.push(act);
        }
        else {
            this.acts.push(act);
            this.last++;
            this.current++;
        }
    };
    ActHist.prototype.undo = function () {
        if ((this.current > 0)) {
            var at = this.acts[this.current].getActionType();
            this.current--;
            this.acts[this.current].perform(this.mesh);
            return at;
        }
    };
    ActHist.prototype.redo = function () {
        if ((this.current < this.last)) {
            this.current++;
            this.acts[this.current].perform(this.mesh);
            return this.acts[this.current].getActionType();
        }
    };
    return ActHist;
}());
var Act = /** @class */ (function () {
    function Act(mesh, at) {
        this._p = mesh.position.clone();
        //if (mesh.rotationQuaternion == null) {
        if (mesh.rotationQuaternion == null) {
            this._rQ = null;
            this._rE = mesh.rotation.clone();
        }
        else {
            this._rQ = mesh.rotationQuaternion.clone();
            this._rE = null;
        }
        this._s = mesh.scaling.clone();
        this._at = at;
    }
    Act.prototype.getActionType = function () {
        return this._at;
    };
    Act.prototype.perform = function (mesh) {
        mesh.position.copyFrom(this._p);
        //check if we are doing euler or quaternion now
        //also check what were we doing when the rotation value
        //was captured and set value accordingly
        if (mesh.rotationQuaternion == null) {
            if (this._rE != null) {
                //mesh.rotation = this.rE.clone();
                mesh.rotation.copyFrom(this._rE);
            }
            else {
                //mesh.rotation = this.r.toEulerAngles();
                mesh.rotation.copyFrom(this._rQ.toEulerAngles());
            }
        }
        else {
            if (this._rQ != null) {
                mesh.rotationQuaternion.copyFrom(this._rQ);
            }
            else {
                //TODO use BABYLON.Quaternion.RotationYawPitchRoll(rot.y, rot.x, rot.z) instead of toQuaternion.
                //mesh.rotationQuaternion.copyFrom(this.rE.toQuaternion());
                mesh.rotationQuaternion.copyFrom(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].RotationYawPitchRoll(this._rE.y, this._rE.x, this._rE.z));
            }
        }
        mesh.scaling.copyFrom(this._s);
    };
    return Act;
}());


/***/ }),

/***/ "babylonjs":
/*!****************************************************************************************************!*\
  !*** external {"commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs","root":"BABYLON"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs__;

/***/ })

/******/ });
});
//# sourceMappingURL=EditControl.max.js.map