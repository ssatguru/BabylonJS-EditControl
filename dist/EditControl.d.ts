declare namespace org.ssatguru.babylonjs.component {
    import AbstractMesh = BABYLON.AbstractMesh;
    import Camera = BABYLON.Camera;
    import Color3 = BABYLON.Color3;
    import Material = BABYLON.Material;
    import Mesh = BABYLON.Mesh;
    import Vector3 = BABYLON.Vector3;
    class EditControl {
        private mesh;
        private canvas;
        private scene;
        private mainCamera;
        private theParent;
        private local;
        private snapT;
        private snapR;
        private transSnap;
        private rotSnap;
        private axesLen;
        private axesScale;
        private redMat;
        private greenMat;
        private blueMat;
        private whiteMat;
        private yellowMat;
        private actHist;
        private renderer;
        private pointerdown;
        private pointerup;
        private pointermove;
        constructor(mesh: Mesh, camera: Camera, canvas: HTMLCanvasElement, scale: number);
        private renderLoopProcess();
        switchTo(mesh: Mesh): void;
        setUndoCount(c: number): void;
        undo(): void;
        redo(): void;
        detach(): void;
        disposeAll(): void;
        private pDown;
        private axisPicked;
        private onPointerDown(evt);
        isEditing(): boolean;
        private detachControl(cam, can);
        private prevOverMesh;
        private pointerIsOver;
        isPointerOver(): boolean;
        savedMat: Material;
        savedCol: Color3;
        private onPointerOver();
        private restoreColor(mesh);
        private restoreColor_old(mesh);
        editing: boolean;
        private onPointerUp(evt);
        private prevPos;
        private snapRX;
        private snapRY;
        private snapRZ;
        private onPointerMove(evt);
        private snapTX;
        private snapTY;
        private snapTZ;
        private snapTV;
        private transBy;
        private doTranslation(newPos);
        private transWithSnap(mesh, trans, local);
        snapS: boolean;
        snapSX: number;
        snapSY: number;
        snapSZ: number;
        snapSA: number;
        snapSV: Vector3;
        scaleSnap: number;
        scale: Vector3;
        private doScaling(newPos);
        private scaleWithSnap(mesh, p);
        eulerian: boolean;
        snapRA: number;
        private doRotation(newPos);
        private getPosOnPickPlane();
        private hideBaxis();
        private setAxesVisiblity(v);
        private transEnabled;
        isTranslationEnabled(): boolean;
        enableTranslation(): void;
        disableTranslation(): void;
        private rotEnabled;
        isRotationEnabled(): boolean;
        returnEuler(euler: boolean): void;
        enableRotation(): void;
        disableRotation(): void;
        private scaleEnabled;
        isScalingEnabled(): boolean;
        enableScaling(): void;
        disableScaling(): void;
        private bXaxis;
        private bYaxis;
        private bZaxis;
        private xaxis;
        private yaxis;
        private zaxis;
        private guideCtl;
        private createGuideAxes();
        private pickPlane;
        private createPickPlane();
        private tCtl;
        private tX;
        private tY;
        private tZ;
        private tXZ;
        private tZY;
        private tYX;
        private tAll;
        private tEndX;
        private tEndY;
        private tEndZ;
        private tEndXZ;
        private tEndZY;
        private tEndYX;
        private tEndAll;
        private createTransAxes();
        private rCtl;
        private rX;
        private rY;
        private rZ;
        private rAll;
        private rEndX;
        private rEndY;
        private rEndZ;
        private rEndAll;
        private createRotAxes();
        private extrudeBox(w, l);
        private createCircle(r, t?);
        private createTube(r, t?);
        private sCtl;
        private sX;
        private sY;
        private sZ;
        private sXZ;
        private sZY;
        private sYX;
        private sAll;
        private sEndX;
        private sEndY;
        private sEndZ;
        private sEndXZ;
        private sEndZY;
        private sEndYX;
        private sEndAll;
        private createScaleAxes();
        private localX;
        private localY;
        private localZ;
        private setLocalAxes(mesh);
        setLocal(l: boolean): void;
        isLocal(): boolean;
        setTransSnap(s: boolean): void;
        setRotSnap(s: boolean): void;
        setScaleSnap(s: boolean): void;
        tSnap: Vector3;
        setTransSnapValue(t: number): void;
        setRotSnapValue(r: number): void;
        setScaleSnapValue(r: number): void;
        distFromCamera: number;
        toParent: Vector3;
        cameraNormal: Vector3;
        private setAxesScale();
        static getAngle(p1: Vector3, p2: Vector3, p: Vector3, cN: Vector3): number;
        private createMaterials(scene);
        private disposeMaterials();
        private static getStandardMaterial(name, col, scene);
    }
    class ActHist {
        private mesh;
        private lastMax;
        private acts;
        private last;
        private current;
        constructor(mesh: AbstractMesh, capacity: number);
        setCapacity(c: number): void;
        add(): void;
        undo(): void;
        redo(): void;
    }
    class Act {
        private p;
        private r;
        private rE;
        private s;
        constructor(mesh: AbstractMesh);
        perform(mesh: AbstractMesh): void;
    }
}
