namespace org.ssatguru.babylonjs.component {
    import AbstractMesh = BABYLON.AbstractMesh;
    import Axis = BABYLON.Axis;
    import Camera = BABYLON.Camera;
    import Color3 = BABYLON.Color3;
    import LinesMesh = BABYLON.LinesMesh;
    import Material = BABYLON.Material;
    import Matrix = BABYLON.Matrix;
    import Mesh = BABYLON.Mesh;
    import MeshBuilder = BABYLON.MeshBuilder;
    import Node = BABYLON.Node;
    import PickingInfo = BABYLON.PickingInfo;
    import Quaternion = BABYLON.Quaternion;
    import Scene = BABYLON.Scene;
    import Space = BABYLON.Space;
    import StandardMaterial = BABYLON.StandardMaterial;
    import Vector3 = BABYLON.Vector3;

    export class EditControl {
        private mesh: Mesh;

        private canvas: HTMLCanvasElement;

        private scene: Scene;

        private mainCamera: Camera;

        private theParent: Mesh;

        private local: boolean = true;

        private snapT: boolean = false;

        private snapR: boolean = false;

        private transSnap: number = 1;

        private rotSnap: number = Math.PI / 18;

        private axesLen: number = 0.4;

        private axesScale: number = 1;

        private redMat: StandardMaterial;

        private greenMat: StandardMaterial;

        private blueMat: StandardMaterial;

        private whiteMat: StandardMaterial;

        private yellowMat: StandardMaterial;

        private actHist: ActHist;

        private renderer: () => void;

        private pointerdown: EventListener;

        private pointerup: EventListener;

        private pointermove: EventListener;

        public constructor(mesh: Mesh, camera: Camera, canvas: HTMLCanvasElement, scale: number) {
            this.mesh = mesh;
            this.canvas = canvas;
            this.axesScale = scale;
            this.scene = mesh.getScene();
            this.mainCamera = camera;
            this.actHist = new ActHist(mesh, 10);
            mesh.computeWorldMatrix(true);
            this.theParent = new Mesh("EditControl", this.scene);
            //this.theParent.position = this.meshPicked.absolutePosition;
            this.mesh.getAbsolutePivotPointToRef(this.theParent.position);
            this.theParent.rotationQuaternion = mesh.rotationQuaternion;
            this.theParent.visibility = 0;
            this.theParent.isPickable = false;
            this.createMaterials(this.scene);
            this.createGuideAxes();
            this.guideCtl.parent = this.theParent;
            this.createPickPlane();
            this.pickPlane.parent = this.theParent;
            this.pointerdown = (evt) => { return this.onPointerDown(evt) };
            this.pointerup = (evt) => { return this.onPointerUp(evt) };
            this.pointermove = (evt) => { return this.onPointerMove(evt) };
            canvas.addEventListener("pointerdown", this.pointerdown, false);
            canvas.addEventListener("pointerup", this.pointerup, false);
            canvas.addEventListener("pointermove", this.pointermove, false);
            this.setLocalAxes(mesh);
            this.renderer = () => { return this.renderLoopProcess() };
            this.scene.registerBeforeRender(this.renderer);
        }

        private renderLoopProcess() {
            this.setAxesScale();
            //this.theParent.position = this.meshPicked.absolutePosition;
            this.mesh.getAbsolutePivotPointToRef(this.theParent.position);
            this.onPointerOver();
        }

        public switchTo(mesh: Mesh) {
            mesh.computeWorldMatrix(true);
            this.mesh = mesh;
            this.theParent.rotationQuaternion = mesh.rotationQuaternion;
            this.setLocalAxes(mesh);
            this.actHist = new ActHist(mesh, 10);
        }

        public setUndoCount(c: number) {
            this.actHist.setCapacity(c);
        }

        public undo() {
            this.actHist.undo();
            this.mesh.computeWorldMatrix(true);
            this.setLocalAxes(this.mesh);


        }

        public redo() {
            this.actHist.redo();
            this.mesh.computeWorldMatrix(true);
            this.setLocalAxes(this.mesh);

        }

        public detach() {
            this.canvas.removeEventListener("pointerdown", this.pointerdown, false);
            this.canvas.removeEventListener("pointerup", this.pointerup, false);
            this.canvas.removeEventListener("pointermove", this.pointermove, false);
            this.scene.unregisterBeforeRender(this.renderer);
            this.disposeAll();
        }

        public disposeAll() {
            this.theParent.dispose();
            this.disposeMaterials();
            this.actHist = null;
        }

        private pDown: boolean = false;

        private axisPicked: Mesh;

        private onPointerDown(evt: Event) {
            evt.preventDefault();
            this.pDown = true;
            if ((<PointerEvent>evt).button != 0) return;

            var pickResult: PickingInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => {
                if (this.transEnabled) {
                    if ((mesh == this.tX) || (mesh == this.tY) || (mesh == this.tZ) || (mesh == this.tXZ) || (mesh == this.tZY) || (mesh == this.tYX) || (mesh == this.tAll)) return true;
                } else if ((this.rotEnabled)) {
                    if ((mesh == this.rX) || (mesh == this.rY) || (mesh == this.rZ) || (mesh == this.rAll)) return true;
                } else if ((this.scaleEnabled)) {
                    if ((mesh == this.sX) || (mesh == this.sY) || (mesh == this.sZ) || (mesh == this.sAll)) return true;
                }
                return false;
            }, null, this.mainCamera);

            if (pickResult.hit) {
                this.setAxesVisiblity(0);
                this.axisPicked = <Mesh>pickResult.pickedMesh;
                let childs: Node[] = this.axisPicked.getChildren();
                if (childs.length > 0) {
                    (<Mesh>childs[0]).visibility = 1;
                } else {
                    this.axisPicked.visibility = 1;
                }
                var name: string = this.axisPicked.name;
                if ((name == "X")) this.bXaxis.visibility = 1;
                else if ((name == "Y")) this.bYaxis.visibility = 1;
                else if ((name == "Z")) this.bZaxis.visibility = 1;
                else if ((name == "XZ")) {
                    this.bXaxis.visibility = 1;
                    this.bZaxis.visibility = 1;
                } else if ((name == "ZY")) {
                    this.bZaxis.visibility = 1;
                    this.bYaxis.visibility = 1;
                } else if ((name == "YX")) {
                    this.bYaxis.visibility = 1;
                    this.bXaxis.visibility = 1;
                } else if ((name == "ALL")) {
                    this.bXaxis.visibility = 1;
                    this.bYaxis.visibility = 1;
                    this.bZaxis.visibility = 1;
                }
                this.editing = true;
                this.prevPos = this.getPosOnPickPlane();
                window.setTimeout(((cam, can) => { return this.detachControl(cam, can) }), 0, this.mainCamera, this.canvas);
            }
        }

        public isEditing(): boolean {
            return this.editing;
        }

        private detachControl(cam: Object, can: Object) {
            var camera: Camera = <Camera>cam;
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>can;
            camera.detachControl(canvas);
        }

        private prevOverMesh: Mesh;

        private pointerIsOver: boolean = false;

        public isPointerOver(): boolean {
            return this.pointerIsOver;
        }
        savedMat: Material;
        savedCol: Color3;
        private onPointerOver() {
            if (this.pDown) return;
            var pickResult: PickingInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => {
                if (this.transEnabled) {
                    if ((mesh == this.tX) || (mesh == this.tY) || (mesh == this.tZ) || (mesh == this.tXZ) || (mesh == this.tZY) || (mesh == this.tYX) || (mesh == this.tAll)) return true;
                } else if ((this.rotEnabled)) {
                    if ((mesh == this.rX) || (mesh == this.rY) || (mesh == this.rZ) || (mesh == this.rAll)) return true;
                } else if (this.scaleEnabled) {
                    if ((mesh == this.sX) || (mesh == this.sY) || (mesh == this.sZ) || (mesh == this.sAll)) return true;
                }
                return false;
            }, null, this.mainCamera);
            if (pickResult.hit) {
                if (<Mesh>pickResult.pickedMesh != this.prevOverMesh) {
                    this.pointerIsOver = true;
                    if (this.prevOverMesh != null) {
                        this.prevOverMesh.visibility = 0;
                        this.restoreColor(this.prevOverMesh);
                    }
                    this.prevOverMesh = <Mesh>pickResult.pickedMesh;
                    if (this.rotEnabled) {
                        this.savedCol = (<LinesMesh>this.prevOverMesh.getChildren()[0]).color;
                        (<LinesMesh>this.prevOverMesh.getChildren()[0]).color = Color3.White();
                    } else {
                        let childs: Node[] = this.prevOverMesh.getChildren();
                        if (childs.length > 0) {
                            this.savedMat = (<Mesh>childs[0]).material;
                            (<Mesh>childs[0]).material = this.whiteMat;
                        } else {
                            this.savedMat = this.prevOverMesh.material;
                            this.prevOverMesh.material = this.whiteMat;
                        }
                    }
                    if (this.prevOverMesh.name == "X") {
                        this.xaxis.color = Color3.White();
                    } else if (this.prevOverMesh.name == "Y") {
                        this.yaxis.color = Color3.White();
                    } else if (this.prevOverMesh.name == "Z") {
                        this.zaxis.color = Color3.White();
                    }
                }
            } else {
                this.pointerIsOver = false;
                if (this.prevOverMesh != null) {
                    this.restoreColor(this.prevOverMesh);
                    this.prevOverMesh = null;
                }
            }
        }

        private restoreColor(mesh: Mesh) {
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
                (<LinesMesh>mesh.getChildren()[0]).color = this.savedCol;
            } else {
                let childs: Node[] = mesh.getChildren();
                if (childs.length > 0) {
                    (<Mesh>childs[0]).material = this.savedMat;
                } else {
                    mesh.material = this.savedMat;
                }
            }
        }
        private restoreColor_old(mesh: Mesh) {
            var col: Color3;
            var mat: Material;
            if (mesh.name == "X") {
                col = Color3.Red();
                mat = this.redMat;
                this.xaxis.color = Color3.Red();
            } else if (mesh.name == "Y") {
                col = Color3.Green();
                mat = this.greenMat;
                this.yaxis.color = Color3.Green();
            } else if (mesh.name == "Z") {
                col = Color3.Blue();
                mat = this.blueMat;
                this.zaxis.color = Color3.Blue();
            } else {
                col = Color3.Yellow();
                mat = this.yellowMat;
            }
            if (this.rotEnabled) {
                (<LinesMesh>mesh.getChildren()[0]).color = col;
            } else {
                let childs: Node[] = mesh.getChildren();
                if (childs.length > 0) {
                    (<Mesh>childs[0]).material = mat;
                } else {
                    mesh.material = mat;
                }
            }
        }
        editing: boolean = false;

        private onPointerUp(evt: Event) {
            this.pDown = false;
            if ((this.editing)) {
                this.mainCamera.attachControl(this.canvas);
                this.editing = false;
                this.setAxesVisiblity(1);
                this.hideBaxis();
                this.restoreColor(this.prevOverMesh);
                this.prevOverMesh = null;
                this.actHist.add();
            }
        }

        private prevPos: Vector3;

        private snapX: number = 0;

        private snapY: number = 0;

        private snapZ: number = 0;

        private snapRX: number = 0;

        private snapRY: number = 0;

        private snapRZ: number = 0;

        private onPointerMove(evt: Event) {
            if ((!this.pDown || !this.editing)) return;
            var newPos: Vector3 = this.getPosOnPickPlane();
            if ((newPos == null)) return;
            if ((this.transEnabled)) this.doTranslation(newPos);
            if ((this.scaleEnabled && this.local)) this.doScaling(newPos);
            if ((this.rotEnabled)) this.doRotation(newPos);
            this.prevPos = newPos;
        }

        private doTranslation(newPos: Vector3) {
            var diff: Vector3 = newPos.subtract(this.prevPos);
            var dl: number = diff.length();
            var space: Space;
            if (this.local) space = Space.LOCAL; else space = Space.WORLD;
            if (this.axisPicked == this.tX) {
                if (this.local) dl = Vector3.Dot(diff, this.localX) / (this.localX.length() * this.mesh.scaling.x); else dl = diff.x;
                if (this.snapT) {
                    this.snapX += dl;
                    dl = 0;
                    var scale: number = 1;
                    if (this.local) scale = this.mesh.scaling.x;
                    if (Math.abs(this.snapX) > this.transSnap / scale) {
                        if (this.snapX > 0) dl = this.transSnap / scale; else dl = -this.transSnap / scale;
                        this.snapX = 0;
                    }
                }
                if (this.local) this.mesh.translate(Axis.X, dl, space); else {
                    //this.meshPicked.position.x+=dl;
                    this.mesh.position.x = Number(this.mesh.position.x) + Number(dl);
                }
            } else if (this.axisPicked == this.tY) {
                if (this.local) dl = Vector3.Dot(diff, this.localY) / (this.localY.length() * this.mesh.scaling.y); else dl = diff.y;
                if (this.snapT) {
                    this.snapY += dl;
                    dl = 0;
                    var scale: number = 1;
                    if (this.local) scale = this.mesh.scaling.y;
                    if ((Math.abs(this.snapY) > this.transSnap / scale)) {
                        if (this.snapY > 0) dl = this.transSnap / scale; else dl = -this.transSnap / scale;
                        this.snapY = 0;
                    }
                }
                if (this.local) this.mesh.translate(Axis.Y, dl, space); else {
                    //this.meshPicked.position.y+=dl;
                    this.mesh.position.y = Number(this.mesh.position.y) + Number(dl);
                }
            } else if (this.axisPicked == this.tZ) {
                if (this.local) dl = Vector3.Dot(diff, this.localZ) / (this.localZ.length() * this.mesh.scaling.z); else dl = diff.z;
                if (this.snapT) {
                    this.snapZ += dl;
                    dl = 0;
                    var scale: number = 1;
                    if (this.local) scale = this.mesh.scaling.z;
                    if ((Math.abs(this.snapZ) > this.transSnap / scale)) {
                        if (this.snapZ > 0) dl = this.transSnap / scale; else dl = -this.transSnap / scale;
                        this.snapZ = 0;
                    }
                }
                if (this.local) this.mesh.translate(Axis.Z, dl, space); else {
                    //this.meshPicked.position.z+=dl;
                    this.mesh.position.z = Number(this.mesh.position.z) + Number(dl);
                }
            } else if (this.axisPicked == this.tXZ) {
                let norm: Vector3
                if (this.local) {
                    norm = Vector3.Normalize(this.localY);
                } else {
                    norm = Axis.Y;
                }
                this.translateInPlane(this.mesh, diff, norm);

            } else if (this.axisPicked == this.tZY) {
                let norm: Vector3
                if (this.local) {
                    norm = Vector3.Normalize(this.localX);
                } else {
                    norm = Axis.X;
                }
                this.translateInPlane(this.mesh, diff, norm);

            } else if (this.axisPicked == this.tYX) {
                let norm: Vector3
                if (this.local) {
                    norm = Vector3.Normalize(this.localZ);
                } else {
                    norm = Axis.Z;
                }
                this.translateInPlane(this.mesh, diff, norm);

            } else if (this.axisPicked == this.tAll) {
                this.mesh.position.addInPlace(diff);
            }
        }

        /**
         * projects a vector on a plane and then translates the mesh along the projected vector
         * the plane is identified by its normal
         */
        private translateInPlane(mesh: Mesh, trans: Vector3, normal: Vector3) {
            //project the translation onto this normal
            let nNorm: Vector3 = normal.scale(Vector3.Dot(trans, normal));
            //get the projection of diff on XZ
            let p: Vector3 = trans.subtract(nNorm);
            mesh.position.addInPlace(p);
        }

        snapS: boolean = false;
        snapSX: number = 0;
        snapSY: number = 0;
        snapSZ: number = 0;
        snapSA: number = 0;
        scaleSnap: number = 0.25;

        private doScaling(newPos: Vector3) {
            var ppm: Vector3 = this.prevPos.subtract(this.mesh.position);
            var diff: Vector3 = newPos.subtract(this.prevPos);
            if (this.axisPicked === this.sX) {
                var r: number = Vector3.Dot(diff, this.localX) / this.localX.length();
                if (this.snapS) {
                    this.snapSX += r;
                    if (Math.abs(this.snapSX) > this.scaleSnap) {
                        if (r > 0) r = this.scaleSnap; else r = -this.scaleSnap;
                        this.snapSX = 0;
                    } else return;
                }
                this.mesh.scaling.x += r;
            } else if (this.axisPicked === this.sY) {
                var r: number = Vector3.Dot(diff, this.localY) / this.localY.length();
                if (this.snapS) {
                    this.snapSY += r;
                    if (Math.abs(this.snapSY) > this.scaleSnap) {
                        if (r > 0) r = this.scaleSnap; else r = -this.scaleSnap;
                        this.snapSY = 0;
                    } else return;
                }
                this.mesh.scaling.y += r;
            } else if (this.axisPicked === this.sZ) {
                var r: number = Vector3.Dot(diff, this.localZ) / this.localZ.length();
                if (this.snapS) {
                    this.snapSZ += r;
                    if (Math.abs(this.snapSZ) > this.scaleSnap) {
                        if (r > 0) r = this.scaleSnap; else r = -this.scaleSnap;
                        this.snapSZ = 0;
                    } else return;
                }
                this.mesh.scaling.z += r;
            } else if (this.axisPicked === this.sAll) {
                var r: number = Vector3.Dot(diff, this.mainCamera.upVector);
                if (this.snapS) {
                    this.snapSA += r;
                    if (Math.abs(this.snapSA) > this.scaleSnap) {
                        if (r > 0) r = this.scaleSnap; else r = -this.scaleSnap;
                        this.snapSA = 0;
                    } else return;
                }
                this.mesh.scaling.x += r;
                this.mesh.scaling.y += r;
                this.mesh.scaling.z += r;
            }
        }
        private doScaling_old(newPos: Vector3) {
            var ppm: Vector3 = this.prevPos.subtract(this.mesh.position);
            var diff: Vector3 = newPos.subtract(this.prevPos);
            var r: number = diff.length() / ppm.length();
            if (this.axisPicked === this.sX) {
                var dot: number = Vector3.Dot(diff, this.localX);
                if ((dot >= 0)) this.mesh.scaling.x *= (1 + r); else this.mesh.scaling.x *= (1 - r);
            } else if (this.axisPicked === this.sY) {
                var dot: number = Vector3.Dot(diff, this.localY);
                if ((dot >= 0)) this.mesh.scaling.y *= (1 + r); else this.mesh.scaling.y *= (1 - r);
            } else if (this.axisPicked === this.sZ) {
                var dot: number = Vector3.Dot(diff, this.localZ);
                if ((dot >= 0)) this.mesh.scaling.z *= (1 + r); else this.mesh.scaling.z *= (1 - r);
            } else if (this.axisPicked === this.sAll) {
                var dot: number = Vector3.Dot(diff, this.mainCamera.upVector);
                r = diff.length() / 5;
                if ((dot < 0)) {
                    r = -1 * r;
                }
                this.mesh.scaling.x *= (1 + r);
                this.mesh.scaling.y *= (1 + r);
                this.mesh.scaling.z *= (1 + r);
            }
        }

        eulerian: boolean = false;

        private doRotation(newPos: Vector3) {
            var cN: Vector3 = Vector3.TransformNormal(Axis.Z, this.mainCamera.getWorldMatrix());
            //var angle: number = EditControl.getAngle(this.prevPos, newPos, this.meshPicked.absolutePosition, cN);
            var angle: number = EditControl.getAngle(this.prevPos, newPos, this.mesh.getAbsolutePivotPoint(), cN);

            if (this.axisPicked == this.rX) {
                if (this.snapR) {
                    this.snapRX += angle;
                    angle = 0;
                    if (Math.abs(this.snapRX) >= this.rotSnap) {
                        if ((this.snapRX > 0)) angle = this.rotSnap; else angle = -this.rotSnap;
                        this.snapRX = 0;
                    }
                }
                if (this.local) {
                    if (Vector3.Dot(this.localX, cN) < 0) angle = -1 * angle;
                    this.mesh.rotate(Axis.X, angle, Space.LOCAL);
                } else this.mesh.rotate(new Vector3(cN.x, 0, 0), angle, Space.WORLD);
                this.setLocalAxes(this.mesh);
            } else if (this.axisPicked == this.rY) {
                if (this.snapR) {
                    this.snapRY += angle;
                    angle = 0;
                    if (Math.abs(this.snapRY) >= this.rotSnap) {
                        if ((this.snapRY > 0)) angle = this.rotSnap; else angle = -this.rotSnap;
                        this.snapRY = 0;
                    }
                }
                if (this.local) {
                    if (Vector3.Dot(this.localY, cN) < 0) angle = -1 * angle;
                    this.mesh.rotate(Axis.Y, angle, Space.LOCAL);
                } else this.mesh.rotate(new Vector3(0, cN.y, 0), angle, Space.WORLD);
                this.setLocalAxes(this.mesh);
            } else if (this.axisPicked == this.rZ) {
                if (this.snapR) {
                    this.snapRZ += angle;
                    angle = 0;
                    if (Math.abs(this.snapRZ) >= this.rotSnap) {
                        if (this.snapRZ > 0) angle = this.rotSnap; else angle = -this.rotSnap;
                        this.snapRZ = 0;
                    }
                }
                if (this.local) {
                    if (Vector3.Dot(this.localZ, cN) < 0) angle = -1 * angle;
                    this.mesh.rotate(Axis.Z, angle, Space.LOCAL);
                } else this.mesh.rotate(new Vector3(0, 0, cN.z), angle, Space.WORLD);
                this.setLocalAxes(this.mesh);
            } else if (this.axisPicked == this.rAll) {
                this.mesh.rotate(this.mesh.position.subtract(this.mainCamera.position), angle, Space.WORLD);
                this.setLocalAxes(this.mesh);
            }
            if ((this.eulerian)) {
                this.mesh.rotation = this.mesh.rotationQuaternion.toEulerAngles();
                this.mesh.rotationQuaternion = null;
            }
        }

        private getPosOnPickPlane(): Vector3 {
            var pickinfo: PickingInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => {
                return mesh == this.pickPlane;
            }, null, this.mainCamera);
            if ((pickinfo.hit)) {
                return pickinfo.pickedPoint;
            } else {
                return null;
            }
        }

        private hideBaxis() {
            this.bXaxis.visibility = 0;
            this.bYaxis.visibility = 0;
            this.bZaxis.visibility = 0;
        }

        private setAxesVisiblity(v: number) {
            if (this.transEnabled) {
                this.tEndX.visibility = v;
                this.tEndY.visibility = v;
                this.tEndZ.visibility = v;
                this.tEndXZ.visibility = v;
                this.tEndZY.visibility = v;
                this.tEndYX.visibility = v;
                this.tEndAll.visibility = v;
            }
            if (this.rotEnabled) {
                this.rEndX.visibility = v;
                this.rEndY.visibility = v;
                this.rEndZ.visibility = v;
                this.rEndAll.visibility = v;
            }
            if (this.scaleEnabled) {
                this.sEndX.visibility = v;
                this.sEndY.visibility = v;
                this.sEndZ.visibility = v;
                this.sEndAll.visibility = v;
            }
        }

        private transEnabled: boolean = false;

        public isTranslationEnabled(): boolean {
            return this.transEnabled;
        }

        public enableTranslation() {
            if ((this.tX == null)) {
                this.createTransAxes();
                this.tCtl.parent = this.theParent;
            }
            if ((!this.transEnabled)) {
                this.tEndX.visibility = 1;
                this.tEndY.visibility = 1;
                this.tEndZ.visibility = 1;
                this.tEndXZ.visibility = 1;
                this.tEndZY.visibility = 1;
                this.tEndYX.visibility = 1;
                this.tEndAll.visibility = 1;
                this.transEnabled = true;
                this.disableRotation();
                this.disableScaling();
            }
        }

        public disableTranslation() {
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
        }

        private rotEnabled: boolean = false;

        public isRotationEnabled(): boolean {
            return this.rotEnabled;
        }

        public returnEuler(euler: boolean) {
            this.eulerian = euler;
        }

        public enableRotation() {
            if ((this.rX == null)) {
                this.createRotAxes();
                this.rCtl.parent = this.theParent;
            }
            if ((!this.rotEnabled)) {
                this.rEndX.visibility = 1;
                this.rEndY.visibility = 1;
                this.rEndZ.visibility = 1;
                this.rEndAll.visibility = 1;
                this.rotEnabled = true;
                this.disableTranslation();
                this.disableScaling();
            }
        }

        public disableRotation() {
            if ((this.rotEnabled)) {
                this.rEndX.visibility = 0;
                this.rEndY.visibility = 0;
                this.rEndZ.visibility = 0;
                this.rEndAll.visibility = 0;
                this.rotEnabled = false;
            }
        }

        private scaleEnabled: boolean = false;

        public isScalingEnabled(): boolean {
            return this.scaleEnabled;
        }

        public enableScaling() {
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
        }

        public disableScaling() {
            if ((this.scaleEnabled)) {
                this.sEndX.visibility = 0;
                this.sEndY.visibility = 0;
                this.sEndZ.visibility = 0;
                this.sEndAll.visibility = 0;
                this.scaleEnabled = false;
            }
        }

        private bXaxis: LinesMesh;

        private bYaxis: LinesMesh;

        private bZaxis: LinesMesh;

        private xaxis: LinesMesh;

        private yaxis: LinesMesh;

        private zaxis: LinesMesh;

        private guideCtl: Mesh;

        /*
         * create axeses which will be shown in all three modes, translate, rotate and scale.
         */
        private createGuideAxes() {

            this.guideCtl = new Mesh("guideCtl", this.scene);

            //the big axes, shown when an axis is selected
            this.bXaxis = Mesh.CreateLines("bxAxis", [new Vector3(-100, 0, 0), new Vector3(100, 0, 0)], this.scene);
            this.bYaxis = Mesh.CreateLines("byAxis", [new Vector3(0, -100, 0), new Vector3(0, 100, 0)], this.scene);
            this.bZaxis = Mesh.CreateLines("bzAxis", [new Vector3(0, 0, -100), new Vector3(0, 0, 100)], this.scene);

            //lines are now pickable too
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

            //the small axis
            let al: number = this.axesLen * this.axesScale;
            this.xaxis = Mesh.CreateLines("xAxis", [new Vector3(0, 0, 0), new Vector3(al, 0, 0)], this.scene);
            this.yaxis = Mesh.CreateLines("yAxis", [new Vector3(0, 0, 0), new Vector3(0, al, 0)], this.scene);
            this.zaxis = Mesh.CreateLines("zAxis", [new Vector3(0, 0, 0), new Vector3(0, 0, al)], this.scene);

            //lines are now pickable too
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
        }

        private pickPlane: Mesh;

        private createPickPlane() {
            this.pickPlane = Mesh.CreatePlane("axisPlane", 200, this.scene);
            this.pickPlane.isPickable = false;
            this.pickPlane.visibility = 0;
            this.pickPlane.billboardMode = Mesh.BILLBOARDMODE_ALL;
            this.pickPlane.renderingGroupId = 1;
        }

        private tCtl: Mesh;

        private tX: Mesh;
        private tY: Mesh;
        private tZ: Mesh;

        private tXZ: Mesh;
        private tZY: Mesh;
        private tYX: Mesh;

        private tAll: Mesh;

        private tEndX: Mesh;
        private tEndY: Mesh;
        private tEndZ: Mesh;
        private tEndXZ: Mesh;
        private tEndZY: Mesh;
        private tEndYX: Mesh;
        private tEndAll: Mesh;

        private createTransAxes() {
            var r: number = 0.04 * this.axesScale;

            var l: number = this.axesLen * this.axesScale;
            this.tCtl = new Mesh("tarnsCtl", this.scene);

            //pickable invisible boxes around axes lines
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
            //do not want clients picking this
            //we will pick using mesh filter in scene.pick function 
            this.tX.isPickable = false;
            this.tY.isPickable = false;
            this.tZ.isPickable = false;
            this.tXZ.isPickable = false;
            this.tZY.isPickable = false;
            this.tYX.isPickable = false;
            this.tAll.isPickable = false;

            //non pickable but visible cones at end of axes lines
            //cyl len
            //var cl: number = (l * this.axesScale) / 4;
            var cl: number = l / 4;
            //cyl radius
            //var cr: number = r * this.axesScale;
            var cr: number = r;
            this.tEndX = Mesh.CreateCylinder("tEndX", cl, 0, cr, 6, 1, this.scene);
            this.tEndY = this.tEndX.clone("tEndY");
            this.tEndZ = this.tEndX.clone("tEndZ");
            this.tEndXZ = MeshBuilder.CreatePlane("XZ", { size: cr * 2, sideOrientation: Mesh.DOUBLESIDE }, this.scene);
            this.tEndZY = this.tEndXZ.clone("ZY");
            this.tEndYX = this.tEndXZ.clone("YX");
            this.tEndAll = Mesh.CreateBox("tEndAll", cr, this.scene);

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
            //            this.tEndXZ.material = this.redBlueMat;
            //            this.tEndZY.material = this.blueGreenMat;
            //            this.tEndYX.material = this.greenRedMat;
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
        }

        private rCtl: Mesh;

        private rX: Mesh;
        private rY: Mesh;
        private rZ: Mesh;
        private rAll: Mesh;

        private rEndX: LinesMesh;
        private rEndY: LinesMesh;
        private rEndZ: LinesMesh;
        private rEndAll: LinesMesh;

        private createRotAxes() {
            var r: number = 0.04;
            var d: number = this.axesLen * this.axesScale * 2;
            this.rCtl = new Mesh("rotCtl", this.scene);
            //pickable invisible torus around the rotation circles
            this.rX = this.createTube(d / 2, 90);
            this.rX.name = "X";
            this.rY = this.rX.clone("Y");
            this.rZ = this.rX.clone("Z");
            this.rAll = this.createTube(d / 1.75, 360);
            this.rAll.name = "ALL";

            //            this.rX.material = t            his.redMat;
            //            this.rY.material = thi            s.greenMat;
            //            this.rZ.material = th            is.blueMat;
            //            this.rAll.material = this.yellowMat;

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
            //do not want clients picking this
            //we will pick using mesh filter in scene.pick function 
            this.rX.isPickable = false;
            this.rY.isPickable = false;
            this.rZ.isPickable = false;
            this.rAll.isPickable = false;

            //non pickable but visible circles
            var cl: number = d;
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
        }

        private extrudeBox(w: number, l: number): Mesh {
            var shape: Vector3[] = [new Vector3(w, w, 0), new Vector3(-w, w, 0), new Vector3(-w, -w, 0), new Vector3(w, -w, 0), new Vector3(w, w, 0)];
            var path: Vector3[] = [new Vector3(0, 0, 0), new Vector3(0, 0, l)];
            var box: Mesh = Mesh.ExtrudeShape("", shape, path, 1, 0, 2, this.scene);
            return box;
        }

        private createCircle(r: number, t?: number): LinesMesh {
            if (t === null) t = 360;
            var points: Vector3[] = [];
            var x: number;
            var z: number;
            var a: number = 3.14 / 180;
            var p: number = 0;
            for (var i: number = 0; i <= t; i = i + 10) {
                x = r * Math.cos(i * a);
                if ((i == 90)) z = r; else if ((i == 270)) z = -r; else z = r * Math.sin(i * a);
                points[p] = new Vector3(x, 0, z);
                p++;
            }
            var circle: LinesMesh = Mesh.CreateLines("", points, this.scene);
            return circle;
        }

        private createTube(r: number, t?: number): Mesh {
            if (t === null) t = 360;
            var points: Vector3[] = [];
            var x: number;
            var z: number;
            var a: number = 3.14 / 180;
            var p: number = 0;
            for (var i: number = 0; i <= t; i = i + 30) {
                x = r * Math.cos(i * a);
                if ((i == 90)) z = r; else if ((i == 270)) z = -r; else z = r * Math.sin(i * a);
                points[p] = new Vector3(x, 0, z);
                p++;
            }
            //var circle: LinesMesh = Mesh.CreateLines("", points, this.scene);
            let tube: Mesh = Mesh.CreateTube("", points, 0.02, 3, null, BABYLON.Mesh.NO_CAP, this.scene);
            return tube;
        }


        private sCtl: Mesh;
        private sX: Mesh;
        private sY: Mesh;
        private sZ: Mesh;
        private sAll: Mesh;

        private sEndX: Mesh;

        private sEndY: Mesh;

        private sEndZ: Mesh;

        private sEndAll: Mesh;

        private createScaleAxes() {
            var r: number = 0.04;
            var l: number = this.axesLen * this.axesScale;
            this.sCtl = new Mesh("sCtl", this.scene);

            //pickable , invisible part
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
            //do not want clients picking this
            //we will pick using mesh filter in scene.pick function 
            this.sX.isPickable = false;
            this.sY.isPickable = false;
            this.sZ.isPickable = false;
            this.sAll.isPickable = false;

            //non pickable visible boxes at end of axes 
            var cr: number = r * this.axesScale;
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
        }

        private localX: Vector3 = new Vector3(0, 0, 0);
        private localY: Vector3 = new Vector3(0, 0, 0);;
        private localZ: Vector3 = new Vector3(0, 0, 0);;

        /*
         * this would be call during rotation as the local axes direction owuld have changed
         * need to set the local axis. 
         * These are used in all three modes to figure out direction of mouse move wrt the axes
         * TODO should use world pivotmatrix instead of worldmatrix - incase pivot axes were rotated?
         */
        private setLocalAxes(mesh: Mesh) {
            let meshMatrix: Matrix = mesh.getWorldMatrix();
            Vector3.FromFloatArrayToRef(meshMatrix.asArray(), 0, this.localX);
            Vector3.FromFloatArrayToRef(meshMatrix.asArray(), 4, this.localY);
            Vector3.FromFloatArrayToRef(meshMatrix.asArray(), 8, this.localZ);
        }


        public setLocal(l: boolean) {
            if (this.local == l) return;
            this.local = l;
            if (this.local) this.theParent.rotationQuaternion = this.mesh.rotationQuaternion;
            else this.theParent.rotationQuaternion = Quaternion.Identity();
        }

        public isLocal(): boolean {
            return this.local;
        }

        public setTransSnap(s: boolean) {
            this.snapT = s;
        }

        public setRotSnap(s: boolean) {
            this.snapR = s;
        }

        public setScaleSnap(s: boolean) {
            this.snapS = s;
        }

        public setTransSnapValue(t: number) {
            this.transSnap = t;
        }

        public setRotSnapValue(r: number) {
            this.rotSnap = r;
        }

        public setScaleSnapValue(r: number) {
            this.scaleSnap = r;
        }


        //how far away from camera should the axis appear to be
        distFromCamera: number = 2;
        //vector from camera to axes parent
        toParent: Vector3 = new Vector3(0, 0, 0);
        cameraNormal: Vector3 = new Vector3(0, 0, 0);
        private setAxesScale() {
            this.theParent.position.subtractToRef(this.mainCamera.position, this.toParent);
            Vector3.FromFloatArrayToRef(this.mainCamera.getWorldMatrix().asArray(), 8, this.cameraNormal);
            //get distance of axes from the camera plane - project camera to axes vector on the camera normal
            var parentOnNormal: number = Vector3.Dot(this.toParent, this.cameraNormal) / this.cameraNormal.length();
            var s: number = parentOnNormal / this.distFromCamera;
            Vector3.FromFloatsToRef(s, s, s, this.theParent.scaling);
            Vector3.FromFloatsToRef(s, s, s, this.pickPlane.scaling);

        }

        public static getAngle(p1: Vector3, p2: Vector3, p: Vector3, cN: Vector3): number {
            var v1: Vector3 = p1.subtract(p);
            var v2: Vector3 = p2.subtract(p);
            var n: Vector3 = Vector3.Cross(v1, v2);
            var angle: number = Math.asin(n.length() / (v1.length() * v2.length()));
            if ((Vector3.Dot(n, cN) < 0)) {
                angle = -1 * angle;
            }
            return angle;
        }


        private createMaterials(scene: Scene) {
            this.redMat = EditControl.getStandardMaterial("redMat", Color3.Red(), scene);
            this.greenMat = EditControl.getStandardMaterial("greenMat", Color3.Green(), scene);
            this.blueMat = EditControl.getStandardMaterial("blueMat", Color3.Blue(), scene);
            this.whiteMat = EditControl.getStandardMaterial("whiteMat", Color3.White(), scene);
            this.yellowMat = EditControl.getStandardMaterial("whiteMat", Color3.Yellow(), scene);
        }

        private disposeMaterials() {
            this.redMat.dispose();
            this.greenMat.dispose();
            this.blueMat.dispose();
            this.whiteMat.dispose();
            this.yellowMat.dispose();
        }

        private static getStandardMaterial(name: string, col: Color3, scene: Scene): StandardMaterial {
            var mat: StandardMaterial = new StandardMaterial(name, scene);
            mat.emissiveColor = col;
            mat.diffuseColor = Color3.Black();
            mat.specularColor = Color3.Black();
            return mat;
        }
    }

    export class ActHist {
        private mesh: AbstractMesh;

        private lastMax: number = 10;

        private acts: Array<Act> = new Array<Act>();

        private last: number = -1;

        private current: number = -1;

        public constructor(mesh: AbstractMesh, capacity: number) {
            this.mesh = mesh;
            this.lastMax = capacity - 1;
            if ((mesh.rotationQuaternion == null)) {
                if ((mesh.rotation != null)) {
                    mesh.rotationQuaternion = Quaternion.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z);
                }
            }
            this.add();
        }

        public setCapacity(c: number) {
            if ((c == 0)) {
                console.error("capacity should be more than zero");
                return;
            }
            this.lastMax = c - 1;
            this.last = -1;
            this.current = -1;
            this.acts = new Array<Act>();
            this.add();
        }

        public add() {
            var act: Act = new Act(this.mesh);
            if ((this.current < this.last)) {
                this.acts.splice(this.current + 1);
                this.last = this.current;
            }
            if ((this.last == this.lastMax)) {
                this.acts.shift();
                this.acts.push(act);
            } else {
                this.acts.push(act);
                this.last++;
                this.current++;
            }
        }

        public undo() {
            if ((this.current > 0)) {
                this.current--;
                (<Act>this.acts[this.current]).perform(this.mesh);
            }
        }

        public redo() {
            if ((this.current < this.last)) {
                this.current++;
                (<Act>this.acts[this.current]).perform(this.mesh);
            }
        }
    }

    export class Act {
        private p: Vector3;

        private r: Quaternion;
        private rE: Vector3;

        private s: Vector3;

        public constructor(mesh: AbstractMesh) {
            this.p = mesh.position.clone();
            if (mesh.rotationQuaternion == null) {
                this.r = null;
                this.rE = mesh.rotation.clone();
            } else {
                this.r = mesh.rotationQuaternion.clone();
                this.rE = null;
            }
            this.s = mesh.scaling.clone();
        }

        public perform(mesh: AbstractMesh) {
            mesh.position = this.p.clone();
            //check if we are doing euler or quaternion now
            //also check what were we doing when the rotation value
            //was captured and set value accordingly
            if (mesh.rotationQuaternion == null) {
                if (this.rE != null) {
                    mesh.rotation = this.rE.clone();
                } else {
                    mesh.rotation = this.r.toEulerAngles();
                }
            } else {
                if (this.r != null) {
                    mesh.rotationQuaternion = this.r.clone();
                } else {
                    mesh.rotationQuaternion = this.rE.toQuaternion();
                }
            }
            mesh.scaling = this.s.clone();
        }
    }
}
