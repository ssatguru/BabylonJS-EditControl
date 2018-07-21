var org;
(function (org) {
    var ssatguru;
    (function (ssatguru) {
        var babylonjs;
        (function (babylonjs) {
            var component;
            (function (component) {
                var Axis = BABYLON.Axis;
                var Color3 = BABYLON.Color3;
                var Matrix = BABYLON.Matrix;
                var Mesh = BABYLON.Mesh;
                var MeshBuilder = BABYLON.MeshBuilder;
                var Path2 = BABYLON.Path2;
                var Quaternion = BABYLON.Quaternion;
                var Space = BABYLON.Space;
                var StandardMaterial = BABYLON.StandardMaterial;
                var Vector3 = BABYLON.Vector3;
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
                var EditControl = (function () {
                    //lhs-rhs issue. lhs mesh in rhs or rhs mesh in lhs
                    //private lhsRhs: boolean=false;
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
                        //axes visibility
                        this._visibility = 0.75;
                        this._ecMatrix = new Matrix();
                        //edit control to camera vector
                        this._ecTOcamera = new Vector3(0, 0, 0);
                        //how far away from camera should the edit control appear to be
                        this._distFromCamera = 2;
                        //vector from camera to edit control
                        this._cameraTOec = new Vector3(0, 0, 0);
                        this._cameraNormal = new Vector3(0, 0, 0);
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
                        this._transBy = new Vector3(0, 0, 0);
                        this._snapTV = new Vector3(0, 0, 0);
                        this._snapS = false;
                        this._snapSV = new Vector3(0, 0, 0);
                        this._scaleSnap = 0.25;
                        this._scale = new Vector3(0, 0, 0);
                        this._localX = new Vector3(0, 0, 0);
                        this._localY = new Vector3(0, 0, 0);
                        this._localZ = new Vector3(0, 0, 0);
                        this._eulerian = false;
                        this._snapRA = 0;
                        this._transEnabled = false;
                        this._rotEnabled = false;
                        this._scaleEnabled = false;
                        this._guideSize = 180;
                        this._tSnap = new Vector3(this._transSnap, this._transSnap, this._transSnap);
                        //few temp vectors & matrix
                        this._tv1 = new Vector3(0, 0, 0);
                        this._tv2 = new Vector3(0, 0, 0);
                        this._tv3 = new Vector3(0, 0, 0);
                        this._tm = new Matrix();
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
                        //this.lhsRhs=this.check_LHS_RHS(mesh);
                        //build the edit control axes
                        this._ecRoot = new Mesh("EditControl", this._scene);
                        this._ecRoot.rotationQuaternion = Quaternion.Identity();
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
                        //with canvas one will have to do ones own pickinfo generattion.
                        canvas.addEventListener("pointerdown", this._pointerdown, false);
                        canvas.addEventListener("pointerup", this._pointerup, false);
                        canvas.addEventListener("pointermove", this._pointermove, false);
                        this._renderer = function () { return _this._renderLoopProcess(); };
                        this._scene.registerBeforeRender(this._renderer);
                    }
                    //make sure that if eulerian is set to false then mesh's rotation is in quaternion
                    //throw error and exit if not so.
                    EditControl.prototype._checkQuaternion = function () {
                        if (!this._eulerian) {
                            if ((this._mesh.rotationQuaternion == null) || (this._mesh.rotationQuaternion == undefined)) {
                                throw "Error: Eulerian is set to false but the mesh's rotationQuaternion is not set.";
                            }
                        }
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
                            Vector3.TransformCoordinatesToRef(this._mainCamera.position, this._ecMatrix, this._ecTOcamera);
                            //note pALL is child of ecRoot hence lookAt in local space
                            this._pALL.lookAt(this._ecTOcamera, 0, 0, 0, Space.LOCAL);
                        }
                        else {
                            this._mainCamera.position.subtractToRef(this._ecRoot.position, this._ecTOcamera);
                            this._pALL.lookAt(this._mainCamera.position, 0, 0, 0, Space.WORLD);
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
                                    Quaternion.RotationYawPitchRollToRef(rot.y, rot.x, rot.z, this._ecRoot.rotationQuaternion);
                                }
                                else {
                                    this._ecRoot.rotationQuaternion.copyFrom(this._mesh.rotationQuaternion);
                                }
                            }
                            else {
                                if (this._isScaleUnEqual(this._mesh))
                                    return;
                                this._mesh.getWorldMatrix().getRotationMatrixToRef(this._tm);
                                Quaternion.FromRotationMatrixToRef(this._tm, this._ecRoot.rotationQuaternion);
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
                        Vector3.FromFloatArrayToRef(this._mainCamera.getWorldMatrix().asArray(), 8, this._cameraNormal);
                        //get distance of edit control from the camera plane 
                        //project "camera to edit control" vector onto the camera normal
                        var parentOnNormal = Vector3.Dot(this._cameraTOec, this._cameraNormal) / this._cameraNormal.length();
                        var s = Math.abs(parentOnNormal / this._distFromCamera);
                        Vector3.FromFloatsToRef(s, s, s, this._ecRoot.scaling);
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
                        this.refreshBoundingInfo();
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
                        //TODO: do we really need to do a pick here?
                        //onPointerOver() has already done this.
                        var pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY, function (mesh) {
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
                        camera.detachControl(canvas);
                    };
                    EditControl.prototype.isPointerOver = function () {
                        return this._pointerIsOver;
                    };
                    EditControl.prototype._onPointerOver = function () {
                        var _this = this;
                        //if(this.pDown) return;
                        var pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY, function (mesh) {
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
                                    this._prevOverMesh.getChildren()[0].color = Color3.White();
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
                                    this._xaxis.color = Color3.White();
                                }
                                else if (this._prevOverMesh.name == "Y") {
                                    this._yaxis.color = Color3.White();
                                }
                                else if (this._prevOverMesh.name == "Z") {
                                    this._zaxis.color = Color3.White();
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
                                this._xaxis.color = Color3.Red();
                                break;
                            case "Y":
                                this._yaxis.color = Color3.Green();
                                break;
                            case "Z":
                                this._zaxis.color = Color3.Blue();
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
                            this._mainCamera.attachControl(this._canvas);
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
                                Vector3.TransformCoordinatesToRef(this._mainCamera.position, this._ecMatrix, this._ecTOcamera);
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
                            Vector3.TransformCoordinatesToRef(this._mainCamera.position, this._ecMatrix, this._ecTOcamera);
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
                        if (n == "ALL") {
                            //TODO when translating, the orientation of pALL keeps changing
                            //TODo this is not so with rotation or scaling
                            //TODO so for translation instead of pALL maybe we should use the camera view plane for picking
                            this._transBy = diff;
                        }
                        else {
                            this._transBy.x = 0;
                            this._transBy.y = 0;
                            this._transBy.z = 0;
                            if ((n == "X") || (n == "XZ") || (n == "YX")) {
                                if (this._local)
                                    this._transBy.x = Vector3.Dot(diff, this._localX) / this._localX.length();
                                else
                                    this._transBy.x = diff.x;
                            }
                            if ((n == "Y") || (n == "ZY") || (n == "YX")) {
                                if (this._local)
                                    this._transBy.y = Vector3.Dot(diff, this._localY) / this._localY.length();
                                else
                                    this._transBy.y = diff.y;
                            }
                            if ((n == "Z") || (n == "XZ") || (n == "ZY")) {
                                if (this._local)
                                    this._transBy.z = Vector3.Dot(diff, this._localZ) / this._localZ.length();
                                else
                                    this._transBy.z = diff.z;
                            }
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
                                Vector3.FromFloatsToRef(0, 0, 0, this._snapTV);
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
                            this._mesh.translate(this._tv1, trans.x, Space.WORLD);
                            this._mesh.translate(this._tv2, trans.y, Space.WORLD);
                            this._mesh.translate(this._tv3, trans.z, Space.WORLD);
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
                            this._scale.x = Vector3.Dot(diff, this._localX) / this._localX.length();
                            if (this._mesh.scaling.x < 0)
                                this._scale.x = -this._scale.x;
                            //if(this.lhsRhs) this.scale.x=-this.scale.x;
                        }
                        if ((n == "Y") || (n == "ZY") || (n == "YX")) {
                            this._scale.y = Vector3.Dot(diff, this._localY) / this._localY.length();
                            if (this._mesh.scaling.y < 0)
                                this._scale.y = -this._scale.y;
                        }
                        if ((n == "Z") || (n == "XZ") || (n == "ZY")) {
                            this._scale.z = Vector3.Dot(diff, this._localZ) / this._localZ.length();
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
                            var s = Vector3.Dot(diff, this._mainCamera.upVector);
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
                                var s = Vector3.Dot(diff, this._cameraTOec);
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
                            Vector3.FromFloatsToRef(0, 0, 0, this._snapSV);
                            snapit = false;
                        }
                        mesh.scaling.addInPlace(p);
                    };
                    ;
                    ;
                    /*
                     * This would be called after rotation or scaling as the local axes direction or length might have changed
                     * We need to set the local axis as these are used in all three modes to figure out
                     * direction of mouse move wrt the axes
                     * TODO should use world pivotmatrix instead of worldmatrix - incase pivot axes were rotated?
                     */
                    EditControl.prototype._setLocalAxes = function (mesh) {
                        var meshMatrix = mesh.getWorldMatrix();
                        Vector3.FromFloatArrayToRef(meshMatrix.m, 0, this._localX);
                        Vector3.FromFloatArrayToRef(meshMatrix.m, 4, this._localY);
                        Vector3.FromFloatArrayToRef(meshMatrix.m, 8, this._localZ);
                    };
                    EditControl.prototype._getBoundingDimension = function (mesh) {
                        var bb = mesh.getBoundingInfo().boundingBox;
                        var bd = bb.maximum.subtract(bb.minimum);
                        if (bd.x == 0)
                            bd.x = 1;
                        if (bd.y == 0)
                            bd.y = 1;
                        if (bd.z == 0)
                            bd.z = 1;
                        return bd;
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
                            rAxis = this._local ? this._localX : Axis.X;
                        else if (axis == this._rY)
                            rAxis = this._local ? this._localY : Axis.Y;
                        else if (axis == this._rZ)
                            rAxis = this._local ? this._localZ : Axis.Z;
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
                                mesh.rotate(this._cameraTOec, -angle, Space.WORLD);
                            }
                            else {
                                if (Vector3.Dot(rAxis, this._cameraTOec) >= 0)
                                    angle = -angle;
                                mesh.rotate(rAxis, angle, Space.WORLD);
                            }
                            if (this._eulerian) {
                                mesh.rotation = mesh.rotationQuaternion.toEulerAngles();
                                mesh.rotationQuaternion = null;
                            }
                            if (this._local) {
                                if ((this._mesh.parent != null) && this._isScaleUnEqual(mesh)) {
                                    if (axis == this._rAll) {
                                        this._ecRoot.rotate(this._cameraTOec, -angle, Space.WORLD);
                                    }
                                    else {
                                        this._ecRoot.rotate(rAxis, angle, Space.WORLD);
                                    }
                                }
                            }
                        }
                    };
                    EditControl.prototype._getPosOnPickPlane = function () {
                        var _this = this;
                        var pickinfo = this._scene.pick(this._scene.pointerX, this._scene.pointerY, function (mesh) {
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
                    EditControl.prototype._setAxesVisiblity = function (v) {
                        if (this._transEnabled) {
                            this._tEndX.visibility = v;
                            this._tEndY.visibility = v;
                            this._tEndZ.visibility = v;
                            this._tEndXZ.visibility = v;
                            this._tEndZY.visibility = v;
                            this._tEndYX.visibility = v;
                            this._tEndAll.visibility = v;
                        }
                        if (this._rotEnabled) {
                            this._rEndX.visibility = v;
                            this._rEndY.visibility = v;
                            this._rEndZ.visibility = v;
                            this._rEndAll.visibility = v;
                        }
                        if (this._scaleEnabled) {
                            this._sEndX.visibility = v;
                            this._sEndY.visibility = v;
                            this._sEndZ.visibility = v;
                            this._sEndXZ.visibility = v;
                            this._sEndZY.visibility = v;
                            this._sEndYX.visibility = v;
                            this._sEndAll.visibility = v;
                        }
                    };
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
                        if ((this._tX == null)) {
                            this._createTransAxes();
                            this._tCtl.parent = this._ecRoot;
                        }
                        this._clearPrevOverMesh();
                        if (!this._transEnabled) {
                            this._tEndX.visibility = this._visibility;
                            this._tEndY.visibility = this._visibility;
                            this._tEndZ.visibility = this._visibility;
                            this._tEndXZ.visibility = this._visibility;
                            this._tEndZY.visibility = this._visibility;
                            this._tEndYX.visibility = this._visibility;
                            this._tEndAll.visibility = this._visibility;
                            this._transEnabled = true;
                            this.disableRotation();
                            this.disableScaling();
                        }
                    };
                    EditControl.prototype.disableTranslation = function () {
                        if (this._transEnabled) {
                            this._tEndX.visibility = 0;
                            this._tEndY.visibility = 0;
                            this._tEndZ.visibility = 0;
                            this._tEndXZ.visibility = 0;
                            this._tEndZY.visibility = 0;
                            this._tEndYX.visibility = 0;
                            this._tEndAll.visibility = 0;
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
                        //if(this.rX==null) {
                        if (this._rCtl == null) {
                            this._createRotAxes();
                            this._rCtl.parent = this._ecRoot;
                        }
                        this._clearPrevOverMesh();
                        if (!this._rotEnabled) {
                            this._rEndX.visibility = this._visibility;
                            this._rEndY.visibility = this._visibility;
                            this._rEndZ.visibility = this._visibility;
                            this._rEndAll.visibility = this._visibility;
                            this._rEndAll2.visibility = this._visibility;
                            this._rotEnabled = true;
                            this.disableTranslation();
                            this.disableScaling();
                        }
                    };
                    EditControl.prototype.disableRotation = function () {
                        if (this._rotEnabled) {
                            this._rEndX.visibility = 0;
                            this._rEndY.visibility = 0;
                            this._rEndZ.visibility = 0;
                            this._rEndAll.visibility = 0;
                            this._rEndAll2.visibility = 0;
                            this._rotEnabled = false;
                        }
                    };
                    EditControl.prototype.isScalingEnabled = function () {
                        return this._scaleEnabled;
                    };
                    EditControl.prototype.enableScaling = function () {
                        if (this._sX == null) {
                            this._createScaleAxes();
                            this._sCtl.parent = this._ecRoot;
                        }
                        this._clearPrevOverMesh();
                        if (!this._scaleEnabled) {
                            this._sEndX.visibility = this._visibility;
                            this._sEndY.visibility = this._visibility;
                            this._sEndZ.visibility = this._visibility;
                            this._sEndXZ.visibility = this._visibility;
                            this._sEndZY.visibility = this._visibility;
                            this._sEndYX.visibility = this._visibility;
                            this._sEndAll.visibility = this._visibility;
                            this._scaleEnabled = true;
                            this.disableTranslation();
                            this.disableRotation();
                        }
                    };
                    EditControl.prototype.disableScaling = function () {
                        if (this._scaleEnabled) {
                            this._sEndX.visibility = 0;
                            this._sEndY.visibility = 0;
                            this._sEndZ.visibility = 0;
                            this._sEndXZ.visibility = 0;
                            this._sEndZY.visibility = 0;
                            this._sEndYX.visibility = 0;
                            this._sEndAll.visibility = 0;
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
                        var guideAxes = new Mesh("guideCtl", this._scene);
                        //the big axes, shown when an axis is selected
                        this._bXaxis = Mesh.CreateLines("bxAxis", [new Vector3(-100, 0, 0), new Vector3(100, 0, 0)], this._scene);
                        this._bYaxis = Mesh.CreateLines("byAxis", [new Vector3(0, -100, 0), new Vector3(0, 100, 0)], this._scene);
                        this._bZaxis = Mesh.CreateLines("bzAxis", [new Vector3(0, 0, -100), new Vector3(0, 0, 100)], this._scene);
                        //lines are now pickable too
                        this._bXaxis.isPickable = false;
                        this._bYaxis.isPickable = false;
                        this._bZaxis.isPickable = false;
                        this._bXaxis.parent = guideAxes;
                        this._bYaxis.parent = guideAxes;
                        this._bZaxis.parent = guideAxes;
                        this._bXaxis.color = Color3.Red();
                        this._bYaxis.color = Color3.Green();
                        this._bZaxis.color = Color3.Blue();
                        this._hideBaxis();
                        //the small axis
                        var al = this._axesLen * this._axesScale * 0.75;
                        this._xaxis = Mesh.CreateLines("xAxis", [new Vector3(0, 0, 0), new Vector3(al, 0, 0)], this._scene);
                        this._yaxis = Mesh.CreateLines("yAxis", [new Vector3(0, 0, 0), new Vector3(0, al, 0)], this._scene);
                        this._zaxis = Mesh.CreateLines("zAxis", [new Vector3(0, 0, 0), new Vector3(0, 0, al)], this._scene);
                        //lines are now pickable too
                        this._xaxis.isPickable = false;
                        this._yaxis.isPickable = false;
                        this._zaxis.isPickable = false;
                        this._xaxis.parent = guideAxes;
                        this._yaxis.parent = guideAxes;
                        this._zaxis.parent = guideAxes;
                        this._xaxis.color = Color3.Red();
                        this._yaxis.color = Color3.Green();
                        this._zaxis.color = Color3.Blue();
                        this._xaxis.renderingGroupId = 1;
                        this._yaxis.renderingGroupId = 1;
                        this._zaxis.renderingGroupId = 1;
                        return guideAxes;
                    };
                    EditControl.prototype._createPickPlanes = function () {
                        this._pALL = Mesh.CreatePlane("pALL", 5, this._scene);
                        this._pXZ = Mesh.CreatePlane("pXZ", 5, this._scene);
                        this._pZY = Mesh.CreatePlane("pZY", 5, this._scene);
                        this._pYX = Mesh.CreatePlane("pYX", 5, this._scene);
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
                        this._pXZ.rotate(Axis.X, 1.57);
                        this._pZY.rotate(Axis.Y, 1.57);
                        var pickPlanes = new Mesh("pickPlanes", this._scene);
                        this._pALL.parent = pickPlanes;
                        this._pXZ.parent = pickPlanes;
                        this._pZY.parent = pickPlanes;
                        this._pYX.parent = pickPlanes;
                        return pickPlanes;
                    };
                    EditControl.prototype._createTransAxes = function () {
                        var r = this._pickWidth * 2 * this._axesScale;
                        var l = this._axesLen * this._axesScale;
                        this._tCtl = new Mesh("tarnsCtl", this._scene);
                        //pickable invisible boxes around axes lines
                        this._tX = this._extrudeBox(r / 2, l);
                        this._tX.name = "X";
                        this._tY = this._tX.clone("Y");
                        this._tZ = this._tX.clone("Z");
                        this._tXZ = MeshBuilder.CreatePlane("XZ", { size: r * 2 }, this._scene);
                        this._tZY = MeshBuilder.CreatePlane("ZY", { size: r * 2 }, this._scene);
                        this._tYX = MeshBuilder.CreatePlane("YX", { size: r * 2 }, this._scene);
                        //this.tZY=this.tXZ.clone("ZY");
                        //this.tYX=this.tXZ.clone("YX");
                        this._tXZ.rotation.x = 1.57;
                        this._tZY.rotation.y = -1.57;
                        this._tXZ.position.x = r;
                        this._tXZ.position.z = r;
                        this._tZY.position.z = r;
                        this._tZY.position.y = r;
                        this._tYX.position.y = r;
                        this._tYX.position.x = r;
                        this._tXZ.bakeCurrentTransformIntoVertices();
                        this._tZY.bakeCurrentTransformIntoVertices();
                        this._tYX.bakeCurrentTransformIntoVertices();
                        this._tAll = Mesh.CreateBox("ALL", r * 2, this._scene);
                        this._tX.parent = this._tCtl;
                        this._tY.parent = this._tCtl;
                        this._tZ.parent = this._tCtl;
                        this._tXZ.parent = this._tCtl;
                        this._tZY.parent = this._tCtl;
                        this._tYX.parent = this._tCtl;
                        this._tAll.parent = this._tCtl;
                        this._tX.rotation.y = 1.57;
                        this._tY.rotation.x -= 1.57;
                        this._tX.visibility = 0;
                        this._tY.visibility = 0;
                        this._tZ.visibility = 0;
                        this._tXZ.visibility = 0;
                        this._tZY.visibility = 0;
                        this._tYX.visibility = 0;
                        this._tAll.visibility = 0;
                        //do not want clients picking this
                        //we will pick using mesh filter in scene.pick function
                        this._tX.isPickable = false;
                        this._tY.isPickable = false;
                        this._tZ.isPickable = false;
                        this._tXZ.isPickable = false;
                        this._tZY.isPickable = false;
                        this._tYX.isPickable = false;
                        this._tAll.isPickable = false;
                        //non pickable but visible cones at end of axes lines
                        //cone length
                        var cl = l / 5;
                        //cone base radius
                        var cr = r;
                        this._tEndX = Mesh.CreateCylinder("tEndX", cl, 0, cr, 6, 1, this._scene);
                        this._tEndY = this._tEndX.clone("tEndY");
                        this._tEndZ = this._tEndX.clone("tEndZ");
                        this._tEndXZ = this._createTriangle("XZ", cr * 1.75, this._scene);
                        this._tEndZY = this._tEndXZ.clone("ZY");
                        this._tEndYX = this._tEndXZ.clone("YX");
                        this._tEndAll = MeshBuilder.CreatePolyhedron("tEndAll", { type: 1, size: cr / 2 }, this._scene);
                        this._tEndX.rotation.x = 1.57;
                        this._tEndY.rotation.x = 1.57;
                        this._tEndZ.rotation.x = 1.57;
                        this._tEndZY.rotation.z = 1.57;
                        this._tEndYX.rotation.x = -1.57;
                        this._tEndXZ.position.x = r;
                        this._tEndXZ.position.z = r;
                        this._tEndZY.position.z = r;
                        this._tEndZY.position.y = r;
                        this._tEndYX.position.y = r;
                        this._tEndYX.position.x = r;
                        this._tEndX.parent = this._tX;
                        this._tEndY.parent = this._tY;
                        this._tEndZ.parent = this._tZ;
                        this._tEndXZ.parent = this._tXZ;
                        this._tEndZY.parent = this._tZY;
                        this._tEndYX.parent = this._tYX;
                        this._tEndAll.parent = this._tAll;
                        this._tEndX.position.z = l - cl / 2;
                        this._tEndY.position.z = l - cl / 2;
                        this._tEndZ.position.z = l - cl / 2;
                        this._tEndX.material = this._redMat;
                        this._tEndY.material = this._greenMat;
                        this._tEndZ.material = this._blueMat;
                        this._tEndXZ.material = this._greenMat;
                        this._tEndZY.material = this._redMat;
                        this._tEndYX.material = this._blueMat;
                        this._tEndAll.material = this._yellowMat;
                        this._tEndX.renderingGroupId = 2;
                        this._tEndY.renderingGroupId = 2;
                        this._tEndZ.renderingGroupId = 2;
                        this._tEndXZ.renderingGroupId = 2;
                        this._tEndZY.renderingGroupId = 2;
                        this._tEndYX.renderingGroupId = 2;
                        this._tEndAll.renderingGroupId = 2;
                        this._tEndX.isPickable = false;
                        this._tEndY.isPickable = false;
                        this._tEndZ.isPickable = false;
                        this._tEndXZ.isPickable = false;
                        this._tEndZY.isPickable = false;
                        this._tEndYX.isPickable = false;
                        this._tEndAll.isPickable = false;
                    };
                    EditControl.prototype._createTriangle = function (name, w, scene) {
                        console.log("_createTriangle " + w);
                        var p = new Path2(w / 2, -w / 2).addLineTo(w / 2, w / 2).addLineTo(-w / 2, w / 2).addLineTo(w / 2, -w / 2);
                        var s = new BABYLON.PolygonMeshBuilder(name, p, scene);
                        var t = s.build();
                        return t;
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
                        this._rCtl = new Mesh("rotCtl", this._scene);
                        //pickable invisible torus around the rotation circles
                        this._rX = this._createTube(d / 2, this._guideSize);
                        this._rX.name = "X";
                        this._rY = this._createTube(d / 2, this._guideSize);
                        this._rY.name = "Y";
                        this._rZ = this._createTube(d / 2, this._guideSize);
                        this._rZ.name = "Z";
                        this._rAll = this._createTube(d / 1.75, 360);
                        this._rAll.name = "ALL";
                        this._rX.rotation.z = 1.57;
                        this._rZ.rotation.x = -1.57;
                        this._rX.bakeCurrentTransformIntoVertices();
                        this._rZ.bakeCurrentTransformIntoVertices();
                        this._rAll.rotation.x = 1.57;
                        this._rX.parent = this._rCtl;
                        this._rY.parent = this._rCtl;
                        this._rZ.parent = this._rCtl;
                        this._rAll.parent = this._pALL;
                        this._rX.visibility = 0;
                        this._rY.visibility = 0;
                        this._rZ.visibility = 0;
                        this._rAll.visibility = 0;
                        //do not want clients picking this
                        //we will pick using mesh filter in scene.pick function
                        this._rX.isPickable = false;
                        this._rY.isPickable = false;
                        this._rZ.isPickable = false;
                        this._rAll.isPickable = false;
                        //non pickable but visible circles
                        var cl = d;
                        this._rEndX = this._createCircle(cl / 2, this._guideSize, false);
                        this._rEndY = this._rEndX.clone("");
                        this._rEndZ = this._rEndX.clone("");
                        this._rEndAll = this._createCircle(cl / 1.75, 360, false);
                        this._rEndAll2 = this._createCircle(cl / 2, 360, false);
                        this._rEndX.parent = this._rX;
                        this._rEndY.parent = this._rY;
                        this._rEndZ.parent = this._rZ;
                        this._rEndX.rotation.z = 1.57;
                        this._rEndZ.rotation.x = -1.57;
                        this._rEndAll.parent = this._rAll;
                        this._rEndAll2.parent = this._rAll;
                        this._rEndX.color = Color3.Red();
                        this._rEndY.color = Color3.Green();
                        this._rEndZ.color = Color3.Blue();
                        this._rEndAll.color = Color3.Yellow();
                        this._rEndAll2.color = Color3.Gray();
                        this._rEndX.renderingGroupId = 2;
                        this._rEndY.renderingGroupId = 2;
                        this._rEndZ.renderingGroupId = 2;
                        this._rEndAll.renderingGroupId = 2;
                        this._rEndAll2.renderingGroupId = 2;
                        this._rEndX.isPickable = false;
                        this._rEndY.isPickable = false;
                        this._rEndZ.isPickable = false;
                        this._rEndAll.isPickable = false;
                        this._rEndAll2.isPickable = false;
                    };
                    EditControl.prototype._extrudeBox = function (w, l) {
                        var shape = [new Vector3(w, w, 0), new Vector3(-w, w, 0), new Vector3(-w, -w, 0), new Vector3(w, -w, 0), new Vector3(w, w, 0)];
                        var path = [new Vector3(0, 0, 0), new Vector3(0, 0, l)];
                        var box = Mesh.ExtrudeShape("", shape, path, 1, 0, 2, this._scene);
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
                            points[p] = new Vector3(x, 0, z);
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
                                points[p] = new Vector3(x, 0, z);
                                p++;
                            }
                        }
                        var circle = Mesh.CreateLines("", points, this._scene);
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
                            points[p] = new Vector3(x, 0, z);
                            p++;
                        }
                        var tube = Mesh.CreateTube("", points, this._pickWidth * this._axesScale * 2, 3, null, BABYLON.Mesh.NO_CAP, this._scene);
                        return tube;
                    };
                    EditControl.prototype._createScaleAxes = function () {
                        var r = this._pickWidth * 2 * this._axesScale;
                        var l = this._axesLen * this._axesScale;
                        this._sCtl = new Mesh("sCtl", this._scene);
                        //pickable , invisible part
                        this._sX = this._extrudeBox(r / 2, l);
                        this._sX.name = "X";
                        this._sY = this._sX.clone("Y");
                        this._sZ = this._sX.clone("Z");
                        this._sXZ = MeshBuilder.CreatePlane("XZ", { size: r * 2 }, this._scene);
                        this._sZY = MeshBuilder.CreatePlane("ZY", { size: r * 2 }, this._scene);
                        this._sYX = MeshBuilder.CreatePlane("YX", { size: r * 2 }, this._scene);
                        //this.sZY=this.sXZ.clone("ZY");
                        //this.sYX=this.sXZ.clone("YX");
                        this._sXZ.rotation.x = 1.57;
                        this._sZY.rotation.y = -1.57;
                        this._sXZ.position.x = r;
                        this._sXZ.position.z = r;
                        this._sZY.position.z = r;
                        this._sZY.position.y = r;
                        this._sYX.position.y = r;
                        this._sYX.position.x = r;
                        this._sXZ.bakeCurrentTransformIntoVertices();
                        this._sZY.bakeCurrentTransformIntoVertices();
                        this._sYX.bakeCurrentTransformIntoVertices();
                        this._sAll = Mesh.CreateBox("ALL", r * 2, this._scene);
                        this._sX.parent = this._sCtl;
                        this._sY.parent = this._sCtl;
                        this._sZ.parent = this._sCtl;
                        this._sAll.parent = this._sCtl;
                        this._sXZ.parent = this._sCtl;
                        this._sZY.parent = this._sCtl;
                        this._sYX.parent = this._sCtl;
                        this._sX.rotation.y = 1.57;
                        this._sY.rotation.x -= 1.57;
                        this._sX.visibility = 0;
                        this._sY.visibility = 0;
                        this._sZ.visibility = 0;
                        this._sXZ.visibility = 0;
                        this._sZY.visibility = 0;
                        this._sYX.visibility = 0;
                        this._sAll.visibility = 0;
                        //do not want clients picking this
                        //we will pick using mesh filter in scene.pick function
                        this._sX.isPickable = false;
                        this._sY.isPickable = false;
                        this._sZ.isPickable = false;
                        this._sXZ.isPickable = false;
                        this._sZY.isPickable = false;
                        this._sYX.isPickable = false;
                        this._sAll.isPickable = false;
                        //non pickable visible boxes at end of axes
                        var cr = r;
                        this._sEndX = Mesh.CreateBox("", cr, this._scene);
                        this._sEndY = this._sEndX.clone("");
                        this._sEndZ = this._sEndX.clone("");
                        this._sEndXZ = this._createTriangle("XZ", cr * 1.75, this._scene);
                        this._sEndZY = this._sEndXZ.clone("ZY");
                        this._sEndYX = this._sEndXZ.clone("YX");
                        this._sEndAll = MeshBuilder.CreatePolyhedron("sEndAll", { type: 1, size: cr / 2 }, this._scene);
                        this._sEndZY.rotation.z = 1.57;
                        this._sEndYX.rotation.x = -1.57;
                        this._sEndXZ.position.x = r;
                        this._sEndXZ.position.z = r;
                        this._sEndZY.position.z = r;
                        this._sEndZY.position.y = r;
                        this._sEndYX.position.y = r;
                        this._sEndYX.position.x = r;
                        this._sEndX.parent = this._sX;
                        this._sEndY.parent = this._sY;
                        this._sEndZ.parent = this._sZ;
                        this._sEndXZ.parent = this._sXZ;
                        this._sEndZY.parent = this._sZY;
                        this._sEndYX.parent = this._sYX;
                        this._sEndAll.parent = this._sAll;
                        this._sEndX.position.z = l - cr / 2;
                        this._sEndY.position.z = l - cr / 2;
                        this._sEndZ.position.z = l - cr / 2;
                        this._sEndX.material = this._redMat;
                        this._sEndY.material = this._greenMat;
                        this._sEndZ.material = this._blueMat;
                        this._sEndXZ.material = this._greenMat;
                        this._sEndZY.material = this._redMat;
                        this._sEndYX.material = this._blueMat;
                        this._sEndAll.material = this._yellowMat;
                        this._sEndX.renderingGroupId = 2;
                        this._sEndY.renderingGroupId = 2;
                        this._sEndZ.renderingGroupId = 2;
                        this._sEndXZ.renderingGroupId = 2;
                        this._sEndZY.renderingGroupId = 2;
                        this._sEndYX.renderingGroupId = 2;
                        this._sEndAll.renderingGroupId = 2;
                        this._sEndX.isPickable = false;
                        this._sEndY.isPickable = false;
                        this._sEndZ.isPickable = false;
                        this._sEndXZ.isPickable = false;
                        this._sEndZY.isPickable = false;
                        this._sEndYX.isPickable = false;
                        this._sEndAll.isPickable = false;
                    };
                    /**
                     * checks if a have left hand , right hand issue.
                     * In other words if a mesh is a LHS mesh in RHS system or
                     * a RHS mesh in LHS system
                     * The X axis will be reversed in such cases.
                     * thus Cross product of X and Y should be inverse of Z.
                     *
                     */
                    EditControl.prototype._check_LHS_RHS = function (mesh) {
                        var actualZ = Vector3.Cross(this._localX, this._localY);
                        //same direction or opposite direction of Z
                        if (Vector3.Dot(actualZ, this._localZ) < 0)
                            return true;
                        else
                            return false;
                    };
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
                            this._ecRoot.rotationQuaternion = Quaternion.Identity();
                        }
                    };
                    EditControl.prototype.isLocal = function () {
                        return this._local;
                    };
                    EditControl.prototype.setTransSnap = function (s) {
                        this._snapT = s;
                    };
                    EditControl.prototype.setRotSnap = function (s) {
                        this._snapR = s;
                    };
                    EditControl.prototype.setScaleSnap = function (s) {
                        this._snapS = s;
                    };
                    EditControl.prototype.setTransSnapValue = function (t) {
                        this._tSnap.copyFromFloats(t, t, t);
                        this._transSnap = t;
                    };
                    EditControl.prototype.setRotSnapValue = function (r) {
                        this._rotSnap = r;
                    };
                    /**
                     * use this to set the scale snap value
                     */
                    EditControl.prototype.setScaleSnapValue = function (r) {
                        this._scaleSnap = r;
                    };
                    EditControl.prototype._getAngle2 = function (p1, p2, cameraPos, c2ec, mN) {
                        /**
                         * A) find out if the camera is above , below, left, right of the rotation plane
                         */
                        //project "camera to ec" vector onto mesh normal to get distance to rotation plane
                        var d = Vector3.Dot(c2ec, mN);
                        //scale mesh normal by above ammount to get vector to rotation plane
                        mN.scaleToRef(d, this._tv1);
                        //get the point of intersection of vector from camera perpendicular to rotation plane
                        cameraPos.addToRef(this._tv1, this._tv2);
                        var i = this._tv2; //save some typing
                        //find the co-ordinate of this point in the cameras frame of reference
                        this._mainCamera.getWorldMatrix().invertToRef(this._tm);
                        Vector3.TransformCoordinatesToRef(this._tv2, this._tm, this._tv2);
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
                        Vector3.TransformCoordinatesToRef(p1, this._tm, this._tv1);
                        Vector3.TransformCoordinatesToRef(p2, this._tm, this._tv2);
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
                        Vector3.CrossToRef(this._tv1, this._tv2, this._tv3);
                        var angle = Math.asin(this._tv3.length() / (this._tv1.length() * this._tv2.length()));
                        //camera looking down from front of plane or looking up from behind plane
                        if ((Vector3.Dot(this._tv3, c2ec) > 0)) {
                            angle = -1 * angle;
                        }
                        return angle;
                    };
                    EditControl.prototype._createMaterials = function (scene) {
                        this._redMat = EditControl._getStandardMaterial("redMat", Color3.Red(), scene);
                        this._greenMat = EditControl._getStandardMaterial("greenMat", Color3.Green(), scene);
                        this._blueMat = EditControl._getStandardMaterial("blueMat", Color3.Blue(), scene);
                        this._whiteMat = EditControl._getStandardMaterial("whiteMat", Color3.White(), scene);
                        this._yellowMat = EditControl._getStandardMaterial("whiteMat", Color3.Yellow(), scene);
                    };
                    EditControl.prototype._disposeMaterials = function () {
                        this._redMat.dispose();
                        this._greenMat.dispose();
                        this._blueMat.dispose();
                        this._whiteMat.dispose();
                        this._yellowMat.dispose();
                    };
                    EditControl._getStandardMaterial = function (name, col, scene) {
                        var mat = new StandardMaterial(name, scene);
                        mat.emissiveColor = col;
                        mat.diffuseColor = Color3.Black();
                        mat.specularColor = Color3.Black();
                        mat.backFaceCulling = false;
                        return mat;
                    };
                    return EditControl;
                }());
                component.EditControl = EditControl;
                var ActHist = (function () {
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
                component.ActHist = ActHist;
                var Act = (function () {
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
                                mesh.rotationQuaternion.copyFrom(Quaternion.RotationYawPitchRoll(this._rE.y, this._rE.x, this._rE.z));
                            }
                        }
                        mesh.scaling.copyFrom(this._s);
                    };
                    return Act;
                }());
                component.Act = Act;
            })(component = babylonjs.component || (babylonjs.component = {}));
        })(babylonjs = ssatguru.babylonjs || (ssatguru.babylonjs = {}));
    })(ssatguru = org.ssatguru || (org.ssatguru = {}));
})(org || (org = {}));
//# sourceMappingURL=EditControl.js.map