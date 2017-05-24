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
                var Mesh = BABYLON.Mesh;
                var MeshBuilder = BABYLON.MeshBuilder;
                var Quaternion = BABYLON.Quaternion;
                var Space = BABYLON.Space;
                var StandardMaterial = BABYLON.StandardMaterial;
                var Vector3 = BABYLON.Vector3;
                var EditControl = (function () {
                    function EditControl(mesh, camera, canvas, scale) {
                        var _this = this;
                        this.local = true;
                        this.snapT = false;
                        this.snapR = false;
                        this.transSnap = 1;
                        this.rotSnap = Math.PI / 18;
                        this.axesLen = 0.4;
                        this.axesScale = 1;
                        this.visibility = 0.7;
                        this.pDown = false;
                        this.pointerIsOver = false;
                        this.editing = false;
                        this.snapRX = 0;
                        this.snapRY = 0;
                        this.snapRZ = 0;
                        this.snapTV = new Vector3(0, 0, 0);
                        this.transBy = new Vector3(0, 0, 0);
                        this.snapS = false;
                        this.snapSX = 0;
                        this.snapSY = 0;
                        this.snapSZ = 0;
                        this.snapSA = 0;
                        this.snapSV = new Vector3(0, 0, 0);
                        this.scaleSnap = 0.25;
                        this.scale = new Vector3(0, 0, 0);
                        this.eulerian = false;
                        this.snapRA = 0;
                        this.transEnabled = false;
                        this.rotEnabled = false;
                        this.scaleEnabled = false;
                        this.localX = new Vector3(0, 0, 0);
                        this.localY = new Vector3(0, 0, 0);
                        this.localZ = new Vector3(0, 0, 0);
                        this.distFromCamera = 2;
                        this.toParent = new Vector3(0, 0, 0);
                        this.cameraNormal = new Vector3(0, 0, 0);
                        this.mesh = mesh;
                        this.canvas = canvas;
                        this.axesScale = scale;
                        this.scene = mesh.getScene();
                        this.mainCamera = camera;
                        this.actHist = new ActHist(mesh, 10);
                        mesh.computeWorldMatrix(true);
                        this.theParent = new Mesh("EditControl", this.scene);
                        this.mesh.getAbsolutePivotPointToRef(this.theParent.position);
                        this.theParent.rotationQuaternion = mesh.rotationQuaternion;
                        this.theParent.visibility = 0;
                        this.theParent.isPickable = false;
                        this.createMaterials(this.scene);
                        this.createGuideAxes();
                        this.guideCtl.parent = this.theParent;
                        this.createPickPlane();
                        this.pickPlane.parent = this.theParent;
                        this.pointerdown = function (evt) { return _this.onPointerDown(evt); };
                        this.pointerup = function (evt) { return _this.onPointerUp(evt); };
                        this.pointermove = function (evt) { return _this.onPointerMove(evt); };
                        canvas.addEventListener("pointerdown", this.pointerdown, false);
                        canvas.addEventListener("pointerup", this.pointerup, false);
                        canvas.addEventListener("pointermove", this.pointermove, false);
                        this.setLocalAxes(mesh);
                        this.renderer = function () { return _this.renderLoopProcess(); };
                        this.scene.registerBeforeRender(this.renderer);
                    }
                    EditControl.prototype.renderLoopProcess = function () {
                        this.setAxesScale();
                        this.mesh.getAbsolutePivotPointToRef(this.theParent.position);
                        this.onPointerOver();
                    };
                    EditControl.prototype.switchTo = function (mesh) {
                        mesh.computeWorldMatrix(true);
                        this.mesh = mesh;
                        this.theParent.rotationQuaternion = mesh.rotationQuaternion;
                        this.setLocalAxes(mesh);
                        this.actHist = new ActHist(mesh, 10);
                    };
                    EditControl.prototype.setUndoCount = function (c) {
                        this.actHist.setCapacity(c);
                    };
                    EditControl.prototype.undo = function () {
                        this.actHist.undo();
                        this.mesh.computeWorldMatrix(true);
                        this.setLocalAxes(this.mesh);
                    };
                    EditControl.prototype.redo = function () {
                        this.actHist.redo();
                        this.mesh.computeWorldMatrix(true);
                        this.setLocalAxes(this.mesh);
                    };
                    EditControl.prototype.detach = function () {
                        this.canvas.removeEventListener("pointerdown", this.pointerdown, false);
                        this.canvas.removeEventListener("pointerup", this.pointerup, false);
                        this.canvas.removeEventListener("pointermove", this.pointermove, false);
                        this.scene.unregisterBeforeRender(this.renderer);
                        this.disposeAll();
                    };
                    EditControl.prototype.disposeAll = function () {
                        this.theParent.dispose();
                        this.disposeMaterials();
                        this.actHist = null;
                    };
                    EditControl.prototype.onPointerDown = function (evt) {
                        var _this = this;
                        evt.preventDefault();
                        this.pDown = true;
                        if (evt.button != 0)
                            return;
                        var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (mesh) {
                            if (_this.transEnabled) {
                                if ((mesh == _this.tX) || (mesh == _this.tY) || (mesh == _this.tZ) || (mesh == _this.tXZ) || (mesh == _this.tZY) || (mesh == _this.tYX) || (mesh == _this.tAll))
                                    return true;
                            }
                            else if ((_this.rotEnabled)) {
                                if ((mesh == _this.rX) || (mesh == _this.rY) || (mesh == _this.rZ) || (mesh == _this.rAll))
                                    return true;
                            }
                            else if ((_this.scaleEnabled)) {
                                if ((mesh == _this.sX) || (mesh == _this.sY) || (mesh == _this.sZ) || (mesh == _this.sXZ) || (mesh == _this.sZY) || (mesh == _this.sYX) || (mesh == _this.sAll))
                                    return true;
                            }
                            return false;
                        }, null, this.mainCamera);
                        if (pickResult.hit) {
                            this.axisPicked = pickResult.pickedMesh;
                            var childs = this.axisPicked.getChildren();
                            if (childs.length > 0) {
                                childs[0].visibility = this.visibility;
                            }
                            else {
                                this.axisPicked.visibility = this.visibility;
                            }
                            var name = this.axisPicked.name;
                            if ((name == "X"))
                                this.bXaxis.visibility = 1;
                            else if ((name == "Y"))
                                this.bYaxis.visibility = 1;
                            else if ((name == "Z"))
                                this.bZaxis.visibility = 1;
                            else if ((name == "XZ")) {
                                this.bXaxis.visibility = 1;
                                this.bZaxis.visibility = 1;
                            }
                            else if ((name == "ZY")) {
                                this.bZaxis.visibility = 1;
                                this.bYaxis.visibility = 1;
                            }
                            else if ((name == "YX")) {
                                this.bYaxis.visibility = 1;
                                this.bXaxis.visibility = 1;
                            }
                            else if ((name == "ALL")) {
                                this.bXaxis.visibility = 1;
                                this.bYaxis.visibility = 1;
                                this.bZaxis.visibility = 1;
                            }
                            this.editing = true;
                            this.prevPos = this.getPosOnPickPlane();
                            window.setTimeout((function (cam, can) { return _this.detachControl(cam, can); }), 0, this.mainCamera, this.canvas);
                        }
                    };
                    EditControl.prototype.isEditing = function () {
                        return this.editing;
                    };
                    EditControl.prototype.detachControl = function (cam, can) {
                        var camera = cam;
                        var canvas = can;
                        camera.detachControl(canvas);
                    };
                    EditControl.prototype.isPointerOver = function () {
                        return this.pointerIsOver;
                    };
                    EditControl.prototype.onPointerOver = function () {
                        var _this = this;
                        if (this.pDown)
                            return;
                        var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (mesh) {
                            if (_this.transEnabled) {
                                if ((mesh == _this.tX) || (mesh == _this.tY) || (mesh == _this.tZ) || (mesh == _this.tXZ) || (mesh == _this.tZY) || (mesh == _this.tYX) || (mesh == _this.tAll))
                                    return true;
                            }
                            else if ((_this.rotEnabled)) {
                                if ((mesh == _this.rX) || (mesh == _this.rY) || (mesh == _this.rZ) || (mesh == _this.rAll))
                                    return true;
                            }
                            else if (_this.scaleEnabled) {
                                if ((mesh == _this.sX) || (mesh == _this.sY) || (mesh == _this.sZ) || (mesh == _this.sXZ) || (mesh == _this.sZY) || (mesh == _this.sYX) || (mesh == _this.sAll))
                                    return true;
                            }
                            return false;
                        }, null, this.mainCamera);
                        if (pickResult.hit) {
                            if (pickResult.pickedMesh != this.prevOverMesh) {
                                this.pointerIsOver = true;
                                if (this.prevOverMesh != null) {
                                    this.prevOverMesh.visibility = 0;
                                    this.restoreColor(this.prevOverMesh);
                                }
                                this.prevOverMesh = pickResult.pickedMesh;
                                if (this.rotEnabled) {
                                    this.savedCol = this.prevOverMesh.getChildren()[0].color;
                                    this.prevOverMesh.getChildren()[0].color = Color3.White();
                                }
                                else {
                                    var childs = this.prevOverMesh.getChildren();
                                    if (childs.length > 0) {
                                        this.savedMat = childs[0].material;
                                        childs[0].material = this.whiteMat;
                                    }
                                    else {
                                        this.savedMat = this.prevOverMesh.material;
                                        this.prevOverMesh.material = this.whiteMat;
                                    }
                                }
                                if (this.prevOverMesh.name == "X") {
                                    this.xaxis.color = Color3.White();
                                }
                                else if (this.prevOverMesh.name == "Y") {
                                    this.yaxis.color = Color3.White();
                                }
                                else if (this.prevOverMesh.name == "Z") {
                                    this.zaxis.color = Color3.White();
                                }
                            }
                        }
                        else {
                            this.pointerIsOver = false;
                            if (this.prevOverMesh != null) {
                                this.restoreColor(this.prevOverMesh);
                                this.prevOverMesh = null;
                            }
                        }
                    };
                    EditControl.prototype.restoreColor = function (mesh) {
                        switch (mesh.name) {
                            case "X":
                                this.xaxis.color = Color3.Red();
                                break;
                            case "Y":
                                this.yaxis.color = Color3.Green();
                                break;
                            case "Z":
                                this.zaxis.color = Color3.Blue();
                                break;
                        }
                        if (this.rotEnabled) {
                            mesh.getChildren()[0].color = this.savedCol;
                        }
                        else {
                            var childs = mesh.getChildren();
                            if (childs.length > 0) {
                                childs[0].material = this.savedMat;
                            }
                            else {
                                mesh.material = this.savedMat;
                            }
                        }
                    };
                    EditControl.prototype.onPointerUp = function (evt) {
                        this.pDown = false;
                        if ((this.editing)) {
                            this.mainCamera.attachControl(this.canvas);
                            this.editing = false;
                            this.hideBaxis();
                            this.restoreColor(this.prevOverMesh);
                            this.prevOverMesh = null;
                            this.actHist.add();
                        }
                    };
                    EditControl.prototype.onPointerMove = function (evt) {
                        if (!this.pDown || !this.editing)
                            return;
                        var newPos = this.getPosOnPickPlane();
                        if (newPos == null)
                            return;
                        if (this.transEnabled)
                            this.doTranslation(newPos);
                        if (this.scaleEnabled && this.local)
                            this.doScaling(newPos);
                        if (this.rotEnabled)
                            this.doRotation(newPos);
                        this.prevPos = newPos;
                    };
                    ;
                    EditControl.prototype.doTranslation = function (newPos) {
                        var diff = newPos.subtract(this.prevPos);
                        if (diff.x == 0 && diff.y == 0 && diff.z == 0)
                            return;
                        this.transBy.x = 0;
                        this.transBy.y = 0;
                        this.transBy.z = 0;
                        if ((this.axisPicked == this.tX) || (this.axisPicked == this.tXZ) || (this.axisPicked == this.tYX) || (this.axisPicked == this.tAll)) {
                            if (this.local)
                                this.transBy.x = Vector3.Dot(diff, this.localX) / (this.localX.length() * this.mesh.scaling.x);
                            else
                                this.transBy.x = diff.x;
                        }
                        if ((this.axisPicked == this.tY) || (this.axisPicked == this.tZY) || (this.axisPicked == this.tYX) || (this.axisPicked == this.tAll)) {
                            if (this.local)
                                this.transBy.y = Vector3.Dot(diff, this.localY) / (this.localY.length() * this.mesh.scaling.y);
                            else
                                this.transBy.y = diff.y;
                        }
                        if ((this.axisPicked == this.tZ) || (this.axisPicked == this.tXZ) || (this.axisPicked == this.tZY) || (this.axisPicked == this.tAll)) {
                            if (this.local)
                                this.transBy.z = Vector3.Dot(diff, this.localZ) / (this.localZ.length() * this.mesh.scaling.z);
                            else
                                this.transBy.z = diff.z;
                        }
                        this.transWithSnap(this.mesh, this.transBy, this.local);
                        this.mesh.computeWorldMatrix(true);
                    };
                    EditControl.prototype.transWithSnap = function (mesh, trans, local) {
                        if (this.snapT) {
                            var snapit = false;
                            this.snapTV.addInPlace(trans);
                            if (Math.abs(this.snapTV.x) > (this.tSnap.x / mesh.scaling.x)) {
                                if (this.snapTV.x > 0)
                                    trans.x = this.tSnap.x;
                                else
                                    trans.x = -this.tSnap.x;
                                trans.x = trans.x / mesh.scaling.x;
                                snapit = true;
                            }
                            if (Math.abs(this.snapTV.y) > (this.tSnap.y / mesh.scaling.y)) {
                                if (this.snapTV.y > 0)
                                    trans.y = this.tSnap.y;
                                else
                                    trans.y = -this.tSnap.y;
                                trans.y = trans.y / mesh.scaling.x;
                                snapit = true;
                            }
                            if (Math.abs(this.snapTV.z) > (this.tSnap.z / mesh.scaling.z)) {
                                if (this.snapTV.z > 0)
                                    trans.z = this.tSnap.z;
                                else
                                    trans.z = -this.tSnap.z;
                                trans.z = trans.z / mesh.scaling.z;
                                snapit = true;
                            }
                            if (!snapit) {
                                return;
                            }
                            else {
                                if (Math.abs(trans.x) !== this.tSnap.x)
                                    trans.x = 0;
                                if (Math.abs(trans.y) !== this.tSnap.y)
                                    trans.y = 0;
                                if (Math.abs(trans.z) !== this.tSnap.z)
                                    trans.z = 0;
                            }
                            Vector3.FromFloatsToRef(0, 0, 0, this.snapTV);
                            snapit = false;
                        }
                        if (local) {
                            this.mesh.locallyTranslate(trans);
                        }
                        else {
                            this.mesh.position.addInPlace(trans);
                        }
                    };
                    EditControl.prototype.doScaling = function (newPos) {
                        var diff = newPos.subtract(this.prevPos);
                        if (diff.x == 0 && diff.y == 0 && diff.z == 0)
                            return;
                        this.scale.x = 0;
                        this.scale.y = 0;
                        this.scale.z = 0;
                        if ((this.axisPicked === this.sX) || (this.axisPicked === this.sXZ) || (this.axisPicked === this.sYX) || (this.axisPicked === this.sAll)) {
                            this.scale.x = Vector3.Dot(diff, this.localX) / this.localX.length();
                        }
                        if ((this.axisPicked === this.sY) || (this.axisPicked === this.sYX) || (this.axisPicked === this.sZY) || (this.axisPicked === this.sAll)) {
                            this.scale.y = Vector3.Dot(diff, this.localY) / this.localY.length();
                        }
                        if ((this.axisPicked === this.sZ) || (this.axisPicked === this.sXZ) || (this.axisPicked === this.sZY) || (this.axisPicked === this.sAll)) {
                            this.scale.z = Vector3.Dot(diff, this.localZ) / this.localZ.length();
                        }
                        if ((this.axisPicked === this.sAll)) {
                            this.scale.copyFromFloats(this.scale.y, this.scale.y, this.scale.y);
                        }
                        this.scaleWithSnap(this.mesh, this.scale);
                    };
                    EditControl.prototype.scaleWithSnap = function (mesh, p) {
                        if (this.snapS) {
                            var snapit = false;
                            this.snapSV.addInPlace(p);
                            if (Math.abs(this.snapSV.x) > this.scaleSnap) {
                                if (p.x > 0)
                                    p.x = this.scaleSnap;
                                else
                                    p.x = -this.scaleSnap;
                                snapit = true;
                            }
                            if (Math.abs(this.snapSV.y) > this.scaleSnap) {
                                if (p.y > 0)
                                    p.y = this.scaleSnap;
                                else
                                    p.y = -this.scaleSnap;
                                snapit = true;
                            }
                            if (Math.abs(this.snapSV.z) > this.scaleSnap) {
                                if (p.z > 0)
                                    p.z = this.scaleSnap;
                                else
                                    p.z = -this.scaleSnap;
                                snapit = true;
                            }
                            if (!snapit)
                                return;
                            if ((Math.abs(p.x) !== this.scaleSnap) && (p.x !== 0))
                                p.x = 0;
                            if ((Math.abs(p.y) !== this.scaleSnap) && (p.y !== 0))
                                p.y = 0;
                            if ((Math.abs(p.z) !== this.scaleSnap) && (p.z !== 0))
                                p.z = 0;
                            Vector3.FromFloatsToRef(0, 0, 0, this.snapSV);
                            snapit = false;
                        }
                        mesh.scaling.addInPlace(p);
                    };
                    EditControl.prototype.doRotation = function (newPos) {
                        var cN = Vector3.TransformNormal(Axis.Z, this.mainCamera.getWorldMatrix());
                        var angle = EditControl.getAngle(this.prevPos, newPos, this.mesh.getAbsolutePivotPoint(), cN);
                        if (this.axisPicked == this.rX) {
                            if (this.snapR) {
                                this.snapRX += angle;
                                angle = 0;
                                if (Math.abs(this.snapRX) >= this.rotSnap) {
                                    if ((this.snapRX > 0))
                                        angle = this.rotSnap;
                                    else
                                        angle = -this.rotSnap;
                                    this.snapRX = 0;
                                }
                            }
                            if (angle !== 0) {
                                if (this.local) {
                                    if (Vector3.Dot(this.localX, cN) < 0)
                                        angle = -1 * angle;
                                    this.mesh.rotate(Axis.X, angle, Space.LOCAL);
                                }
                                else
                                    this.mesh.rotate(new Vector3(cN.x, 0, 0), angle, Space.WORLD);
                            }
                        }
                        else if (this.axisPicked == this.rY) {
                            if (this.snapR) {
                                this.snapRY += angle;
                                angle = 0;
                                if (Math.abs(this.snapRY) >= this.rotSnap) {
                                    if ((this.snapRY > 0))
                                        angle = this.rotSnap;
                                    else
                                        angle = -this.rotSnap;
                                    this.snapRY = 0;
                                }
                            }
                            if (angle !== 0) {
                                if (this.local) {
                                    if (Vector3.Dot(this.localY, cN) < 0)
                                        angle = -1 * angle;
                                    this.mesh.rotate(Axis.Y, angle, Space.LOCAL);
                                }
                                else
                                    this.mesh.rotate(new Vector3(0, cN.y, 0), angle, Space.WORLD);
                            }
                        }
                        else if (this.axisPicked == this.rZ) {
                            if (this.snapR) {
                                this.snapRZ += angle;
                                angle = 0;
                                if (Math.abs(this.snapRZ) >= this.rotSnap) {
                                    if (this.snapRZ > 0)
                                        angle = this.rotSnap;
                                    else
                                        angle = -this.rotSnap;
                                    this.snapRZ = 0;
                                }
                            }
                            if (angle !== 0) {
                                if (this.local) {
                                    if (Vector3.Dot(this.localZ, cN) < 0)
                                        angle = -1 * angle;
                                    this.mesh.rotate(Axis.Z, angle, Space.LOCAL);
                                }
                                else
                                    this.mesh.rotate(new Vector3(0, 0, cN.z), angle, Space.WORLD);
                            }
                        }
                        else if (this.axisPicked == this.rAll) {
                            if (this.snapR) {
                                this.snapRA += angle;
                                angle = 0;
                                if (Math.abs(this.snapRA) >= this.rotSnap) {
                                    if (this.snapRA > 0)
                                        angle = this.rotSnap;
                                    else
                                        angle = -this.rotSnap;
                                    this.snapRA = 0;
                                }
                            }
                            if (angle !== 0)
                                this.mesh.rotate(this.mesh.position.subtract(this.mainCamera.position), angle, Space.WORLD);
                        }
                        this.setLocalAxes(this.mesh);
                        if ((this.eulerian)) {
                            this.mesh.rotation = this.mesh.rotationQuaternion.toEulerAngles();
                            this.mesh.rotationQuaternion = null;
                        }
                    };
                    EditControl.prototype.getPosOnPickPlane = function () {
                        var _this = this;
                        var pickinfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (mesh) {
                            return mesh == _this.pickPlane;
                        }, null, this.mainCamera);
                        if ((pickinfo.hit)) {
                            return pickinfo.pickedPoint;
                        }
                        else {
                            return null;
                        }
                    };
                    EditControl.prototype.hideBaxis = function () {
                        this.bXaxis.visibility = 0;
                        this.bYaxis.visibility = 0;
                        this.bZaxis.visibility = 0;
                    };
                    EditControl.prototype.isTranslationEnabled = function () {
                        return this.transEnabled;
                    };
                    EditControl.prototype.enableTranslation = function () {
                        if ((this.tX == null)) {
                            this.createTransAxes();
                            this.tCtl.parent = this.theParent;
                        }
                        if ((!this.transEnabled)) {
                            this.tEndX.visibility = this.visibility;
                            this.tEndY.visibility = this.visibility;
                            this.tEndZ.visibility = this.visibility;
                            this.tEndXZ.visibility = this.visibility;
                            this.tEndZY.visibility = this.visibility;
                            this.tEndYX.visibility = this.visibility;
                            this.tEndAll.visibility = this.visibility;
                            this.transEnabled = true;
                            this.disableRotation();
                            this.disableScaling();
                        }
                    };
                    EditControl.prototype.disableTranslation = function () {
                        if ((this.transEnabled)) {
                            this.tEndX.visibility = 0;
                            this.tEndY.visibility = 0;
                            this.tEndZ.visibility = 0;
                            this.tEndXZ.visibility = 0;
                            this.tEndZY.visibility = 0;
                            this.tEndYX.visibility = 0;
                            this.tEndAll.visibility = 0;
                            this.transEnabled = false;
                        }
                    };
                    EditControl.prototype.isRotationEnabled = function () {
                        return this.rotEnabled;
                    };
                    EditControl.prototype.returnEuler = function (euler) {
                        this.eulerian = euler;
                    };
                    EditControl.prototype.enableRotation = function () {
                        if ((this.rX == null)) {
                            this.createRotAxes();
                            this.rCtl.parent = this.theParent;
                        }
                        if ((!this.rotEnabled)) {
                            this.rEndX.visibility = this.visibility;
                            this.rEndY.visibility = this.visibility;
                            this.rEndZ.visibility = this.visibility;
                            this.rEndAll.visibility = this.visibility;
                            this.rotEnabled = true;
                            this.disableTranslation();
                            this.disableScaling();
                        }
                    };
                    EditControl.prototype.disableRotation = function () {
                        if ((this.rotEnabled)) {
                            this.rEndX.visibility = 0;
                            this.rEndY.visibility = 0;
                            this.rEndZ.visibility = 0;
                            this.rEndAll.visibility = 0;
                            this.rotEnabled = false;
                        }
                    };
                    EditControl.prototype.isScalingEnabled = function () {
                        return this.scaleEnabled;
                    };
                    EditControl.prototype.enableScaling = function () {
                        if ((this.sX == null)) {
                            this.createScaleAxes();
                            this.sCtl.parent = this.theParent;
                        }
                        if ((!this.scaleEnabled)) {
                            this.sEndX.visibility = this.visibility;
                            this.sEndY.visibility = this.visibility;
                            this.sEndZ.visibility = this.visibility;
                            this.sEndXZ.visibility = this.visibility;
                            this.sEndZY.visibility = this.visibility;
                            this.sEndYX.visibility = this.visibility;
                            this.sEndAll.visibility = this.visibility;
                            this.scaleEnabled = true;
                            this.disableTranslation();
                            this.disableRotation();
                        }
                    };
                    EditControl.prototype.disableScaling = function () {
                        if ((this.scaleEnabled)) {
                            this.sEndX.visibility = 0;
                            this.sEndY.visibility = 0;
                            this.sEndZ.visibility = 0;
                            this.sEndXZ.visibility = 0;
                            this.sEndZY.visibility = 0;
                            this.sEndYX.visibility = 0;
                            this.sEndAll.visibility = 0;
                            this.scaleEnabled = false;
                        }
                    };
                    EditControl.prototype.createGuideAxes = function () {
                        this.guideCtl = new Mesh("guideCtl", this.scene);
                        this.bXaxis = Mesh.CreateLines("bxAxis", [new Vector3(-100, 0, 0), new Vector3(100, 0, 0)], this.scene);
                        this.bYaxis = Mesh.CreateLines("byAxis", [new Vector3(0, -100, 0), new Vector3(0, 100, 0)], this.scene);
                        this.bZaxis = Mesh.CreateLines("bzAxis", [new Vector3(0, 0, -100), new Vector3(0, 0, 100)], this.scene);
                        this.bXaxis.isPickable = false;
                        this.bYaxis.isPickable = false;
                        this.bZaxis.isPickable = false;
                        this.bXaxis.parent = this.guideCtl;
                        this.bYaxis.parent = this.guideCtl;
                        this.bZaxis.parent = this.guideCtl;
                        this.bXaxis.color = Color3.Red();
                        this.bYaxis.color = Color3.Green();
                        this.bZaxis.color = Color3.Blue();
                        this.hideBaxis();
                        var al = this.axesLen * this.axesScale;
                        this.xaxis = Mesh.CreateLines("xAxis", [new Vector3(0, 0, 0), new Vector3(al, 0, 0)], this.scene);
                        this.yaxis = Mesh.CreateLines("yAxis", [new Vector3(0, 0, 0), new Vector3(0, al, 0)], this.scene);
                        this.zaxis = Mesh.CreateLines("zAxis", [new Vector3(0, 0, 0), new Vector3(0, 0, al)], this.scene);
                        this.xaxis.isPickable = false;
                        this.yaxis.isPickable = false;
                        this.zaxis.isPickable = false;
                        this.xaxis.parent = this.guideCtl;
                        this.yaxis.parent = this.guideCtl;
                        this.zaxis.parent = this.guideCtl;
                        this.xaxis.color = Color3.Red();
                        this.yaxis.color = Color3.Green();
                        this.zaxis.color = Color3.Blue();
                        this.xaxis.renderingGroupId = 2;
                        this.yaxis.renderingGroupId = 2;
                        this.zaxis.renderingGroupId = 2;
                    };
                    EditControl.prototype.createPickPlane = function () {
                        this.pickPlane = Mesh.CreatePlane("axisPlane", 200, this.scene);
                        this.pickPlane.isPickable = false;
                        this.pickPlane.visibility = 0;
                        this.pickPlane.billboardMode = Mesh.BILLBOARDMODE_ALL;
                        this.pickPlane.renderingGroupId = 1;
                    };
                    EditControl.prototype.createTransAxes = function () {
                        var r = 0.04 * this.axesScale;
                        var l = this.axesLen * this.axesScale;
                        this.tCtl = new Mesh("tarnsCtl", this.scene);
                        this.tX = this.extrudeBox(r / 2, l);
                        this.tX.name = "X";
                        this.tY = this.tX.clone("Y");
                        this.tZ = this.tX.clone("Z");
                        this.tXZ = MeshBuilder.CreatePlane("XZ", { size: r * 2 }, this.scene);
                        this.tZY = this.tXZ.clone("ZY");
                        this.tYX = this.tXZ.clone("YX");
                        this.tXZ.rotation.x = 1.57;
                        this.tZY.rotation.y = 1.57;
                        this.tXZ.position.x = r;
                        this.tXZ.position.z = r;
                        this.tZY.position.z = r;
                        this.tZY.position.y = r;
                        this.tYX.position.y = r;
                        this.tYX.position.x = r;
                        this.tAll = Mesh.CreateBox("ALL", r * 2, this.scene);
                        this.tX.parent = this.tCtl;
                        this.tY.parent = this.tCtl;
                        this.tZ.parent = this.tCtl;
                        this.tXZ.parent = this.tCtl;
                        this.tZY.parent = this.tCtl;
                        this.tYX.parent = this.tCtl;
                        this.tAll.parent = this.tCtl;
                        this.tX.rotation.y = 1.57;
                        this.tY.rotation.x -= 1.57;
                        this.tX.visibility = 0;
                        this.tY.visibility = 0;
                        this.tZ.visibility = 0;
                        this.tXZ.visibility = 0;
                        this.tZY.visibility = 0;
                        this.tYX.visibility = 0;
                        this.tAll.visibility = 0;
                        this.tX.renderingGroupId = 1;
                        this.tY.renderingGroupId = 1;
                        this.tZ.renderingGroupId = 1;
                        this.tXZ.renderingGroupId = 1;
                        this.tZY.renderingGroupId = 1;
                        this.tYX.renderingGroupId = 1;
                        this.tAll.renderingGroupId = 1;
                        this.tX.isPickable = false;
                        this.tY.isPickable = false;
                        this.tZ.isPickable = false;
                        this.tXZ.isPickable = false;
                        this.tZY.isPickable = false;
                        this.tYX.isPickable = false;
                        this.tAll.isPickable = false;
                        var cl = l / 5;
                        var cr = r;
                        this.tEndX = Mesh.CreateCylinder("tEndX", cl, 0, cr, 6, 1, this.scene);
                        this.tEndY = this.tEndX.clone("tEndY");
                        this.tEndZ = this.tEndX.clone("tEndZ");
                        this.tEndXZ = MeshBuilder.CreatePlane("XZ", { size: cr * 1.75, sideOrientation: Mesh.DOUBLESIDE }, this.scene);
                        this.tEndZY = this.tEndXZ.clone("ZY");
                        this.tEndYX = this.tEndXZ.clone("YX");
                        this.tEndAll = MeshBuilder.CreatePolyhedron("tEndAll", { type: 1, size: cr / 2 }, this.scene);
                        this.tEndX.rotation.x = 1.57;
                        this.tEndY.rotation.x = 1.57;
                        this.tEndZ.rotation.x = 1.57;
                        this.tEndX.parent = this.tX;
                        this.tEndY.parent = this.tY;
                        this.tEndZ.parent = this.tZ;
                        this.tEndXZ.parent = this.tXZ;
                        this.tEndZY.parent = this.tZY;
                        this.tEndYX.parent = this.tYX;
                        this.tEndAll.parent = this.tAll;
                        this.tEndX.position.z = l - cl / 2;
                        this.tEndY.position.z = l - cl / 2;
                        this.tEndZ.position.z = l - cl / 2;
                        this.tEndX.material = this.redMat;
                        this.tEndY.material = this.greenMat;
                        this.tEndZ.material = this.blueMat;
                        this.tEndXZ.material = this.redMat;
                        this.tEndZY.material = this.blueMat;
                        this.tEndYX.material = this.greenMat;
                        this.tEndAll.material = this.yellowMat;
                        this.tEndX.renderingGroupId = 1;
                        this.tEndY.renderingGroupId = 1;
                        this.tEndZ.renderingGroupId = 1;
                        this.tEndXZ.renderingGroupId = 1;
                        this.tEndZY.renderingGroupId = 1;
                        this.tEndYX.renderingGroupId = 1;
                        this.tEndAll.renderingGroupId = 1;
                        this.tEndX.isPickable = false;
                        this.tEndY.isPickable = false;
                        this.tEndZ.isPickable = false;
                        this.tEndXZ.isPickable = false;
                        this.tEndZY.isPickable = false;
                        this.tEndYX.isPickable = false;
                        this.tEndAll.isPickable = false;
                    };
                    EditControl.prototype.createRotAxes = function () {
                        var d = this.axesLen * this.axesScale * 2;
                        this.rCtl = new Mesh("rotCtl", this.scene);
                        this.rX = this.createTube(d / 2, 90);
                        this.rX.name = "X";
                        this.rY = this.rX.clone("Y");
                        this.rZ = this.rX.clone("Z");
                        this.rAll = this.createTube(d / 1.75, 360);
                        this.rAll.name = "ALL";
                        this.rX.parent = this.rCtl;
                        this.rY.parent = this.rCtl;
                        this.rZ.parent = this.rCtl;
                        this.rAll.parent = this.pickPlane;
                        this.rX.rotation.z = 1.57;
                        this.rZ.rotation.x = -1.57;
                        this.rAll.rotation.x = 1.57;
                        this.rX.visibility = 0;
                        this.rY.visibility = 0;
                        this.rZ.visibility = 0;
                        this.rAll.visibility = 0;
                        this.rX.renderingGroupId = 1;
                        this.rY.renderingGroupId = 1;
                        this.rZ.renderingGroupId = 1;
                        this.rAll.renderingGroupId = 1;
                        this.rX.isPickable = false;
                        this.rY.isPickable = false;
                        this.rZ.isPickable = false;
                        this.rAll.isPickable = false;
                        var cl = d;
                        this.rEndX = this.createCircle(cl / 2, 90);
                        this.rEndY = this.rEndX.clone("");
                        this.rEndZ = this.rEndX.clone("");
                        this.rEndAll = this.createCircle(cl / 1.75, 360);
                        this.rEndX.parent = this.rX;
                        this.rEndY.parent = this.rY;
                        this.rEndZ.parent = this.rZ;
                        this.rEndAll.parent = this.rAll;
                        this.rEndX.color = Color3.Red();
                        this.rEndY.color = Color3.Green();
                        this.rEndZ.color = Color3.Blue();
                        this.rEndAll.color = Color3.Yellow();
                        this.rEndX.renderingGroupId = 1;
                        this.rEndY.renderingGroupId = 1;
                        this.rEndZ.renderingGroupId = 1;
                        this.rEndAll.renderingGroupId = 1;
                        this.rEndX.isPickable = false;
                        this.rEndY.isPickable = false;
                        this.rEndZ.isPickable = false;
                        this.rEndAll.isPickable = false;
                    };
                    EditControl.prototype.extrudeBox = function (w, l) {
                        var shape = [new Vector3(w, w, 0), new Vector3(-w, w, 0), new Vector3(-w, -w, 0), new Vector3(w, -w, 0), new Vector3(w, w, 0)];
                        var path = [new Vector3(0, 0, 0), new Vector3(0, 0, l)];
                        var box = Mesh.ExtrudeShape("", shape, path, 1, 0, 2, this.scene);
                        return box;
                    };
                    EditControl.prototype.createCircle = function (r, t) {
                        if (t === null)
                            t = 360;
                        var points = [];
                        var x;
                        var z;
                        var a = 3.14 / 180;
                        var p = 0;
                        for (var i = 0; i <= t; i = i + 10) {
                            x = r * Math.cos(i * a);
                            if ((i == 90))
                                z = r;
                            else if ((i == 270))
                                z = -r;
                            else
                                z = r * Math.sin(i * a);
                            points[p] = new Vector3(x, 0, z);
                            p++;
                        }
                        var circle = Mesh.CreateLines("", points, this.scene);
                        return circle;
                    };
                    EditControl.prototype.createTube = function (r, t) {
                        if (t === null)
                            t = 360;
                        var points = [];
                        var x;
                        var z;
                        var a = 3.14 / 180;
                        var p = 0;
                        for (var i = 0; i <= t; i = i + 30) {
                            x = r * Math.cos(i * a);
                            if ((i == 90))
                                z = r;
                            else if ((i == 270))
                                z = -r;
                            else
                                z = r * Math.sin(i * a);
                            points[p] = new Vector3(x, 0, z);
                            p++;
                        }
                        var tube = Mesh.CreateTube("", points, 0.02, 3, null, BABYLON.Mesh.NO_CAP, this.scene);
                        return tube;
                    };
                    EditControl.prototype.createScaleAxes = function () {
                        var r = 0.04 * this.axesScale;
                        var l = this.axesLen * this.axesScale;
                        this.sCtl = new Mesh("sCtl", this.scene);
                        this.sX = this.extrudeBox(r / 2, l);
                        this.sX.name = "X";
                        this.sY = this.sX.clone("Y");
                        this.sZ = this.sX.clone("Z");
                        this.sXZ = MeshBuilder.CreatePlane("XZ", { size: r * 2 }, this.scene);
                        this.sZY = this.sXZ.clone("ZY");
                        this.sYX = this.sXZ.clone("YX");
                        this.sXZ.rotation.x = 1.57;
                        this.sZY.rotation.y = 1.57;
                        this.sXZ.position.x = r;
                        this.sXZ.position.z = r;
                        this.sZY.position.z = r;
                        this.sZY.position.y = r;
                        this.sYX.position.y = r;
                        this.sYX.position.x = r;
                        this.sAll = Mesh.CreateBox("ALL", r * 2, this.scene);
                        this.sX.material = this.redMat;
                        this.sY.material = this.greenMat;
                        this.sZ.material = this.blueMat;
                        this.sAll.material = this.yellowMat;
                        this.sX.parent = this.sCtl;
                        this.sY.parent = this.sCtl;
                        this.sZ.parent = this.sCtl;
                        this.sAll.parent = this.sCtl;
                        this.sXZ.parent = this.sCtl;
                        this.sZY.parent = this.sCtl;
                        this.sYX.parent = this.sCtl;
                        this.sX.rotation.y = 1.57;
                        this.sY.rotation.x -= 1.57;
                        this.sX.visibility = 0;
                        this.sY.visibility = 0;
                        this.sZ.visibility = 0;
                        this.sXZ.visibility = 0;
                        this.sZY.visibility = 0;
                        this.sYX.visibility = 0;
                        this.sAll.visibility = 0;
                        this.sX.renderingGroupId = 1;
                        this.sY.renderingGroupId = 1;
                        this.sZ.renderingGroupId = 1;
                        this.sXZ.renderingGroupId = 1;
                        this.sZY.renderingGroupId = 1;
                        this.sYX.renderingGroupId = 1;
                        this.sAll.renderingGroupId = 1;
                        this.sX.isPickable = false;
                        this.sY.isPickable = false;
                        this.sZ.isPickable = false;
                        this.sXZ.isPickable = false;
                        this.sZY.isPickable = false;
                        this.sYX.isPickable = false;
                        this.sAll.isPickable = false;
                        var cr = r;
                        this.sEndX = Mesh.CreateBox("", cr, this.scene);
                        this.sEndY = this.sEndX.clone("");
                        this.sEndZ = this.sEndX.clone("");
                        this.sEndAll = this.sEndX.clone("");
                        this.sEndXZ = MeshBuilder.CreatePlane("XZ", { size: cr * 1.75, sideOrientation: Mesh.DOUBLESIDE }, this.scene);
                        this.sEndZY = this.sEndXZ.clone("ZY");
                        this.sEndYX = this.sEndXZ.clone("YX");
                        this.sEndX.parent = this.sX;
                        this.sEndY.parent = this.sY;
                        this.sEndZ.parent = this.sZ;
                        this.sEndXZ.parent = this.sXZ;
                        this.sEndZY.parent = this.sZY;
                        this.sEndYX.parent = this.sYX;
                        this.sEndAll.parent = this.sAll;
                        this.sEndX.position.z = l - cr / 2;
                        this.sEndY.position.z = l - cr / 2;
                        this.sEndZ.position.z = l - cr / 2;
                        this.sEndX.material = this.redMat;
                        this.sEndY.material = this.greenMat;
                        this.sEndZ.material = this.blueMat;
                        this.sEndXZ.material = this.redMat;
                        this.sEndZY.material = this.blueMat;
                        this.sEndYX.material = this.greenMat;
                        this.sEndAll.material = this.yellowMat;
                        this.sEndX.renderingGroupId = 1;
                        this.sEndY.renderingGroupId = 1;
                        this.sEndZ.renderingGroupId = 1;
                        this.sEndXZ.renderingGroupId = 1;
                        this.sEndZY.renderingGroupId = 1;
                        this.sEndYX.renderingGroupId = 1;
                        this.sEndAll.renderingGroupId = 1;
                        this.sEndX.isPickable = false;
                        this.sEndY.isPickable = false;
                        this.sEndZ.isPickable = false;
                        this.sEndXZ.isPickable = false;
                        this.sEndZY.isPickable = false;
                        this.sEndYX.isPickable = false;
                        this.sEndAll.isPickable = false;
                    };
                    ;
                    ;
                    EditControl.prototype.setLocalAxes = function (mesh) {
                        var meshMatrix = mesh.getWorldMatrix();
                        Vector3.FromFloatArrayToRef(meshMatrix.asArray(), 0, this.localX);
                        Vector3.FromFloatArrayToRef(meshMatrix.asArray(), 4, this.localY);
                        Vector3.FromFloatArrayToRef(meshMatrix.asArray(), 8, this.localZ);
                    };
                    EditControl.prototype.setLocal = function (l) {
                        if (this.local == l)
                            return;
                        this.local = l;
                        if (this.local)
                            this.theParent.rotationQuaternion = this.mesh.rotationQuaternion;
                        else
                            this.theParent.rotationQuaternion = Quaternion.Identity();
                    };
                    EditControl.prototype.isLocal = function () {
                        return this.local;
                    };
                    EditControl.prototype.setTransSnap = function (s) {
                        this.snapT = s;
                    };
                    EditControl.prototype.setRotSnap = function (s) {
                        this.snapR = s;
                    };
                    EditControl.prototype.setScaleSnap = function (s) {
                        this.snapS = s;
                    };
                    EditControl.prototype.setTransSnapValue = function (t) {
                        this.tSnap = new Vector3(t, t, t);
                        this.transSnap = t;
                    };
                    EditControl.prototype.setRotSnapValue = function (r) {
                        this.rotSnap = r;
                    };
                    EditControl.prototype.setScaleSnapValue = function (r) {
                        this.scaleSnap = r;
                    };
                    EditControl.prototype.setAxesScale = function () {
                        this.theParent.position.subtractToRef(this.mainCamera.position, this.toParent);
                        Vector3.FromFloatArrayToRef(this.mainCamera.getWorldMatrix().asArray(), 8, this.cameraNormal);
                        var parentOnNormal = Vector3.Dot(this.toParent, this.cameraNormal) / this.cameraNormal.length();
                        var s = parentOnNormal / this.distFromCamera;
                        Vector3.FromFloatsToRef(s, s, s, this.theParent.scaling);
                        Vector3.FromFloatsToRef(s, s, s, this.pickPlane.scaling);
                    };
                    EditControl.getAngle = function (p1, p2, p, cN) {
                        var v1 = p1.subtract(p);
                        var v2 = p2.subtract(p);
                        var n = Vector3.Cross(v1, v2);
                        var angle = Math.asin(n.length() / (v1.length() * v2.length()));
                        if ((Vector3.Dot(n, cN) < 0)) {
                            angle = -1 * angle;
                        }
                        return angle;
                    };
                    EditControl.prototype.createMaterials = function (scene) {
                        this.redMat = EditControl.getStandardMaterial("redMat", Color3.Red(), scene);
                        this.greenMat = EditControl.getStandardMaterial("greenMat", Color3.Green(), scene);
                        this.blueMat = EditControl.getStandardMaterial("blueMat", Color3.Blue(), scene);
                        this.whiteMat = EditControl.getStandardMaterial("whiteMat", Color3.White(), scene);
                        this.yellowMat = EditControl.getStandardMaterial("whiteMat", Color3.Yellow(), scene);
                    };
                    EditControl.prototype.disposeMaterials = function () {
                        this.redMat.dispose();
                        this.greenMat.dispose();
                        this.blueMat.dispose();
                        this.whiteMat.dispose();
                        this.yellowMat.dispose();
                    };
                    EditControl.getStandardMaterial = function (name, col, scene) {
                        var mat = new StandardMaterial(name, scene);
                        mat.emissiveColor = col;
                        mat.diffuseColor = Color3.Black();
                        mat.specularColor = Color3.Black();
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
                        if ((mesh.rotationQuaternion == null)) {
                            if ((mesh.rotation != null)) {
                                mesh.rotationQuaternion = Quaternion.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z);
                            }
                        }
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
                    ActHist.prototype.add = function () {
                        var act = new Act(this.mesh);
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
                            this.current--;
                            this.acts[this.current].perform(this.mesh);
                        }
                    };
                    ActHist.prototype.redo = function () {
                        if ((this.current < this.last)) {
                            this.current++;
                            this.acts[this.current].perform(this.mesh);
                        }
                    };
                    return ActHist;
                }());
                component.ActHist = ActHist;
                var Act = (function () {
                    function Act(mesh) {
                        this.p = mesh.position.clone();
                        if (mesh.rotationQuaternion == null) {
                            this.r = null;
                            this.rE = mesh.rotation.clone();
                        }
                        else {
                            this.r = mesh.rotationQuaternion.clone();
                            this.rE = null;
                        }
                        this.s = mesh.scaling.clone();
                    }
                    Act.prototype.perform = function (mesh) {
                        mesh.position = this.p.clone();
                        if (mesh.rotationQuaternion == null) {
                            if (this.rE != null) {
                                mesh.rotation = this.rE.clone();
                            }
                            else {
                                mesh.rotation = this.r.toEulerAngles();
                            }
                        }
                        else {
                            if (this.r != null) {
                                mesh.rotationQuaternion = this.r.clone();
                            }
                            else {
                                mesh.rotationQuaternion = this.rE.toQuaternion();
                            }
                        }
                        mesh.scaling = this.s.clone();
                    };
                    return Act;
                }());
                component.Act = Act;
            })(component = babylonjs.component || (babylonjs.component = {}));
        })(babylonjs = ssatguru.babylonjs || (ssatguru.babylonjs = {}));
    })(ssatguru = org.ssatguru || (org.ssatguru = {}));
})(org || (org = {}));
//# sourceMappingURL=EditControl.js.map