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
                        this.pDown = false;
                        this.pointerIsOver = false;
                        this.editing = false;
                        this.snapX = 0;
                        this.snapY = 0;
                        this.snapZ = 0;
                        this.snapRX = 0;
                        this.snapRY = 0;
                        this.snapRZ = 0;
                        this.eulerian = false;
                        this.transEnabled = false;
                        this.rotEnabled = false;
                        this.scaleEnabled = false;
                        this.meshPicked = mesh;
                        this.canvas = canvas;
                        this.axesScale = scale;
                        this.scene = mesh.getScene();
                        this.mainCamera = camera;
                        this.actHist = new ActHist(mesh, 10);
                        mesh.computeWorldMatrix(true);
                        this.theParent = new Mesh("EditControl", this.scene);
                        this.theParent.position = this.meshPicked.absolutePosition;
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
                        this.theParent.position = this.meshPicked.absolutePosition;
                        this.onPointerOver();
                    };
                    EditControl.prototype.switchTo = function (mesh) {
                        mesh.computeWorldMatrix(true);
                        this.meshPicked = mesh;
                        this.setLocalAxes(mesh);
                        this.actHist = new ActHist(mesh, 10);
                    };
                    EditControl.prototype.setUndoCount = function (c) {
                        this.actHist.setCapacity(c);
                    };
                    EditControl.prototype.undo = function () {
                        this.actHist.undo();
                        this.meshPicked.computeWorldMatrix(true);
                        this.setLocalAxes(this.meshPicked);
                    };
                    EditControl.prototype.redo = function () {
                        this.actHist.redo();
                        this.meshPicked.computeWorldMatrix(true);
                        this.setLocalAxes(this.meshPicked);
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
                        if ((evt.button != 0))
                            return;
                        var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (mesh) {
                            if ((_this.transEnabled)) {
                                if (((mesh == _this.tX) || (mesh == _this.tY) || (mesh == _this.tZ)))
                                    return true;
                            }
                            else if ((_this.rotEnabled)) {
                                if (((mesh == _this.rX) || (mesh == _this.rY) || (mesh == _this.rZ)))
                                    return true;
                            }
                            else if ((_this.scaleEnabled)) {
                                if (((mesh == _this.sX) || (mesh == _this.sY) || (mesh == _this.sZ) || (mesh == _this.sAll)))
                                    return true;
                            }
                            return false;
                        }, null, this.mainCamera);
                        if ((pickResult.hit)) {
                            this.setAxisVisiblity(0);
                            this.axisPicked = pickResult.pickedMesh;
                            this.axisPicked.getChildren()[0].visibility = 1;
                            var name = this.axisPicked.name;
                            if ((name == "X"))
                                this.bXaxis.visibility = 1;
                            else if ((name == "Y"))
                                this.bYaxis.visibility = 1;
                            else if ((name == "Z"))
                                this.bZaxis.visibility = 1;
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
                        if ((this.pDown))
                            return;
                        var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function (mesh) {
                            if ((_this.transEnabled)) {
                                if (((mesh == _this.tX) || (mesh == _this.tY) || (mesh == _this.tZ)))
                                    return true;
                            }
                            else if ((_this.rotEnabled)) {
                                if (((mesh == _this.rX) || (mesh == _this.rY) || (mesh == _this.rZ)))
                                    return true;
                            }
                            else if ((_this.scaleEnabled)) {
                                if (((mesh == _this.sX) || (mesh == _this.sY) || (mesh == _this.sZ) || (mesh == _this.sAll)))
                                    return true;
                            }
                            return false;
                        }, null, this.mainCamera);
                        if ((pickResult.hit)) {
                            if ((pickResult.pickedMesh != this.prevOverMesh)) {
                                this.pointerIsOver = true;
                                if ((this.prevOverMesh != null)) {
                                    this.prevOverMesh.visibility = 0;
                                    this.restoreColor(this.prevOverMesh);
                                }
                                this.prevOverMesh = pickResult.pickedMesh;
                                if ((this.rotEnabled)) {
                                    this.prevOverMesh.getChildren()[0].color = Color3.White();
                                }
                                else {
                                    this.prevOverMesh.getChildren()[0].material = this.whiteMat;
                                }
                                if ((this.prevOverMesh.name == "X")) {
                                    this.xaxis.color = Color3.White();
                                }
                                else if ((this.prevOverMesh.name == "Y")) {
                                    this.yaxis.color = Color3.White();
                                }
                                else if ((this.prevOverMesh.name == "Z")) {
                                    this.zaxis.color = Color3.White();
                                }
                            }
                        }
                        else {
                            this.pointerIsOver = false;
                            if ((this.prevOverMesh != null)) {
                                this.restoreColor(this.prevOverMesh);
                                this.prevOverMesh = null;
                            }
                        }
                    };
                    EditControl.prototype.restoreColor = function (mesh) {
                        var col;
                        var mat;
                        if ((mesh.name == "X")) {
                            col = Color3.Red();
                            mat = this.redMat;
                            this.xaxis.color = Color3.Red();
                        }
                        else if ((this.prevOverMesh.name == "Y")) {
                            col = Color3.Green();
                            mat = this.greenMat;
                            this.yaxis.color = Color3.Green();
                        }
                        else if ((this.prevOverMesh.name == "Z")) {
                            col = Color3.Blue();
                            mat = this.blueMat;
                            this.zaxis.color = Color3.Blue();
                        }
                        else {
                            col = Color3.Yellow();
                            mat = this.yellowMat;
                        }
                        if ((this.rotEnabled)) {
                            this.prevOverMesh.getChildren()[0].color = col;
                        }
                        else {
                            this.prevOverMesh.getChildren()[0].material = mat;
                        }
                    };
                    EditControl.prototype.onPointerUp = function (evt) {
                        this.pDown = false;
                        if ((this.editing)) {
                            this.mainCamera.attachControl(this.canvas);
                            this.editing = false;
                            this.setAxisVisiblity(1);
                            this.hideBaxis();
                            this.restoreColor(this.prevOverMesh);
                            this.prevOverMesh = null;
                            this.actHist.add();
                        }
                    };
                    EditControl.prototype.onPointerMove = function (evt) {
                        if ((!this.pDown || !this.editing))
                            return;
                        var newPos = this.getPosOnPickPlane();
                        if ((newPos == null))
                            return;
                        if ((this.transEnabled))
                            this.doTranslation(newPos);
                        if ((this.scaleEnabled && this.local))
                            this.doScaling(newPos);
                        if ((this.rotEnabled))
                            this.doRotation(newPos);
                        this.prevPos = newPos;
                    };
                    EditControl.prototype.doTranslation = function (newPos) {
                        var diff = newPos.subtract(this.prevPos);
                        var dl = diff.length();
                        var space;
                        if (this.local)
                            space = Space.LOCAL;
                        else
                            space = Space.WORLD;
                        if (this.axisPicked == this.tX) {
                            if ((this.local))
                                dl = Vector3.Dot(diff, this.localX) / (this.localX.length() * this.meshPicked.scaling.x);
                            else
                                dl = diff.x;
                            if ((this.snapT)) {
                                this.snapX += dl;
                                dl = 0;
                                var scale = 1;
                                if ((this.local))
                                    scale = this.meshPicked.scaling.x;
                                if ((Math.abs(this.snapX) > this.transSnap / scale)) {
                                    if ((this.snapX > 0))
                                        dl = this.transSnap / scale;
                                    else
                                        dl = -this.transSnap / scale;
                                    this.snapX = 0;
                                }
                            }
                            if ((this.local))
                                this.meshPicked.translate(Axis.X, dl, space);
                            else {
                                this.meshPicked.position.x = Number(this.meshPicked.position.x) + Number(dl);
                            }
                        }
                        else if ((this.axisPicked == this.tY)) {
                            if ((this.local))
                                dl = Vector3.Dot(diff, this.localY) / (this.localY.length() * this.meshPicked.scaling.y);
                            else
                                dl = diff.y;
                            if ((this.snapT)) {
                                this.snapY += dl;
                                dl = 0;
                                var scale = 1;
                                if ((this.local))
                                    scale = this.meshPicked.scaling.y;
                                if ((Math.abs(this.snapY) > this.transSnap / scale)) {
                                    if ((this.snapY > 0))
                                        dl = this.transSnap / scale;
                                    else
                                        dl = -this.transSnap / scale;
                                    this.snapY = 0;
                                }
                            }
                            if ((this.local))
                                this.meshPicked.translate(Axis.Y, dl, space);
                            else {
                                this.meshPicked.position.y = Number(this.meshPicked.position.y) + Number(dl);
                            }
                        }
                        else if ((this.axisPicked == this.tZ)) {
                            if ((this.local))
                                dl = Vector3.Dot(diff, this.localZ) / (this.localZ.length() * this.meshPicked.scaling.z);
                            else
                                dl = diff.z;
                            if ((this.snapT)) {
                                this.snapZ += dl;
                                dl = 0;
                                var scale = 1;
                                if ((this.local))
                                    scale = this.meshPicked.scaling.z;
                                if ((Math.abs(this.snapZ) > this.transSnap / scale)) {
                                    if ((this.snapZ > 0))
                                        dl = this.transSnap / scale;
                                    else
                                        dl = -this.transSnap / scale;
                                    this.snapZ = 0;
                                }
                            }
                            if ((this.local))
                                this.meshPicked.translate(Axis.Z, dl, space);
                            else {
                                this.meshPicked.position.z = Number(this.meshPicked.position.z) + Number(dl);
                            }
                        }
                    };
                    EditControl.prototype.doScaling = function (newPos) {
                        var ppm = this.prevPos.subtract(this.meshPicked.position);
                        var diff = newPos.subtract(this.prevPos);
                        var r = diff.length() / ppm.length();
                        if ((this.axisPicked == this.sX)) {
                            var dot = Vector3.Dot(diff, this.localX);
                            if ((dot >= 0))
                                this.meshPicked.scaling.x *= (1 + r);
                            else
                                this.meshPicked.scaling.x *= (1 - r);
                        }
                        else if ((this.axisPicked == this.sY)) {
                            var dot = Vector3.Dot(diff, this.localY);
                            if ((dot >= 0))
                                this.meshPicked.scaling.y *= (1 + r);
                            else
                                this.meshPicked.scaling.y *= (1 - r);
                        }
                        else if ((this.axisPicked == this.sZ)) {
                            var dot = Vector3.Dot(diff, this.localZ);
                            if ((dot >= 0))
                                this.meshPicked.scaling.z *= (1 + r);
                            else
                                this.meshPicked.scaling.z *= (1 - r);
                        }
                        else if ((this.axisPicked == this.sAll)) {
                            var dot = Vector3.Dot(diff, this.mainCamera.upVector);
                            r = diff.length() / 5;
                            if ((dot < 0)) {
                                r = -1 * r;
                            }
                            this.meshPicked.scaling.x *= (1 + r);
                            this.meshPicked.scaling.y *= (1 + r);
                            this.meshPicked.scaling.z *= (1 + r);
                        }
                    };
                    EditControl.prototype.doRotation = function (newPos) {
                        var cN = Vector3.TransformNormal(Axis.Z, this.mainCamera.getWorldMatrix());
                        if ((this.axisPicked == this.rX)) {
                            var angle = EditControl.getAngle(this.prevPos, newPos, this.meshPicked.absolutePosition, cN);
                            if ((this.snapR)) {
                                this.snapRX += angle;
                                angle = 0;
                                if ((Math.abs(this.snapRX) >= this.rotSnap)) {
                                    if ((this.snapRX > 0))
                                        angle = this.rotSnap;
                                    else
                                        angle = -this.rotSnap;
                                    this.snapRX = 0;
                                }
                            }
                            if ((this.local)) {
                                if ((Vector3.Dot(this.localX, cN) < 0))
                                    angle = -1 * angle;
                                this.meshPicked.rotate(Axis.X, angle, Space.LOCAL);
                            }
                            else
                                this.meshPicked.rotate(new Vector3(cN.x, 0, 0), angle, Space.WORLD);
                            this.setLocalAxes(this.meshPicked);
                        }
                        else if ((this.axisPicked == this.rY)) {
                            var angle = EditControl.getAngle(this.prevPos, newPos, this.meshPicked.absolutePosition, cN);
                            if ((this.snapR)) {
                                this.snapRY += angle;
                                angle = 0;
                                if ((Math.abs(this.snapRY) >= this.rotSnap)) {
                                    if ((this.snapRY > 0))
                                        angle = this.rotSnap;
                                    else
                                        angle = -this.rotSnap;
                                    this.snapRY = 0;
                                }
                            }
                            if ((this.local)) {
                                if ((Vector3.Dot(this.localY, cN) < 0))
                                    angle = -1 * angle;
                                this.meshPicked.rotate(Axis.Y, angle, Space.LOCAL);
                            }
                            else
                                this.meshPicked.rotate(new Vector3(0, cN.y, 0), angle, Space.WORLD);
                            this.setLocalAxes(this.meshPicked);
                        }
                        else if ((this.axisPicked == this.rZ)) {
                            var angle = EditControl.getAngle(this.prevPos, newPos, this.meshPicked.absolutePosition, cN);
                            if ((this.snapR)) {
                                this.snapRZ += angle;
                                angle = 0;
                                if ((Math.abs(this.snapRZ) >= this.rotSnap)) {
                                    if ((this.snapRZ > 0))
                                        angle = this.rotSnap;
                                    else
                                        angle = -this.rotSnap;
                                    this.snapRZ = 0;
                                }
                            }
                            if ((this.local)) {
                                if ((Vector3.Dot(this.localZ, cN) < 0))
                                    angle = -1 * angle;
                                this.meshPicked.rotate(Axis.Z, angle, Space.LOCAL);
                            }
                            else
                                this.meshPicked.rotate(new Vector3(0, 0, cN.z), angle, Space.WORLD);
                            this.setLocalAxes(this.meshPicked);
                        }
                        if ((this.eulerian)) {
                            this.meshPicked.rotation = this.meshPicked.rotationQuaternion.toEulerAngles();
                            this.meshPicked.rotationQuaternion = null;
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
                    EditControl.prototype.setAxisVisiblity = function (v) {
                        if ((this.transEnabled)) {
                            this.tEndX.visibility = v;
                            this.tEndY.visibility = v;
                            this.tEndZ.visibility = v;
                        }
                        if ((this.rotEnabled)) {
                            this.rEndX.visibility = v;
                            this.rEndY.visibility = v;
                            this.rEndZ.visibility = v;
                        }
                        if ((this.scaleEnabled)) {
                            this.sEndX.visibility = v;
                            this.sEndY.visibility = v;
                            this.sEndZ.visibility = v;
                            this.sEndAll.visibility = v;
                        }
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
                            this.tEndX.visibility = 1;
                            this.tEndY.visibility = 1;
                            this.tEndZ.visibility = 1;
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
                            this.rEndX.visibility = 1;
                            this.rEndY.visibility = 1;
                            this.rEndZ.visibility = 1;
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
                            this.sEndX.visibility = 1;
                            this.sEndY.visibility = 1;
                            this.sEndZ.visibility = 1;
                            this.sEndAll.visibility = 1;
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
                            this.sEndAll.visibility = 0;
                            this.scaleEnabled = false;
                        }
                    };
                    EditControl.prototype.createGuideAxes = function () {
                        var l = this.axesLen * this.axesScale;
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
                        this.bXaxis.renderingGroupId = 1;
                        this.bYaxis.renderingGroupId = 1;
                        this.bZaxis.renderingGroupId = 1;
                        this.hideBaxis();
                        this.xaxis = Mesh.CreateLines("xAxis", [new Vector3(0, 0, 0), new Vector3(l, 0, 0)], this.scene);
                        this.yaxis = Mesh.CreateLines("yAxis", [new Vector3(0, 0, 0), new Vector3(0, l, 0)], this.scene);
                        this.zaxis = Mesh.CreateLines("zAxis", [new Vector3(0, 0, 0), new Vector3(0, 0, l)], this.scene);
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
                        var r = 0.04;
                        var l = this.axesLen * this.axesScale;
                        this.tCtl = new Mesh("tarnsCtl", this.scene);
                        this.tX = this.extrudeBox(r / 2, l);
                        this.tX.name = "X";
                        this.tY = this.tX.clone("Y");
                        this.tZ = this.tX.clone("Z");
                        this.tX.material = this.redMat;
                        this.tY.material = this.greenMat;
                        this.tZ.material = this.blueMat;
                        this.tX.parent = this.tCtl;
                        this.tY.parent = this.tCtl;
                        this.tZ.parent = this.tCtl;
                        this.tX.rotation.y = 1.57;
                        this.tY.rotation.x -= 1.57;
                        this.tX.visibility = 0;
                        this.tY.visibility = 0;
                        this.tZ.visibility = 0;
                        this.tX.renderingGroupId = 1;
                        this.tY.renderingGroupId = 1;
                        this.tZ.renderingGroupId = 1;
                        this.tX.isPickable = false;
                        this.tY.isPickable = false;
                        this.tZ.isPickable = false;
                        var cl = l * this.axesScale / 4;
                        var cr = r * this.axesScale;
                        this.tEndX = Mesh.CreateCylinder("tEndX", cl, 0, cr, 6, 1, this.scene);
                        this.tEndY = this.tEndX.clone("tEndY");
                        this.tEndZ = this.tEndX.clone("tEndZ");
                        this.tEndX.rotation.x = 1.57;
                        this.tEndY.rotation.x = 1.57;
                        this.tEndZ.rotation.x = 1.57;
                        this.tEndX.parent = this.tX;
                        this.tEndY.parent = this.tY;
                        this.tEndZ.parent = this.tZ;
                        this.tEndX.position.z = l - cl / 2;
                        this.tEndY.position.z = l - cl / 2;
                        this.tEndZ.position.z = l - cl / 2;
                        this.tEndX.material = this.redMat;
                        this.tEndY.material = this.greenMat;
                        this.tEndZ.material = this.blueMat;
                        this.tEndX.renderingGroupId = 1;
                        this.tEndY.renderingGroupId = 1;
                        this.tEndZ.renderingGroupId = 1;
                        this.tEndX.isPickable = false;
                        this.tEndY.isPickable = false;
                        this.tEndZ.isPickable = false;
                    };
                    EditControl.prototype.createRotAxes = function () {
                        var r = 0.04;
                        var d = this.axesLen * this.axesScale * 2;
                        this.rCtl = new Mesh("rotCtl", this.scene);
                        this.rX = Mesh.CreateTorus("X", d, r, 30, this.scene);
                        this.rY = this.rX.clone("Y");
                        this.rZ = this.rX.clone("Z");
                        this.rX.material = this.redMat;
                        this.rY.material = this.greenMat;
                        this.rZ.material = this.blueMat;
                        this.rX.parent = this.rCtl;
                        this.rY.parent = this.rCtl;
                        this.rZ.parent = this.rCtl;
                        this.rX.rotation.z -= 1.57;
                        this.rZ.rotation.x = 1.57;
                        this.rX.visibility = 0;
                        this.rY.visibility = 0;
                        this.rZ.visibility = 0;
                        this.rX.renderingGroupId = 1;
                        this.rY.renderingGroupId = 1;
                        this.rZ.renderingGroupId = 1;
                        this.rX.isPickable = false;
                        this.rY.isPickable = false;
                        this.rZ.isPickable = false;
                        var cl = d;
                        this.rEndX = this.createCircle(cl / 2);
                        this.rEndY = this.rEndX.clone("");
                        this.rEndZ = this.rEndX.clone("");
                        this.rEndX.parent = this.rX;
                        this.rEndY.parent = this.rY;
                        this.rEndZ.parent = this.rZ;
                        this.rEndX.rotation.x = 1.57;
                        this.rEndY.rotation.x = 1.57;
                        this.rEndZ.rotation.x = 1.57;
                        this.rEndX.color = Color3.Red();
                        this.rEndY.color = Color3.Green();
                        this.rEndZ.color = Color3.Blue();
                        this.rEndX.renderingGroupId = 1;
                        this.rEndY.renderingGroupId = 1;
                        this.rEndZ.renderingGroupId = 1;
                        this.rEndX.isPickable = false;
                        this.rEndY.isPickable = false;
                        this.rEndZ.isPickable = false;
                    };
                    EditControl.prototype.extrudeBox = function (w, l) {
                        var shape = [new Vector3(w, w, 0), new Vector3(-w, w, 0), new Vector3(-w, -w, 0), new Vector3(w, -w, 0), new Vector3(w, w, 0)];
                        var path = [new Vector3(0, 0, 0), new Vector3(0, 0, l)];
                        var box = Mesh.ExtrudeShape("", shape, path, 1, 0, 2, this.scene);
                        return box;
                    };
                    EditControl.prototype.createCircle = function (r) {
                        var points = [];
                        var x;
                        var y;
                        var a = 3.14 / 180;
                        var p = 0;
                        for (var i = 0; i <= 360; i = i + 10) {
                            x = r * Math.cos(i * a);
                            if ((i == 90))
                                y = r;
                            else if ((i == 270))
                                y = -r;
                            else
                                y = r * Math.sin(i * a);
                            points[p] = new Vector3(x, y, 0);
                            p++;
                        }
                        var circle = Mesh.CreateLines("", points, this.scene);
                        return circle;
                    };
                    EditControl.prototype.createScaleAxes = function () {
                        var r = 0.04;
                        var l = this.axesLen * this.axesScale;
                        this.sCtl = new Mesh("sCtl", this.scene);
                        this.sAll = Mesh.CreateBox("ALL", r * 2, this.scene);
                        this.sX = this.extrudeBox(r / 2, l);
                        this.sX.name = "X";
                        this.sY = this.sX.clone("Y");
                        this.sZ = this.sX.clone("Z");
                        this.sX.material = this.redMat;
                        this.sY.material = this.greenMat;
                        this.sZ.material = this.blueMat;
                        this.sAll.material = this.yellowMat;
                        this.sX.parent = this.sCtl;
                        this.sY.parent = this.sCtl;
                        this.sZ.parent = this.sCtl;
                        this.sAll.parent = this.sCtl;
                        this.sX.rotation.y = 1.57;
                        this.sY.rotation.x -= 1.57;
                        this.sX.visibility = 0;
                        this.sY.visibility = 0;
                        this.sZ.visibility = 0;
                        this.sAll.visibility = 0;
                        this.sX.renderingGroupId = 1;
                        this.sY.renderingGroupId = 1;
                        this.sZ.renderingGroupId = 1;
                        this.sAll.renderingGroupId = 1;
                        this.sX.isPickable = false;
                        this.sY.isPickable = false;
                        this.sZ.isPickable = false;
                        this.sAll.isPickable = false;
                        var cr = r * this.axesScale;
                        this.sEndX = Mesh.CreateBox("", cr, this.scene);
                        this.sEndY = this.sEndX.clone("");
                        this.sEndZ = this.sEndX.clone("");
                        this.sEndAll = this.sEndX.clone("");
                        this.sEndX.parent = this.sX;
                        this.sEndY.parent = this.sY;
                        this.sEndZ.parent = this.sZ;
                        this.sEndAll.parent = this.sAll;
                        this.sEndX.position.z = l - cr / 2;
                        this.sEndY.position.z = l - cr / 2;
                        this.sEndZ.position.z = l - cr / 2;
                        this.sEndX.material = this.redMat;
                        this.sEndY.material = this.greenMat;
                        this.sEndZ.material = this.blueMat;
                        this.sEndAll.material = this.yellowMat;
                        this.sEndX.renderingGroupId = 1;
                        this.sEndY.renderingGroupId = 1;
                        this.sEndZ.renderingGroupId = 1;
                        this.sEndAll.renderingGroupId = 1;
                        this.sEndX.isPickable = false;
                        this.sEndY.isPickable = false;
                        this.sEndZ.isPickable = false;
                        this.sEndAll.isPickable = false;
                    };
                    EditControl.prototype.setLocalAxes = function (mesh) {
                        var meshMatrix = mesh.getWorldMatrix();
                        var pos = mesh.absolutePosition;
                        this.localX = Vector3.TransformCoordinates(Axis.X, meshMatrix).subtract(pos);
                        this.localY = Vector3.TransformCoordinates(Axis.Y, meshMatrix).subtract(pos);
                        this.localZ = Vector3.TransformCoordinates(Axis.Z, meshMatrix).subtract(pos);
                        this.localRot = Vector3.RotationFromAxis(this.localX, this.localY, this.localZ);
                        if ((this.local))
                            this.theParent.rotation.copyFrom(this.localRot);
                    };
                    EditControl.prototype.setLocal = function (l) {
                        if ((this.local == l))
                            return;
                        this.local = l;
                        if ((this.local))
                            this.theParent.rotation.copyFrom(this.localRot);
                        else
                            this.theParent.rotation.copyFrom(Vector3.Zero());
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
                    EditControl.prototype.setTransSnapValue = function (t) {
                        this.transSnap = t;
                    };
                    EditControl.prototype.setRotSnapValue = function (r) {
                        this.rotSnap = r;
                    };
                    EditControl.prototype.setAxesScale = function () {
                        var distFromCamera = 2;
                        var toParent = this.theParent.position.subtract(this.mainCamera.position);
                        var cameraNormal = Vector3.TransformNormal(Axis.Z, this.mainCamera.getWorldMatrix());
                        var parentOnNormal = Vector3.Dot(toParent, cameraNormal) / cameraNormal.length();
                        var s = parentOnNormal / distFromCamera;
                        var scale = new Vector3(s, s, s);
                        this.theParent.scaling = scale;
                        this.pickPlane.scaling = scale;
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