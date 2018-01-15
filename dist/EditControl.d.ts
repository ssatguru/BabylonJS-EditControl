/// <reference types="babylonjs" />
declare namespace org.ssatguru.babylonjs.component {
    import AbstractMesh = BABYLON.AbstractMesh;
    import Camera = BABYLON.Camera;
    import Matrix = BABYLON.Matrix;
    import Mesh = BABYLON.Mesh;
    import Quaternion = BABYLON.Quaternion;
    import Vector3 = BABYLON.Vector3;
    class EditControl {
        private mesh;
        private canvas;
        private scene;
        private mainCamera;
        private ecRoot;
        private local;
        private snapT;
        private snapR;
        private transSnap;
        private rotSnap;
        private axesLen;
        private axesScale;
        private pickWidth;
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
        private visibility;
        private lhsRhs;
        constructor(mesh: Mesh, camera: Camera, canvas: HTMLCanvasElement, scale: number, eulerian?: boolean);
        private checkQuaternion();
        private ecMatrix;
        private ecTOcamera;
        private renderLoopProcess();
        private distFromCamera;
        private cameraTOec;
        private cameraNormal;
        private setAxesScale();
        private setAxesRotation();
        private rotRotGuides();
        private rotPlanarGuides(XZ, ZY, YX);
        switchTo(mesh: Mesh, eulerian?: boolean): void;
        setUndoCount(c: number): void;
        undo(): void;
        redo(): void;
        /**
         * detach the edit control from the mesh and dispose off all
         * resources created by the edit control
         */
        detach(): void;
        private prevState;
        private hidden;
        /**
         * hide the edit control. use show() to unhide the control.
         */
        hide(): void;
        private hideCommonAxes();
        private showCommonAxes();
        /**
         * unhide the editcontrol hidden using the hide() method
         */
        show(): void;
        /**
         * check if the editcontrol was hidden using the hide() methods
         */
        isHidden(): boolean;
        private disposeAll();
        private actionListener;
        private actionStartListener;
        private actionEndListener;
        addActionListener(actionListener: (actionType: number) => void): void;
        removeActionListener(): void;
        addActionStartListener(actionStartListener: (actionType: number) => void): void;
        removeActionStartListener(): void;
        addActionEndListener(actionEndListener: (actionType: number) => void): void;
        removeActionEndListener(): void;
        removeAllActionListeners(): void;
        private pDown;
        private axisPicked;
        private onPointerDown(evt);
        private setEditing(editing);
        isEditing(): boolean;
        /**
         * no camera movement during edit
         */
        private detachCamera(cam, can);
        private prevOverMesh;
        private pointerIsOver;
        isPointerOver(): boolean;
        private savedMat;
        private savedCol;
        private onPointerOver();
        private clearPrevOverMesh();
        private restoreColor(mesh);
        private editing;
        private onPointerUp(evt);
        private actionType;
        private setActionType();
        private callActionListener(at);
        private callActionStartListener(at);
        private callActionEndListener(at);
        private prevPos;
        private snapRX;
        private snapRY;
        private snapRZ;
        private onPointerMove(evt);
        private rotate2;
        private getPickPlane(axis);
        private transBy;
        private doTranslation(diff);
        private snapTV;
        private transWithSnap(mesh, trans, local);
        private snapS;
        private snapSX;
        private snapSY;
        private snapSZ;
        private snapSA;
        private snapSV;
        private scaleSnap;
        private scale;
        private doScaling(diff);
        private scaleWithSnap(mesh, p);
        private boundingDimesion;
        private getBoundingDimension(mesh);
        refreshBoundingInfo(): void;
        private eulerian;
        private snapRA;
        private doRotation(mesh, axis, newPos, prevPos);
        private getPosOnPickPlane();
        private hideBaxis();
        private setAxesVisiblity(v);
        getRotationQuaternion(): Quaternion;
        getPosition(): Vector3;
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
        private scaleBoundsMin;
        private scaleBoundsMax;
        setScaleBounds(min?: Vector3, max?: Vector3): void;
        removeScaleBounds(): void;
        private transBoundsMin;
        private transBoundsMax;
        setTransBounds(min?: Vector3, max?: Vector3): void;
        removeTransBounds(): void;
        private rotBoundsMin;
        private rotBoundsMax;
        setRotBounds(min?: Vector3, max?: Vector3): void;
        removeRotBounds(): void;
        private bXaxis;
        private bYaxis;
        private bZaxis;
        private xaxis;
        private yaxis;
        private zaxis;
        private createCommonAxes();
        private pickedPlane;
        private pALL;
        private pXZ;
        private pZY;
        private pYX;
        private createPickPlanes();
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
        private createTriangle(name, w, scene);
        private rCtl;
        private rX;
        private rY;
        private rZ;
        private rAll;
        private rEndX;
        private rEndY;
        private rEndZ;
        private rEndAll;
        private rEndAll2;
        private guideSize;
        setRotGuideFull(y: boolean): void;
        private createRotAxes();
        private extrudeBox(w, l);
        private createCircle(r, t, double);
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
        /**
         * checks if a have left hand , right hand issue.
         * In other words if a mesh is a LHS mesh in RHS system or
         * a RHS mesh in LHS system
         * The X axis will be reversed in such cases.
         * thus Cross product of X and Y should be inverse of Z.
         *
         */
        private check_LHS_RHS(mesh);
        /**
         * set how transparent the axes are
         * 0 to 1
         * 0 - completely transparent
         * 1 - completely non transparent
         * default is 0.75
         */
        setVisibility(v: number): void;
        setLocal(l: boolean): void;
        isLocal(): boolean;
        setTransSnap(s: boolean): void;
        setRotSnap(s: boolean): void;
        setScaleSnap(s: boolean): void;
        private tSnap;
        setTransSnapValue(t: number): void;
        setRotSnapValue(r: number): void;
        /**
         * use this to set the scale snap value
         */
        setScaleSnapValue(r: number): void;
        tv1: Vector3;
        tv2: Vector3;
        tv3: Vector3;
        tm: Matrix;
        private getAngle2(p1, p2, cameraPos, c2ec, mN);
        /**
         * finds the angle subtended from points p1 to p2 around the point p
         * checks if the user was trying to rotate clockwise (+ve in LHS) or anticlockwise (-ve in LHS)
         * to figure this check the orientation of the user(camera)to ec vector with the rotation normal vector
         */
        private getAngle(p1, p2, p, c2ec);
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
        add(at?: number): void;
        undo(): number;
        redo(): number;
    }
    class Act {
        private p;
        private rQ;
        private rE;
        private s;
        private at;
        constructor(mesh: AbstractMesh, at: number);
        getActionType(): number;
        perform(mesh: AbstractMesh): void;
    }
}
