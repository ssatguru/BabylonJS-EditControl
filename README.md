# BabylonJS-EditControl
An edit control for use in [BabylonJS](http://www.babylonjs.com/) (a 3D HTML Webgl framework)  applications.

## About
All 3d editors provide a widget to translate, rotate or scale 3d objects in the editor.  
This EditControl is similar to those widgets.  
You can embed this in your Babylonjs application to provide those same capabilities.  
It currently has the following features  
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

For a demo head on over to [http://ssatguru.appspot.com/BabylonJS-EditControl/webapp/index.html](http://ssatguru.appspot.com/BabylonJS-EditControl/webapp/index.html)

## Quick start

1) add the following dependencies 
 ```
<script src="https://code.jquery.com/pep/0.4.2/pep.js"></script>
<script src="https://cdn.jsdelivr.net/babylonjs/2-5/babylon.js"></script>
<script src="EditControl.js"></script>
```
You can find the "EditControl.js" in the "dist" folder or "releases" section  
[https://github.com/ssatguru/BabylonJS-EditControl/tree/master/dist](https://github.com/ssatguru/BabylonJS-EditControl/tree/master/dist)  
[https://github.com/ssatguru/BabylonJS-EditControl/releases](https://github.com/ssatguru/BabylonJS-EditControl/releases)


2) a small javascript code snippet to get you up and running
```
	//------------------EDIT CONTROL -------------------------------------------------
	var EditControl = org.ssatguru.babylonjs.component.EditControl;
	//create edit control (mesh to attach to, active camera, canvas, scale of editcontrol)
	editControl = new EditControl(box,camera, canvas, 0.75);
	//enable translation controls
	editControl.enableTranslation();
	//set transalation snap value in meters
	editControl.setTransSnapValue(0.5);
	//set rotational snap value in radians
	editControl.setRotSnapValue(3.14/18);

```

see demo.html for a working example
[https://github.com/ssatguru/BabylonJS-EditControl/blob/master/demo.html](https://github.com/ssatguru/BabylonJS-EditControl/blob/master/demo.html)

## API
1) To Instantiate
```
// JavaScript
var EditControl = org.ssatguru.babylonjs.component.EditControl;
var editControl = new EditControl(mesh,camera, canvas, 0.75);
```
```
// TypeScript
import EditControl = org.ssatguru.babylonjs.component.EditControl;
let editControl:EditControl = new EditControl(mesh,camera, canvas, 0.75);
```
This positions the edit control at the mesh pivot position and displays  x,y,z axis.  
Takes three parms
* mesh - the mesh to control using the editcontrol
* camera - active camera
* canvas - the mesh canvas 
* scale - how small or large the editcontrol should appear
2) To enable Translation, Rotation or Scaling controls
```
editControl.enableTranslation();
```
```
editControl.enableRotation();
editControl.returnEuler(true); // Optional. This will return rotation in euler instead of quaternion. Quaternion is the default.
```
```
editControl.enableScaling();
```
3) To disable Translation, Rotation or Scaling controls (just displays x,y,z axis)
```
editControl.disableTranslation();
```
```
editControl.disableRotation();
```
```
editControl.disableScaling();
```
4) To check if Translation, Rotation or Scaling is enabled
```
editControl.isTranslationEnabled();
```
```
editControl.isRotationEnabled();
```
```
editControl.isScalingEnabled();
```
5) To turn on/off local/ global mode
```
editControl.setLocal(boolean true/false);
```
6) To check if local/ global mode
```
editControl.isLocal();
```
7) To turn on/off translation, rotation or scale snapping
```
editControl.setTransSnap(boolean true/false);
```
```
editControl.setRotSnap(boolean true/false);
```
```
editControl.setScaleSnap(boolean true/false);
```
8) To set translation, rotation or scale snap values
```
editControl.setTransSnapValue(number n in meters);
```
```
editControl.setRotSnapValue(number n in radians);
```
```
editControl.setScaleSnapValue(number n in radians);
```
9) To undo or redo
```
editControl.undo();
```
```
editControl.redo();
```
10) To set undo count

By default does upto 10 undos
```
editControl.setUndoCount(number count);
```
11) To check if user editing (moving,translating or scaling object)
```
editControl.isEditing();
```
returns true if the use is in the process of editing

12) To check if the pointer is over the edit control
```
editControl.isPointeOver();
```
returns true if the pointer is over the edit control

13) To switch edit control to another mesh
```
editControl.switchTo(Mesh mesh);
```
This quickly removes control from one mesh and attaches it to another mesh.

The translation, rotation, scaling mode is maintained.

14) To detach from the mesh and clean up resources.
```
editControl.detach();
```

## Note:  
The original version was written in Java and then transpiled to TypeScript/JavaScript using JSweet.  
It was originally written in Java, as at that time I wasn't very comfortable with the TypeScript language and its ecosystem.  
Over time I have become more comfortable with it.  
The new version is thus written in TypeScript.  
It is based on the initial TypeScript code generated by JSweet.  
Porting to Typescript was easy, as JSweet generates good human readable TypeScript which allows one to switch to TypeScript at any time.  
For those interested, the old java version is still available at [https://github.com/ssatguru/BabylonJS-EditControl.java](https://github.com/ssatguru/BabylonJS-EditControl.java)

