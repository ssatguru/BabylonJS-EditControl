import { AbstractMesh, Camera, Quaternion, Vector3, TransformNode } from 'babylonjs';
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
export declare class EditControl {
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
    private _redCol;
    private _greenCol;
    private _blueCol;
    private _whiteCol;
    private _yellowCol;
    private _actHist;
    private _renderer;
    private _pointerdown;
    private _pointerup;
    private _pointermove;
    private _visibility;
    private _lhsRhs;
    constructor(mesh: TransformNode, camera: Camera, canvas: HTMLCanvasElement, scale?: number, eulerian?: boolean, pickWidth?: number);
    getRoot(): AbstractMesh;
    private _checkQuaternion;
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
    private _check_LHS_RHS;
    private _ecMatrix;
    private _ecTOcamera;
    private _renderLoopProcess;
    /**
     * sets rotaion of edit control to that of the mesh
     */
    private _setECRotation;
    /**
     * checks if any of the mesh's ancestors has non uniform scale
     */
    private _isScaleUnEqual;
    private _distFromCamera;
    private _cameraTOec;
    private _cameraNormal;
    private _setECScale;
    private _rotRotGuides;
    /**
     * rotate the planar guide so that they are facing the camera
     */
    private _rotPlanarGuides;
    switchTo(mesh: TransformNode, eulerian?: boolean): void;
    switchCamera(camera: Camera): void;
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
    private _hideCommonAxes;
    private _showCommonAxes;
    /**
     * unhide the editcontrol hidden using the hide() method
     */
    show(): void;
    /**
     * check if the editcontrol was hidden using the hide() methods
     */
    isHidden(): boolean;
    private _disposeAll;
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
    private _onPointerDown;
    private _setEditing;
    isEditing(): boolean;
    /**
     * no camera movement during edit
     */
    private _detachCamera;
    private _prevOverMesh;
    private _pointerIsOver;
    isPointerOver(): boolean;
    private _savedMat;
    private _savedCol;
    private _onPointerOver;
    private _clearPrevOverMesh;
    private _restoreColor;
    private _editing;
    private _onPointerUp;
    private _actionType;
    private _setActionType;
    private _callActionListener;
    private _callActionStartListener;
    private _callActionEndListener;
    private _prevPos;
    private _onPointerMove;
    private _rotate2;
    private _getPickPlane;
    private _transBy;
    private _doTranslation;
    private _snapTV;
    private _transWithSnap;
    private _snapS;
    private _snapSV;
    private _scaleSnap;
    private _scale;
    private _doScaling;
    private _scaleWithSnap;
    private _localX;
    private _localY;
    private _localZ;
    private _setLocalAxes;
    private _boundingDimesion;
    private _getBoundingDimension;
    refreshBoundingInfo(): void;
    private _eulerian;
    private _snapRA;
    private _doRotation;
    private _getPosOnPickPlane;
    private _hideBaxis;
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
    private _createCommonAxes;
    private _pickedPlane;
    private _pALL;
    private _pXZ;
    private _pZY;
    private _pYX;
    private _createPickPlanes;
    private _tCtl;
    private _tX;
    private _tY;
    private _tZ;
    private _tXZ;
    private _tZY;
    private _tYX;
    private _tAll;
    private _all_t;
    private _tEndX;
    private _tEndY;
    private _tEndZ;
    private _tEndXZ;
    private _tEndZY;
    private _tEndYX;
    private _tEndAll;
    private _all_tEnd;
    private _createTransAxes;
    private _createPickableTrans;
    private _createNonPickableTrans;
    private _rCtl;
    private _rX;
    private _rY;
    private _rZ;
    private _rAll;
    private _all_r;
    private _rEndX;
    private _rEndY;
    private _rEndZ;
    private _rEndAll;
    private _rEndAll2;
    private _all_rEnd;
    private _guideSize;
    setRotGuideFull(y: boolean): void;
    private _createRotAxes;
    private _createPickableRot;
    private _createNonPickableRot;
    private _setVisibility;
    private _setPickableFalse;
    private _setRenderingGroup;
    private _extrudeBox;
    private _createCircle;
    private _createTube;
    private _sCtl;
    private _sX;
    private _sY;
    private _sZ;
    private _sXZ;
    private _sZY;
    private _sYX;
    private _sAll;
    private _all_s;
    private _sEndX;
    private _sEndY;
    private _sEndZ;
    private _sEndXZ;
    private _sEndZY;
    private _sEndYX;
    private _sEndAll;
    private _all_sEnd;
    private _createScaleAxes;
    private _createPickableScale;
    private _createNonPickableScale;
    /**
     * checks if a have left hand , right hand issue.
     * In other words if a mesh is a LHS mesh in RHS system or
     * a RHS mesh in LHS system
     * The X axis will be reversed in such cases.
     * thus Cross product of X and Y should be inverse of Z.
     *
     */
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
    private _getAngle2;
    /**
     * finds the angle subtended from points p1 to p2 around the point p
     * checks if the user was trying to rotate clockwise (+ve in LHS) or anticlockwise (-ve in LHS)
     * to figure this check the orientation of the user(camera)to ec vector with the rotation normal vector
     */
    private _getAngle;
    private _createMaterials;
    private _disposeMaterials;
    private static _getStandardMaterial;
}
