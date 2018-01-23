/// <reference types="babylonjs" />
declare namespace org.ssatguru.babylonjs.component {
    import AbstractMesh = BABYLON.AbstractMesh;
    import Camera = BABYLON.Camera;
    import Mesh = BABYLON.Mesh;
    import Quaternion = BABYLON.Quaternion;
    import Vector3 = BABYLON.Vector3;
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
    class EditControl {
        private _mesh;
        private _canvas;
        private _scene;
        private _mainCamera;
        private _ecRoot;
        private _local;
        private _snapT;
        private _snapR;
        private _transSnap;
        private _rotSnap;
        private _axesLen;
        private _axesScale;
        private _pickWidth;
        private _redMat;
        private _greenMat;
        private _blueMat;
        private _whiteMat;
        private _yellowMat;
        private _actHist;
        private _renderer;
        private _pointerdown;
        private _pointerup;
        private _pointermove;
        private _visibility;
        constructor(mesh: Mesh, camera: Camera, canvas: HTMLCanvasElement, scale?: number, eulerian?: boolean, pickWidth?: number);
        private _checkQuaternion();
        private _ecMatrix;
        private _ecTOcamera;
        private _renderLoopProcess();
        /**
         * sets rotaion of edit control to that of the mesh
         */
        private _setECRotation();
        /**
         * checks if any of the mesh's ancestors has non uniform scale
         */
        private _isScaleUnEqual(mesh);
        private _distFromCamera;
        private _cameraTOec;
        private _cameraNormal;
        private _setECScale();
        private _rotRotGuides();
        /**
         * rotate the planar guide so that they are facing the camera
         */
        private _rotPlanarGuides(XZ, ZY, YX);
        switchTo(mesh: Mesh, eulerian?: boolean): void;
        setUndoCount(c: number): void;
        undo(): void;
        redo(): void;
        /**
         * detach the edit control from the mesh and dispose off all
         * resources created by the edit control
         */
        detach(): void;
        private _prevState;
        private _hidden;
        /**
         * hide the edit control. use show() to unhide the control.
         */
        hide(): void;
        private _hideCommonAxes();
        private _showCommonAxes();
        /**
         * unhide the editcontrol hidden using the hide() method
         */
        show(): void;
        /**
         * check if the editcontrol was hidden using the hide() methods
         */
        isHidden(): boolean;
        private _disposeAll();
        private _actionListener;
        private _actionStartListener;
        private _actionEndListener;
        addActionListener(actionListener: (actionType: number) => void): void;
        removeActionListener(): void;
        addActionStartListener(actionStartListener: (actionType: number) => void): void;
        removeActionStartListener(): void;
        addActionEndListener(actionEndListener: (actionType: number) => void): void;
        removeActionEndListener(): void;
        removeAllActionListeners(): void;
        private _pDown;
        private _axisPicked;
        private _onPointerDown(evt);
        private _setEditing(editing);
        isEditing(): boolean;
        /**
         * no camera movement during edit
         */
        private _detachCamera(cam, can);
        private _prevOverMesh;
        private _pointerIsOver;
        isPointerOver(): boolean;
        private _savedMat;
        private _savedCol;
        private _onPointerOver();
        private _clearPrevOverMesh();
        private _restoreColor(mesh);
        private _editing;
        private _onPointerUp(evt);
        private _actionType;
        private _setActionType();
        private _callActionListener(at);
        private _callActionStartListener(at);
        private _callActionEndListener(at);
        private _prevPos;
        private _onPointerMove(evt);
        private _rotate2;
        private _getPickPlane(axis);
        private _transBy;
        private _doTranslation(diff);
        private _snapTV;
        private _transWithSnap(mesh, trans, local);
        private _snapS;
        private _snapSV;
        private _scaleSnap;
        private _scale;
        private _doScaling(diff);
        private _scaleWithSnap(mesh, p);
        private _localX;
        private _localY;
        private _localZ;
        private _setLocalAxes(mesh);
        private _boundingDimesion;
        private _getBoundingDimension(mesh);
        refreshBoundingInfo(): void;
        private _eulerian;
        private _snapRA;
        private _doRotation(mesh, axis, newPos, prevPos);
        private _getPosOnPickPlane();
        private _hideBaxis();
        private _setAxesVisiblity(v);
        getRotationQuaternion(): Quaternion;
        getPosition(): Vector3;
        private _transEnabled;
        isTranslationEnabled(): boolean;
        enableTranslation(): void;
        disableTranslation(): void;
        private _rotEnabled;
        isRotationEnabled(): boolean;
        returnEuler(euler: boolean): void;
        enableRotation(): void;
        disableRotation(): void;
        private _scaleEnabled;
        isScalingEnabled(): boolean;
        enableScaling(): void;
        disableScaling(): void;
        private _scaleBoundsMin;
        private _scaleBoundsMax;
        setScaleBounds(min?: Vector3, max?: Vector3): void;
        removeScaleBounds(): void;
        private _transBoundsMin;
        private _transBoundsMax;
        setTransBounds(min?: Vector3, max?: Vector3): void;
        removeTransBounds(): void;
        private _rotBoundsMin;
        private _rotBoundsMax;
        setRotBounds(min?: Vector3, max?: Vector3): void;
        removeRotBounds(): void;
        private _bXaxis;
        private _bYaxis;
        private _bZaxis;
        private _xaxis;
        private _yaxis;
        private _zaxis;
        private _createCommonAxes();
        private _pickedPlane;
        private _pALL;
        private _pXZ;
        private _pZY;
        private _pYX;
        private _createPickPlanes();
        private _tCtl;
        private _tX;
        private _tY;
        private _tZ;
        private _tXZ;
        private _tZY;
        private _tYX;
        private _tAll;
        private _tEndX;
        private _tEndY;
        private _tEndZ;
        private _tEndXZ;
        private _tEndZY;
        private _tEndYX;
        private _tEndAll;
        private _createTransAxes();
        private _createTriangle(name, w, scene);
        private _rCtl;
        private _rX;
        private _rY;
        private _rZ;
        private _rAll;
        private _rEndX;
        private _rEndY;
        private _rEndZ;
        private _rEndAll;
        private _rEndAll2;
        private _guideSize;
        setRotGuideFull(y: boolean): void;
        private _createRotAxes();
        private _extrudeBox(w, l);
        private _createCircle(r, t, double);
        private _createTube(r, t?);
        private _sCtl;
        private _sX;
        private _sY;
        private _sZ;
        private _sXZ;
        private _sZY;
        private _sYX;
        private _sAll;
        private _sEndX;
        private _sEndY;
        private _sEndZ;
        private _sEndXZ;
        private _sEndZY;
        private _sEndYX;
        private _sEndAll;
        private _createScaleAxes();
        /**
         * checks if a have left hand , right hand issue.
         * In other words if a mesh is a LHS mesh in RHS system or
         * a RHS mesh in LHS system
         * The X axis will be reversed in such cases.
         * thus Cross product of X and Y should be inverse of Z.
         *
         */
        private _check_LHS_RHS(mesh);
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
        private _tSnap;
        setTransSnapValue(t: number): void;
        setRotSnapValue(r: number): void;
        /**
         * use this to set the scale snap value
         */
        setScaleSnapValue(r: number): void;
        private _tv1;
        private _tv2;
        private _tv3;
        private _tm;
        private _getAngle2(p1, p2, cameraPos, c2ec, mN);
        /**
         * finds the angle subtended from points p1 to p2 around the point p
         * checks if the user was trying to rotate clockwise (+ve in LHS) or anticlockwise (-ve in LHS)
         * to figure this check the orientation of the user(camera)to ec vector with the rotation normal vector
         */
        private _getAngle(p1, p2, p, c2ec);
        private _createMaterials(scene);
        private _disposeMaterials();
        private static _getStandardMaterial(name, col, scene);
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
        private _p;
        private _rQ;
        private _rE;
        private _s;
        private _at;
        constructor(mesh: AbstractMesh, at: number);
        getActionType(): number;
        perform(mesh: AbstractMesh): void;
    }
}
