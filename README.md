# BabylonJS-EditControl
An edit control for use in [BabylonJS](http://www.babylonjs.com/) (a 3D HTML Webgl framework)  applications.

## About
All 3d editors provide a widget, also referred to as transform control, to translate, rotate or scale 3d objects in the editor.  
This EditControl is similar to those widgets.  
You can embed this in your Babylonjs application to provide those same capabilities.  
It currently supports  
* Translate 
* Translate Snap
* Rotate 
* Rotate Snap
* Scale 
* Scale Snap
* Local or Global  Translation and Rotation. (Scaling only in local axis)
* Create multiple instances in the same scene with each instance attached to a different mesh
* Scale size of control
* undo, redo

For a demo of stable version, head on over to <a href="https://ssatguru.github.io/BabylonJS-EditControl/demo?stable" target="_blank"> https://ssatguru.github.io/BabylonJS-EditControl/demo?stable </a>

For preview of the latest see <a href="https://ssatguru.github.io/BabylonJS-EditControl/demo" target="_blank"> https://ssatguru.github.io/BabylonJS-EditControl/demo </a>  

For a list of know issues, shortcomings and planned enhancements see <a href="https://github.com/ssatguru/BabylonJS-EditControl/issues" target="_blank"> https://github.com/ssatguru/BabylonJS-EditControl/issues  </a>  


## Quick start

1) add the following dependencies 
 ```
<script src="https://code.jquery.com/pep/0.4.2/pep.js"></script>
<script src="https://cdn.babylonjs.com/babylon.js"></script>
<script src="EditControl.js"></script>
```

See INSTALL below to find where you can get "EditControl.js".  

2) a small javascript code snippet to get you up and running
```
	//------------------EDIT CONTROL -------------------------------------------------
	var EditControl = org.ssatguru.babylonjs.component.EditControl;
	//create edit control (mesh to attach to, active camera, canvas, scale of editcontrol)
	editControl = new EditControl(box,camera, canvas, 0.75);
	//to show translation controls
	editControl.enableTranslation();
	//set transalation snap value in meters
	editControl.setTransSnapValue(0.5);
```

see demo.html for a working example
[https://github.com/ssatguru/BabylonJS-EditControl/blob/master/demo.html](https://github.com/ssatguru/BabylonJS-EditControl/blob/master/demo.html)

## INSTALL

You can find the "EditControl.js" from its git repository "dist" folder or "releases" section  
[https://github.com/ssatguru/BabylonJS-EditControl/tree/master/dist](https://github.com/ssatguru/BabylonJS-EditControl/tree/master/dist)  
[https://github.com/ssatguru/BabylonJS-EditControl/releases](https://github.com/ssatguru/BabylonJS-EditControl/releases)  

You can also install this from npm  
```
npm install babylonjs-editcontrol
```

Note that even though this is available in npm it is not packaged as a node module or any other type of module.  
For now, to keep it simple and avoid dependencies on module systems, the application is packaged as a simple javascript "namespaced" application.  
In other words load it using the "script" tag and refer to it using the global name "org.ssatguru.babylonjs.component.EditControl". 
Different module system provides way to handle non modules. Here is how you can use Edit Control from web pack.  
#### webpack
Because EditControl is not a module, it does not export/import anything.  
webpack provides "exports-loader" and "imports-loader" to add exports and imports to such apps.  
This is how you would use it from webpack  
```
var EditControl=require("exports-loader?org.ssatguru.babylonjs.component.EditControl!imports-loader?BABYLON=babylonjs!babylonjs-editcontrol/dist/EditControl");
```

you will, ofcourse, have to npm install the following  
exports-loader  
imports-loader  
babylonjs  
babylonjs-editcontrol  

## API
#### To Instantiate
```
// JavaScript
var EditControl = org.ssatguru.babylonjs.component.EditControl;
var editControl = new EditControl(mesh,camera, canvas, 0.75, true);
```
```
// TypeScript
import EditControl = org.ssatguru.babylonjs.component.EditControl;
let editControl:EditControl = new EditControl(mesh,camera, canvas, 0.75, true,0.02);
```
This positions the edit control at the mesh pivot position and displays  x,y,z axis.  
Takes five parms
* mesh - the mesh to control using the editcontrol
* camera - active camera
* canvas - the mesh canvas 
* scale - number. Optional. Default 1. Determines how small or large the editcontrol should appear.
* eulerian - true/false. Optional. Default false. True indicates that rotation of the mesh is in euler.If rotation is unresponsive then it is possible that the rotation may not have been initialized to either a eulerian or quaternion value.
* pickWidth - number. Optional. Default 0.02. Determines how close to an axis should the pointer get before we can pick it 


#### To show Translation, Rotation or Scaling controls
```
editControl.enableTranslation();

editControl.enableRotation();
editControl.setRotGuideFull(true/false) //This makes the rotation guides 360 degree(true) or 90 degree(false) .90 degree  looks less cluttered.
editControl.returnEuler(true); // Optional. This will return rotation in euler instead of quaternion. Quaternion is the default.

editControl.enableScaling();
```
#### To hide Translation, Rotation or Scaling controls (just displays x,y,z axis)
```
editControl.disableTranslation();
editControl.disableRotation();
editControl.disableScaling();
```
#### To check if Translation, Rotation or Scaling is enabled
```
editControl.isTranslationEnabled();
editControl.isRotationEnabled();
editControl.isScalingEnabled();
```
#### To turn on/off local/ global mode
```
editControl.setLocal(boolean true/false);
```
#### To check if local/ global mode
```
editControl.isLocal();
```
#### To turn on/off translation, rotation or scale snapping
```
editControl.setTransSnap(boolean true/false);
editControl.setRotSnap(boolean true/false);
editControl.setScaleSnap(boolean true/false);
```
#### To set translation, rotation or scale snap values
```
editControl.setTransSnapValue(number n in meters);
editControl.setRotSnapValue(number n in radians);
editControl.setScaleSnapValue(number n a factor by which scale should increase);
```
#### To bound translation, rotation or scaling
This restricts tranlation, rotation,scaling between a minimum and maximum values
```
setTransBounds(min?: Vector3,max?: Vector3) ;
setRotBounds(min?: Vector3,max?: Vector3);
setScaleBounds(min?: Vector3,max?: Vector3);
```
```
removeTransBounds();
removeRotBounds();
removeScaleBounds();
```
Note: rotation bounds has not been implemented. This is on TODO list.
#### To undo or redo
```
editControl.undo();
editControl.redo();
```
#### To set undo count

By default does upto 10 undos
```
editControl.setUndoCount(number count);
```
#### To check if user editing (moving,translating or scaling object)
```
editControl.isEditing();
```
returns true if the use is in the process of editing

#### To check if the pointer is over the edit control
```
editControl.isPointeOver();
```
returns true if the pointer is over the edit control

#### To be called back whenever the user starts, takes or ends an action
```
editControl.addActionStartListener(function(number actionType));
editControl.addActionListener(function(number actionType));
editControl.addActionEndListener(function(number actionType));
```
Each of these take a function as a parameter.  
The ActionStartListener would be called when the user starts translating,rotating or scaling a mesh  
The ActionListener would be called when the user is translating,rotating or scaling a mesh  
The ActionEndListener would be called when the user ends translating,rotating or scaling a mesh  

When called, these listeners would be passed a number which would indicate the action being taken by the user.  
This number would have one of the following values  
0 - ActionType.TRANS, Translation  
1 - ActioneType.ROT, Rotation  
2 - ActioneType.SCALE, Scaling  

To remove the listeners
```
editControl.removeActionStartListener();
editControl.removeActionListener();
editControl.removeActionEndListener();
editControl.removeAllActionListeners() // to remove all;
```

#### To refresh mesh Bounding Info. 
EditControl uses mesh bounding info to provide the same smooth scaling experience for both small and large mesh. The bounding info changes when a mesh is baked. Use this method to refresh the bounding info if you baked the transform of the mesh.
```
editControl.refreshBoundingInfo();
```
#### To get position and rotaion of EditControl
```
editControl.getPosition();//returns Vector3
editControl.getRotationQuaternion(): //returns rotation in quaternion
```
The postion and rotation of EditControl would be the same as that of the mesh to which it is attached  
#### To show/hide EditControl
```
editControl.hide();
editControl.isHidden(); //turns true or false
editControl.show();
```
#### To set visibililty (transparency)
```
editControl.setVisibility(v:number);
```
By default the visibility is set to 0.75

#### To switch edit control to another mesh
```
editControl.switchTo(Mesh mesh, optional boolean isEuler );
```
This quickly removes control from one mesh and attaches it to another mesh.

The translation, rotation, scaling mode is maintained.  

mesh : the mesh to which the control should switch to  
isEuler : true/false, optional, default false, true indicates that rotation of the mesh is in euler

#### To detach from the mesh and clean up resources.
```
editControl.detach();
```

## Build
If not already installed, install node js and typescript.  
Switch to the project folder.  
Run "npm install", once, to install all the dependencies (these, for now, are babylonjs and uglify).  
To build anytime  
Run "npm run compile" - this will compile the typescript file and store the javascript file in the "dist" folder.  
Run "npm run min" - this will minify the javascript file and store the minified version in the "dist" folder.  
Run "npm run build" - this will both compile and minify. 
Use the "test.html" to test your changes.  
## Note:  
The original version was written in Java and then transpiled to TypeScript/JavaScript using JSweet.  
It was originally written in Java, as at that time I wasn't very comfortable with the TypeScript language and its ecosystem.  
Over time I have become more comfortable with it.  
The new version is thus written in TypeScript.  
It is based on the initial TypeScript code generated by JSweet.  
Porting to Typescript was easy, as JSweet generates good human readable TypeScript which allows one to switch to TypeScript at any time.  
For those interested, the old java version is still available at [https://github.com/ssatguru/BabylonJS-EditControl.java](https://github.com/ssatguru/BabylonJS-EditControl.java)

