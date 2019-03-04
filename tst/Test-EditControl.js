(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tst/Test-EditControl.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/EditControl.js":
/*!*****************************!*\
  !*** ./dist/EditControl.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,i){if(true)module.exports=i(__webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js"));else { var s, h; }}(window,function(t){return function(t){var i={};function h(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,h),n.l=!0,n.exports}return h.m=t,h.c=i,h.d=function(t,i,s){h.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},h.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"h",{value:!0})},h.t=function(t,i){if(1&i&&(t=h(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.h)return t;var s=Object.create(null);if(h.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var n in t)h.d(s,n,function(i){return t[i]}.bind(null,n));return s},h.n=function(t){var i=t&&t.h?function(){return t.default}:function(){return t};return h.d(i,"a",i),i},h.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},h.p="",h(h.s=1)}([function(i,h){i.exports=t},function(t,i,h){"use strict";h.r(i),h.d(i,"EditControl",function(){return u});var s,n=h(0);!function(t){t[t.TRANS=0]="TRANS",t[t.ROT=1]="ROT",t[t.SCALE=2]="SCALE"}(s||(s={}));var u=function(){function t(t,i,h,s,u,r){var f=this;this.u=!0,this.v=!1,this.M=!1,this.A=1,this.L=Math.PI/18,this.j=.4,this.C=1,this.O=.02,this.S=.75,this.g=new n.Matrix,this.T=new n.Vector3(0,0,0),this.R=2,this.k=new n.Vector3(0,0,0),this._=new n.Vector3(0,0,0),this.q="",this.N=!1,this.P=null,this.B=null,this.D=null,this.F=!1,this.G=!1,this.H=!1,this.I=!1,this.J=new n.Vector3(0,0,0),this.K=new n.Vector3(0,0,0),this.U=!1,this.V=new n.Vector3(0,0,0),this.W=.25,this.$=new n.Vector3(0,0,0),this.tt=new n.Vector3(0,0,0),this.it=new n.Vector3(0,0,0),this.ht=new n.Vector3(0,0,0),this.st=!1,this.nt=0,this.ut=!1,this.et=!1,this.rt=!1,this.ft=180,this.ot=new n.Vector3(this.A,this.A,this.A),this.lt=new n.Vector3(0,0,0),this.at=new n.Vector3(0,0,0),this.ct=new n.Vector3(0,0,0),this.vt=new n.Matrix,this.Mt=t,this.wt=i,this.Xt=h,null!=s&&(this.C=s),this.st=null!==u&&u,this.Yt(),null!=r&&(this.O=r),this.Zt=t.getScene(),this.bt=new e(t,10),t.computeWorldMatrix(!0),this.dt=this.pt(t),this.yt(t),this.At=new n.Mesh("EditControl",this.Zt),this.At.rotationQuaternion=n.Quaternion.Identity(),this.At.visibility=0,this.At.isPickable=!1,this.Lt(this.Zt),this.jt().parent=this.At,this.xt().parent=this.At,this.zt=function(t){return f.Et(t)},this.Ct=function(t){return f.Ot(t)},this.St=function(t){return f.gt(t)},h.addEventListener("pointerdown",this.zt,!1),h.addEventListener("pointerup",this.Ct,!1),h.addEventListener("pointermove",this.St,!1),this.Tt=function(){return f.Rt()},this.Zt.registerBeforeRender(this.Tt)}return t.prototype.Yt=function(){if(!this.st&&(null==this.Mt.rotationQuaternion||null==this.Mt.rotationQuaternion))throw"Error: Eulerian is set to false but the mesh's rotationQuaternion is not set."},t.prototype.Rt=function(){this.At.position=this.Mt.getAbsolutePivotPoint(),this.kt(),this._t(),this.u?(this.At.getWorldMatrix().invertToRef(this.g),n.Vector3.TransformCoordinatesToRef(this.wt.position,this.g,this.T),this.qt.lookAt(this.T,0,0,0,n.Space.LOCAL)):(this.wt.position.subtractToRef(this.At.position,this.T),this.qt.lookAt(this.wt.position,0,0,0,n.Space.WORLD)),this.et?this.Nt():this.ut?this.Pt(this.Qt,this.Bt,this.Dt):this.rt&&this.Pt(this.Ft,this.Gt,this.Ht)},t.prototype.kt=function(){if(this.u)if(null==this.Mt.parent)if(this.st){var t=this.Mt.rotation;n.Quaternion.RotationYawPitchRollToRef(t.y,t.x,t.z,this.At.rotationQuaternion)}else this.At.rotationQuaternion.copyFrom(this.Mt.rotationQuaternion);else{if(this.It(this.Mt))return;this.Mt.getWorldMatrix().getRotationMatrixToRef(this.vt),n.Quaternion.FromRotationMatrixToRef(this.vt,this.At.rotationQuaternion)}},t.prototype.It=function(t){if(null==t.parent)return!1;for(;null!=t.parent;){if(t.parent.scaling.x!=t.parent.scaling.y||t.parent.scaling.y!=t.parent.scaling.z)return!0;t=t.parent}return!1},t.prototype._t=function(){this.At.position.subtractToRef(this.wt.position,this.k),n.Vector3.FromFloatArrayToRef(this.wt.getWorldMatrix().asArray(),8,this._);var t=n.Vector3.Dot(this.k,this._)/this._.length(),i=Math.abs(t/this.R);n.Vector3.FromFloatsToRef(i,i,i,this.At.scaling)},t.prototype.Nt=function(){var t=Math.atan(this.T.y/this.T.z);this.T.z>=0?this.Jt.rotation.x=-t:this.Jt.rotation.x=-t-Math.PI;var i=Math.atan(this.T.x/this.T.z);this.T.z>=0?this.Kt.rotation.y=i:this.Kt.rotation.y=i+Math.PI;var h=Math.atan(this.T.x/this.T.y);this.T.y>=0?this.Ut.rotation.z=-h:this.Ut.rotation.z=-h-Math.PI},t.prototype.Pt=function(t,i,h){var s=this.T;t.rotation.x=0,t.rotation.y=0,t.rotation.z=0,i.rotation.x=0,i.rotation.y=0,i.rotation.z=0,h.rotation.x=0,h.rotation.y=0,h.rotation.z=0,s.x<=0&&s.y>=0&&s.z>=0?(t.rotation.z=3.14,h.rotation.y=3.14):s.x<=0&&s.y>=0&&s.z<=0?(t.rotation.y=3.14,i.rotation.y=3.14,h.rotation.y=3.14):s.x>=0&&s.y>=0&&s.z<=0?(t.rotation.x=3.14,i.rotation.y=3.14):s.x>=0&&s.y<=0&&s.z>=0?(i.rotation.z=3.14,h.rotation.x=3.14):s.x<=0&&s.y<=0&&s.z>=0?(t.rotation.z=3.14,i.rotation.z=3.14,h.rotation.z=3.14):s.x<=0&&s.y<=0&&s.z<=0?(t.rotation.y=3.14,i.rotation.x=3.14,h.rotation.z=3.14):s.x>=0&&s.y<=0&&s.z<=0&&(t.rotation.x=3.14,i.rotation.x=3.14,h.rotation.x=3.14)},t.prototype.switchTo=function(t,i){t.computeWorldMatrix(!0),this.Mt=t,null!=i&&(this.st=i),this.Yt(),this.yt(t),this.bt=new e(t,10),this.refreshBoundingInfo()},t.prototype.setUndoCount=function(t){this.bt.setCapacity(t)},t.prototype.undo=function(){var t=this.bt.undo();this.Mt.computeWorldMatrix(!0),this.yt(this.Mt),this.Vt(t),this.Wt(t),this.$t(t)},t.prototype.redo=function(){var t=this.bt.redo();this.Mt.computeWorldMatrix(!0),this.yt(this.Mt),this.Vt(t),this.Wt(t),this.$t(t)},t.prototype.detach=function(){this.Xt.removeEventListener("pointerdown",this.zt,!1),this.Xt.removeEventListener("pointerup",this.Ct,!1),this.Xt.removeEventListener("pointermove",this.St,!1),this.Zt.unregisterBeforeRender(this.Tt),this.removeAllActionListeners(),this.ti()},t.prototype.hide=function(){this.N=!0,this.ut?(this.q="T",this.disableTranslation()):this.et?(this.q="R",this.disableRotation()):this.rt&&(this.q="S",this.disableScaling()),this.ii()},t.prototype.ii=function(){this.hi.visibility=0,this.si.visibility=0,this.ni.visibility=0},t.prototype.ui=function(){this.hi.visibility=this.S,this.si.visibility=this.S,this.ni.visibility=this.S},t.prototype.show=function(){this.N=!1,this.ui(),"T"==this.q?this.enableTranslation():"R"==this.q?this.enableRotation():"S"==this.q&&this.enableScaling()},t.prototype.isHidden=function(){return this.N},t.prototype.ti=function(){this.At.dispose(),this.ei(),this.bt=null},t.prototype.addActionListener=function(t){this.P=t},t.prototype.removeActionListener=function(){this.P=null},t.prototype.addActionStartListener=function(t){this.B=t},t.prototype.removeActionStartListener=function(){this.B=null},t.prototype.addActionEndListener=function(t){this.D=t},t.prototype.removeActionEndListener=function(){this.D=null},t.prototype.removeAllActionListeners=function(){this.P=null,this.B=null,this.D=null},t.prototype.Et=function(t){var i=this;if(t.preventDefault(),this.F=!0,0==t.button){var h=this.Zt.pick(this.Zt.pointerX,this.Zt.pointerY,function(t){if(i.ut){if(t==i.ri||t==i.fi||t==i.oi||t==i.Qt||t==i.Bt||t==i.Dt||t==i.li)return!0}else if(i.et){if(t==i.Jt||t==i.Kt||t==i.Ut||t==i.ai)return!0}else if(i.rt&&(t==i.ci||t==i.vi||t==i.Mi||t==i.Ft||t==i.Gt||t==i.Ht||t==i.wi))return!0;return!1},null,this.wt);if(h.hit){this.Xi=h.pickedMesh;var s=this.Xi.getChildren();s.length>0?s[0].visibility=this.S:this.Xi.visibility=this.S;var n=this.Xi.name;"X"==n?this.Yi.visibility=1:"Y"==n?this.Zi.visibility=1:"Z"==n?this.bi.visibility=1:"XZ"==n?(this.Yi.visibility=1,this.bi.visibility=1):"ZY"==n?(this.bi.visibility=1,this.Zi.visibility=1):"YX"==n?(this.Zi.visibility=1,this.Yi.visibility=1):"ALL"==n&&(this.Yi.visibility=1,this.Zi.visibility=1,this.bi.visibility=1),this.di(!0),this.pi=this.yi(this.Xi),null!=this.pi?this.Ai=this.Li():this.Ai=null,window.setTimeout(function(t,h){return i.ji(t,h)},0,this.wt,this.Xt)}}},t.prototype.di=function(t){this.H=t,t?(this.xi(),this.mi==s.ROT&&(this.nt=0),this.Vt(this.mi)):this.$t(this.mi)},t.prototype.isEditing=function(){return this.H},t.prototype.ji=function(t,i){var h=i;t.detachControl(h)},t.prototype.isPointerOver=function(){return this.G},t.prototype.zi=function(){var t=this,i=this.Zt.pick(this.Zt.pointerX,this.Zt.pointerY,function(i){if(t.ut){if(i==t.ri||i==t.fi||i==t.oi||i==t.Qt||i==t.Bt||i==t.Dt||i==t.li)return!0}else if(t.et){if(i==t.Jt||i==t.Kt||i==t.Ut||i==t.ai)return!0}else if(t.rt&&(i==t.ci||i==t.vi||i==t.Mi||i==t.Ft||i==t.Gt||i==t.Ht||i==t.wi))return!0;return!1},null,this.wt);if(i.hit){if(i.pickedMesh!=this.Ei){if(this.G=!0,this.Ci(),this.Ei=i.pickedMesh,this.et)this.Oi=this.Ei.getChildren()[0].color,this.Ei.getChildren()[0].color=n.Color3.White();else{var h=this.Ei.getChildren();h.length>0?(this.Si=h[0].material,h[0].material=this.gi):(this.Si=this.Ei.material,this.Ei.material=this.gi)}"X"==this.Ei.name?this.hi.color=n.Color3.White():"Y"==this.Ei.name?this.si.color=n.Color3.White():"Z"==this.Ei.name&&(this.ni.color=n.Color3.White())}}else this.G=!1,null!=this.Ei&&(this.Ti(this.Ei),this.Ei=null)},t.prototype.Ci=function(){null!=this.Ei&&(this.Ei.visibility=0,this.Ti(this.Ei))},t.prototype.Ti=function(t){switch(t.name){case"X":this.hi.color=n.Color3.Red();break;case"Y":this.si.color=n.Color3.Green();break;case"Z":this.ni.color=n.Color3.Blue()}if(this.et)t.getChildren()[0].color=this.Oi;else{var i=t.getChildren();i.length>0?i[0].material=this.Si:t.material=this.Si}},t.prototype.Ot=function(t){this.F=!1,this.H&&(this.wt.attachControl(this.Xt),this.di(!1),this.Ri(),null!=this.Ei&&(this.Ti(this.Ei),this.Ei=null),this.bt.add(this.mi))},t.prototype.xi=function(){this.ut?this.mi=s.TRANS:this.et?this.mi=s.ROT:this.rt&&(this.mi=s.SCALE)},t.prototype.Wt=function(t){null!=this.P&&this.P(t)},t.prototype.Vt=function(t){null!=this.B&&this.B(t)},t.prototype.$t=function(t){null!=this.D&&this.D(t)},t.prototype.gt=function(t){if(this.F){if(this.H&&null!=this.Ai){var i=this.Li();if(null!=i){if(this.et)this.ki(this.Mt,this.Xi,i,this.Ai);else{var h=i.subtract(this.Ai);if(0==h.x&&0==h.y&&0==h.z)return;this.ut?this._i(h):this.rt&&this.u&&this.qi(h)}this.Ai=i,this.Wt(this.mi)}}}else this.zi()},t.prototype.yi=function(t){var i=t.name;if(this.ut||this.rt){if("XZ"==i)return this.Ni;if("ZY"==i)return this.Pi;if("YX"==i)return this.Qi;if("ALL"==i)return this.qt;this.At.getWorldMatrix().invertToRef(this.g),n.Vector3.TransformCoordinatesToRef(this.wt.position,this.g,this.T);var h=this.T;if("X"===i)return Math.abs(h.y)>Math.abs(h.z)?this.Ni:this.Qi;if("Z"===i)return Math.abs(h.y)>Math.abs(h.x)?this.Ni:this.Pi;if("Y"===i)return Math.abs(h.z)>Math.abs(h.x)?this.Qi:this.Pi}else{if(!this.et)return null;this.I=!1,this.At.getWorldMatrix().invertToRef(this.g),n.Vector3.TransformCoordinatesToRef(this.wt.position,this.g,this.T);h=this.T;switch(i){case"X":return Math.abs(h.x)<.2?(this.I=!0,this.qt):this.Pi;case"Y":return Math.abs(h.y)<.2?(this.I=!0,this.qt):this.Ni;case"Z":return Math.abs(h.z)<.2?(this.I=!0,this.qt):this.Qi;default:return this.qt}}},t.prototype._i=function(t){null!=this.Mt.parent&&this.It(this.Mt)?this.yt(this.At):this.yt(this.Mt);var i=this.Xi.name;"ALL"==i?this.J=t:(this.J.x=0,this.J.y=0,this.J.z=0,"X"!=i&&"XZ"!=i&&"YX"!=i||(this.u?this.J.x=n.Vector3.Dot(t,this.tt)/this.tt.length():this.J.x=t.x),"Y"!=i&&"ZY"!=i&&"YX"!=i||(this.u?this.J.y=n.Vector3.Dot(t,this.it)/this.it.length():this.J.y=t.y),"Z"!=i&&"XZ"!=i&&"ZY"!=i||(this.u?this.J.z=n.Vector3.Dot(t,this.ht)/this.ht.length():this.J.z=t.z)),this.Bi(this.Mt,this.J,this.u),this.Di&&(this.Mt.position.x=Math.max(this.Mt.position.x,this.Di.x),this.Mt.position.y=Math.max(this.Mt.position.y,this.Di.y),this.Mt.position.z=Math.max(this.Mt.position.z,this.Di.z)),this.Fi&&(this.Mt.position.x=Math.min(this.Mt.position.x,this.Fi.x),this.Mt.position.y=Math.min(this.Mt.position.y,this.Fi.y),this.Mt.position.z=Math.min(this.Mt.position.z,this.Fi.z)),this.Mt.computeWorldMatrix(!0)},t.prototype.Bi=function(t,i,h){if(this.v){var s=!1;if(this.K.addInPlace(i),Math.abs(this.K.x)>this.ot.x&&(this.K.x>0?i.x=this.ot.x:i.x=-this.ot.x,s=!0),Math.abs(this.K.y)>this.ot.y&&(this.K.y>0?i.y=this.ot.y:i.y=-this.ot.y,s=!0),Math.abs(this.K.z)>this.ot.z&&(this.K.z>0?i.z=this.ot.z:i.z=-this.ot.z,s=!0),!s)return;Math.abs(i.x)!==this.ot.x&&(i.x=0),Math.abs(i.y)!==this.ot.y&&(i.y=0),Math.abs(i.z)!==this.ot.z&&(i.z=0),n.Vector3.FromFloatsToRef(0,0,0,this.K),s=!1}h?(this.tt.normalizeToRef(this.lt),this.it.normalizeToRef(this.at),this.ht.normalizeToRef(this.ct),this.Mt.translate(this.lt,i.x,n.Space.WORLD),this.Mt.translate(this.at,i.y,n.Space.WORLD),this.Mt.translate(this.ct,i.z,n.Space.WORLD)):null==this.Mt.parent?this.Mt.position.addInPlace(i):this.Mt.setAbsolutePosition(i.addInPlace(this.Mt.absolutePosition))},t.prototype.qi=function(t){this.yt(this.Mt),this.$.x=0,this.$.y=0,this.$.z=0;var i=this.Xi.name;"X"!=i&&"XZ"!=i&&"YX"!=i||(this.$.x=n.Vector3.Dot(t,this.tt)/this.tt.length(),this.Mt.scaling.x<0&&(this.$.x=-this.$.x)),"Y"!=i&&"ZY"!=i&&"YX"!=i||(this.$.y=n.Vector3.Dot(t,this.it)/this.it.length(),this.Mt.scaling.y<0&&(this.$.y=-this.$.y)),"Z"!=i&&"XZ"!=i&&"ZY"!=i||(this.$.z=n.Vector3.Dot(t,this.ht)/this.ht.length(),this.Mt.scaling.z<0&&(this.$.z=-this.$.z));var h=this.dt;if(this.$.x=this.$.x/h.x,this.$.y=this.$.y/h.y,this.$.z=this.$.z/h.z,"ALL"==i){var s=n.Vector3.Dot(t,this.wt.upVector);s/=Math.max(h.x,h.y,h.z),this.$.copyFromFloats(s,s,s)}else{var u=!1;if("XZ"==i?(u=!0,Math.abs(this.$.x)>Math.abs(this.$.z)?this.$.z=this.$.x:this.$.x=this.$.z):"ZY"==i?(u=!0,Math.abs(this.$.z)>Math.abs(this.$.y)?this.$.y=this.$.z:this.$.z=this.$.y):"YX"==i&&(u=!0,Math.abs(this.$.y)>Math.abs(this.$.x)?this.$.x=this.$.y:this.$.y=this.$.x),u){this.At.position.subtractToRef(this.wt.position,this.k);s=n.Vector3.Dot(t,this.k);this.$.x=Math.abs(this.$.x),this.$.y=Math.abs(this.$.y),this.$.z=Math.abs(this.$.z),s>0?(this.Mt.scaling.x>0&&(this.$.x=-this.$.x),this.Mt.scaling.y>0&&(this.$.y=-this.$.y),this.Mt.scaling.z>0&&(this.$.z=-this.$.z)):(this.Mt.scaling.x<0&&(this.$.x=-this.$.x),this.Mt.scaling.y<0&&(this.$.y=-this.$.y),this.Mt.scaling.z<0&&(this.$.z=-this.$.z))}}this.Gi(this.Mt,this.$),this.Hi&&(this.Mt.scaling.x=Math.max(this.Mt.scaling.x,this.Hi.x),this.Mt.scaling.y=Math.max(this.Mt.scaling.y,this.Hi.y),this.Mt.scaling.z=Math.max(this.Mt.scaling.z,this.Hi.z)),this.Ii&&(this.Mt.scaling.x=Math.min(this.Mt.scaling.x,this.Ii.x),this.Mt.scaling.y=Math.min(this.Mt.scaling.y,this.Ii.y),this.Mt.scaling.z=Math.min(this.Mt.scaling.z,this.Ii.z))},t.prototype.Gi=function(t,i){if(this.U){var h=!1;if(this.V.addInPlace(i),Math.abs(this.V.x)>this.W&&(i.x>0?i.x=this.W:i.x=-this.W,h=!0),Math.abs(this.V.y)>this.W&&(i.y>0?i.y=this.W:i.y=-this.W,h=!0),Math.abs(this.V.z)>this.W&&(i.z>0?i.z=this.W:i.z=-this.W,h=!0),!h)return;Math.abs(i.x)!==this.W&&0!==i.x&&(i.x=0),Math.abs(i.y)!==this.W&&0!==i.y&&(i.y=0),Math.abs(i.z)!==this.W&&0!==i.z&&(i.z=0),n.Vector3.FromFloatsToRef(0,0,0,this.V),h=!1}t.scaling.addInPlace(i)},t.prototype.yt=function(t){var i=t.getWorldMatrix();n.Vector3.FromFloatArrayToRef(i.m,0,this.tt),n.Vector3.FromFloatArrayToRef(i.m,4,this.it),n.Vector3.FromFloatArrayToRef(i.m,8,this.ht)},t.prototype.pt=function(t){var i=t.getBoundingInfo().boundingBox,h=i.maximum.subtract(i.minimum);return 0==h.x&&(h.x=1),0==h.y&&(h.y=1),0==h.z&&(h.z=1),h},t.prototype.refreshBoundingInfo=function(){this.dt=this.pt(this.Mt)},t.prototype.ki=function(t,i,h,s){this.u&&null!=this.Mt.parent&&this.It(t)?this.yt(this.At):this.yt(t);var u,e=0;i==this.Jt?u=this.u?this.tt:n.Axis.X:i==this.Kt?u=this.u?this.it:n.Axis.Y:i==this.Ut&&(u=this.u?this.ht:n.Axis.Z),this.At.position.subtractToRef(this.wt.position,this.k),this.I?(e=this.Ji(s,h,this.wt.position,this.k,u),this.Zt.useRightHandedSystem&&(e=-e)):e=this.Ki(s,h,t.getAbsolutePivotPoint(),this.k),this.M&&(this.nt+=e,e=0,Math.abs(this.nt)>=this.L&&(e=this.nt>0?this.L:-this.L,this.nt=0)),0!==e&&(this.k.normalize(),i==this.ai?t.rotate(this.k,-e,n.Space.WORLD):(n.Vector3.Dot(u,this.k)>=0&&(e=-e),t.rotate(u,e,n.Space.WORLD)),this.st&&(t.rotation=t.rotationQuaternion.toEulerAngles(),t.rotationQuaternion=null),this.u&&null!=this.Mt.parent&&this.It(t)&&(i==this.ai?this.At.rotate(this.k,-e,n.Space.WORLD):this.At.rotate(u,e,n.Space.WORLD)))},t.prototype.Li=function(){var t=this,i=this.Zt.pick(this.Zt.pointerX,this.Zt.pointerY,function(i){return i==t.pi},null,this.wt);return i.hit?i.pickedPoint:null},t.prototype.Ri=function(){this.Yi.visibility=0,this.Zi.visibility=0,this.bi.visibility=0},t.prototype.Ui=function(t){this.ut&&(this.Vi.visibility=t,this.Wi.visibility=t,this.$i.visibility=t,this.th.visibility=t,this.ih.visibility=t,this.hh.visibility=t,this.sh.visibility=t),this.et&&(this.nh.visibility=t,this.uh.visibility=t,this.eh.visibility=t,this.rh.visibility=t),this.rt&&(this.fh.visibility=t,this.oh.visibility=t,this.lh.visibility=t,this.ah.visibility=t,this.vh.visibility=t,this.Mh.visibility=t,this.wh.visibility=t)},t.prototype.getRotationQuaternion=function(){return this.At.rotationQuaternion},t.prototype.getPosition=function(){return this.At.position},t.prototype.isTranslationEnabled=function(){return this.ut},t.prototype.enableTranslation=function(){null==this.ri&&(this.Xh(),this.Yh.parent=this.At),this.Ci(),this.ut||(this.Vi.visibility=this.S,this.Wi.visibility=this.S,this.$i.visibility=this.S,this.th.visibility=this.S,this.ih.visibility=this.S,this.hh.visibility=this.S,this.sh.visibility=this.S,this.ut=!0,this.disableRotation(),this.disableScaling())},t.prototype.disableTranslation=function(){this.ut&&(this.Vi.visibility=0,this.Wi.visibility=0,this.$i.visibility=0,this.th.visibility=0,this.ih.visibility=0,this.hh.visibility=0,this.sh.visibility=0,this.ut=!1)},t.prototype.isRotationEnabled=function(){return this.et},t.prototype.returnEuler=function(t){this.st=t},t.prototype.enableRotation=function(){null==this.Zh&&(this.bh(),this.Zh.parent=this.At),this.Ci(),this.et||(this.nh.visibility=this.S,this.uh.visibility=this.S,this.eh.visibility=this.S,this.rh.visibility=this.S,this.dh.visibility=this.S,this.et=!0,this.disableTranslation(),this.disableScaling())},t.prototype.disableRotation=function(){this.et&&(this.nh.visibility=0,this.uh.visibility=0,this.eh.visibility=0,this.rh.visibility=0,this.dh.visibility=0,this.et=!1)},t.prototype.isScalingEnabled=function(){return this.rt},t.prototype.enableScaling=function(){null==this.ci&&(this.ph(),this.yh.parent=this.At),this.Ci(),this.rt||(this.fh.visibility=this.S,this.oh.visibility=this.S,this.lh.visibility=this.S,this.ah.visibility=this.S,this.vh.visibility=this.S,this.Mh.visibility=this.S,this.wh.visibility=this.S,this.rt=!0,this.disableTranslation(),this.disableRotation())},t.prototype.disableScaling=function(){this.rt&&(this.fh.visibility=0,this.oh.visibility=0,this.lh.visibility=0,this.ah.visibility=0,this.vh.visibility=0,this.Mh.visibility=0,this.wh.visibility=0,this.rt=!1)},t.prototype.setScaleBounds=function(t,i){this.Hi=t||null,this.Ii=i||null,null!=this.Hi&&(0==this.Hi.x&&(this.Hi.x=1e-8),0==this.Hi.y&&(this.Hi.y=1e-8),0==this.Hi.z&&(this.Hi.z=1e-8))},t.prototype.removeScaleBounds=function(){this.Hi=null,this.Ii=null},t.prototype.setTransBounds=function(t,i){this.Di=t||null,this.Fi=i||null},t.prototype.removeTransBounds=function(){this.Di=null,this.Fi=null},t.prototype.setRotBounds=function(t,i){this.Ah=t||null,this.Lh=i||null},t.prototype.removeRotBounds=function(){this.Ah=null,this.Lh=null},t.prototype.jt=function(){var t=new n.Mesh("guideCtl",this.Zt);this.Yi=n.Mesh.CreateLines("bxAxis",[new n.Vector3(-100,0,0),new n.Vector3(100,0,0)],this.Zt),this.Zi=n.Mesh.CreateLines("byAxis",[new n.Vector3(0,-100,0),new n.Vector3(0,100,0)],this.Zt),this.bi=n.Mesh.CreateLines("bzAxis",[new n.Vector3(0,0,-100),new n.Vector3(0,0,100)],this.Zt),this.Yi.isPickable=!1,this.Zi.isPickable=!1,this.bi.isPickable=!1,this.Yi.parent=t,this.Zi.parent=t,this.bi.parent=t,this.Yi.color=n.Color3.Red(),this.Zi.color=n.Color3.Green(),this.bi.color=n.Color3.Blue(),this.Ri();var i=this.j*this.C*.75;return this.hi=n.Mesh.CreateLines("xAxis",[new n.Vector3(0,0,0),new n.Vector3(i,0,0)],this.Zt),this.si=n.Mesh.CreateLines("yAxis",[new n.Vector3(0,0,0),new n.Vector3(0,i,0)],this.Zt),this.ni=n.Mesh.CreateLines("zAxis",[new n.Vector3(0,0,0),new n.Vector3(0,0,i)],this.Zt),this.hi.isPickable=!1,this.si.isPickable=!1,this.ni.isPickable=!1,this.hi.parent=t,this.si.parent=t,this.ni.parent=t,this.hi.color=n.Color3.Red(),this.si.color=n.Color3.Green(),this.ni.color=n.Color3.Blue(),this.hi.renderingGroupId=1,this.si.renderingGroupId=1,this.ni.renderingGroupId=1,t},t.prototype.xt=function(){this.qt=n.Mesh.CreatePlane("pALL",5,this.Zt),this.Ni=n.Mesh.CreatePlane("pXZ",5,this.Zt),this.Pi=n.Mesh.CreatePlane("pZY",5,this.Zt),this.Qi=n.Mesh.CreatePlane("pYX",5,this.Zt),this.qt.isPickable=!1,this.Ni.isPickable=!1,this.Pi.isPickable=!1,this.Qi.isPickable=!1,this.qt.visibility=0,this.Ni.visibility=0,this.Pi.visibility=0,this.Qi.visibility=0,this.qt.renderingGroupId=1,this.Ni.renderingGroupId=1,this.Pi.renderingGroupId=1,this.Qi.renderingGroupId=1,this.qt.lookAt(this.wt.position),this.Ni.rotate(n.Axis.X,1.57),this.Pi.rotate(n.Axis.Y,1.57);var t=new n.Mesh("pickPlanes",this.Zt);return this.qt.parent=t,this.Ni.parent=t,this.Pi.parent=t,this.Qi.parent=t,t},t.prototype.Xh=function(){var t=2*this.O*this.C,i=this.j*this.C;this.Yh=new n.Mesh("tarnsCtl",this.Zt),this.ri=this.jh(t/2,i),this.ri.name="X",this.fi=this.ri.clone("Y"),this.oi=this.ri.clone("Z"),this.Qt=n.MeshBuilder.CreatePlane("XZ",{size:2*t},this.Zt),this.Bt=n.MeshBuilder.CreatePlane("ZY",{size:2*t},this.Zt),this.Dt=n.MeshBuilder.CreatePlane("YX",{size:2*t},this.Zt),this.Qt.rotation.x=1.57,this.Bt.rotation.y=-1.57,this.Qt.position.x=t,this.Qt.position.z=t,this.Bt.position.z=t,this.Bt.position.y=t,this.Dt.position.y=t,this.Dt.position.x=t,this.Qt.bakeCurrentTransformIntoVertices(),this.Bt.bakeCurrentTransformIntoVertices(),this.Dt.bakeCurrentTransformIntoVertices(),this.li=n.Mesh.CreateBox("ALL",2*t,this.Zt),this.ri.parent=this.Yh,this.fi.parent=this.Yh,this.oi.parent=this.Yh,this.Qt.parent=this.Yh,this.Bt.parent=this.Yh,this.Dt.parent=this.Yh,this.li.parent=this.Yh,this.ri.rotation.y=1.57,this.fi.rotation.x-=1.57,this.ri.visibility=0,this.fi.visibility=0,this.oi.visibility=0,this.Qt.visibility=0,this.Bt.visibility=0,this.Dt.visibility=0,this.li.visibility=0,this.ri.isPickable=!1,this.fi.isPickable=!1,this.oi.isPickable=!1,this.Qt.isPickable=!1,this.Bt.isPickable=!1,this.Dt.isPickable=!1,this.li.isPickable=!1;var h=i/5,s=t;this.Vi=n.Mesh.CreateCylinder("tEndX",h,0,s,6,1,this.Zt),this.Wi=this.Vi.clone("tEndY"),this.$i=this.Vi.clone("tEndZ"),this.th=this.xh("XZ",1.75*s,this.Zt),this.ih=this.th.clone("ZY"),this.hh=this.th.clone("YX"),this.sh=n.MeshBuilder.CreatePolyhedron("tEndAll",{type:1,size:s/2},this.Zt),this.Vi.rotation.x=1.57,this.Wi.rotation.x=1.57,this.$i.rotation.x=1.57,this.ih.rotation.z=1.57,this.hh.rotation.x=-1.57,this.th.position.x=t,this.th.position.z=t,this.ih.position.z=t,this.ih.position.y=t,this.hh.position.y=t,this.hh.position.x=t,this.Vi.parent=this.ri,this.Wi.parent=this.fi,this.$i.parent=this.oi,this.th.parent=this.Qt,this.ih.parent=this.Bt,this.hh.parent=this.Dt,this.sh.parent=this.li,this.Vi.position.z=i-h/2,this.Wi.position.z=i-h/2,this.$i.position.z=i-h/2,this.Vi.material=this.mh,this.Wi.material=this.zh,this.$i.material=this.Eh,this.th.material=this.zh,this.ih.material=this.mh,this.hh.material=this.Eh,this.sh.material=this.Ch,this.Vi.renderingGroupId=2,this.Wi.renderingGroupId=2,this.$i.renderingGroupId=2,this.th.renderingGroupId=2,this.ih.renderingGroupId=2,this.hh.renderingGroupId=2,this.sh.renderingGroupId=2,this.Vi.isPickable=!1,this.Wi.isPickable=!1,this.$i.isPickable=!1,this.th.isPickable=!1,this.ih.isPickable=!1,this.hh.isPickable=!1,this.sh.isPickable=!1},t.prototype.xh=function(t,i,h){console.log("_createTriangle "+i);var s=new n.Path2(i/2,-i/2).addLineTo(i/2,i/2).addLineTo(-i/2,i/2).addLineTo(i/2,-i/2);return new n.PolygonMeshBuilder(t,s,h).build()},t.prototype.setRotGuideFull=function(t){this.ft=t?360:180,null!=this.Zh&&(this.Zh.dispose(),this.ai.dispose(),this.Zh=null,this.enableRotation())},t.prototype.bh=function(){var t=this.j*this.C*2;this.Zh=new n.Mesh("rotCtl",this.Zt),this.Jt=this.Oh(t/2,this.ft),this.Jt.name="X",this.Kt=this.Oh(t/2,this.ft),this.Kt.name="Y",this.Ut=this.Oh(t/2,this.ft),this.Ut.name="Z",this.ai=this.Oh(t/1.75,360),this.ai.name="ALL",this.Jt.rotation.z=1.57,this.Ut.rotation.x=-1.57,this.Jt.bakeCurrentTransformIntoVertices(),this.Ut.bakeCurrentTransformIntoVertices(),this.ai.rotation.x=1.57,this.Jt.parent=this.Zh,this.Kt.parent=this.Zh,this.Ut.parent=this.Zh,this.ai.parent=this.qt,this.Jt.visibility=0,this.Kt.visibility=0,this.Ut.visibility=0,this.ai.visibility=0,this.Jt.isPickable=!1,this.Kt.isPickable=!1,this.Ut.isPickable=!1,this.ai.isPickable=!1;var i=t;this.nh=this.Sh(i/2,this.ft,!1),this.uh=this.nh.clone(""),this.eh=this.nh.clone(""),this.rh=this.Sh(i/1.75,360,!1),this.dh=this.Sh(i/2,360,!1),this.nh.parent=this.Jt,this.uh.parent=this.Kt,this.eh.parent=this.Ut,this.nh.rotation.z=1.57,this.eh.rotation.x=-1.57,this.rh.parent=this.ai,this.dh.parent=this.ai,this.nh.color=n.Color3.Red(),this.uh.color=n.Color3.Green(),this.eh.color=n.Color3.Blue(),this.rh.color=n.Color3.Yellow(),this.dh.color=n.Color3.Gray(),this.nh.renderingGroupId=2,this.uh.renderingGroupId=2,this.eh.renderingGroupId=2,this.rh.renderingGroupId=2,this.dh.renderingGroupId=2,this.nh.isPickable=!1,this.uh.isPickable=!1,this.eh.isPickable=!1,this.rh.isPickable=!1,this.dh.isPickable=!1},t.prototype.jh=function(t,i){var h=[new n.Vector3(t,t,0),new n.Vector3(-t,t,0),new n.Vector3(-t,-t,0),new n.Vector3(t,-t,0),new n.Vector3(t,t,0)],s=[new n.Vector3(0,0,0),new n.Vector3(0,0,i)];return n.Mesh.ExtrudeShape("",h,s,1,0,2,this.Zt)},t.prototype.Sh=function(t,i,h){null===i&&(i=360);for(var s,u,e=[],r=3.14/180,f=0,o=0;o<=i;o+=5)s=t*Math.cos(o*r),u=90==o?t:270==o?-t:t*Math.sin(o*r),e[f]=new n.Vector3(s,0,u),f++;if(h){t-=.04;for(o=0;o<=i;o+=5)s=t*Math.cos(o*r),u=90==o?t:270==o?-t:t*Math.sin(o*r),e[f]=new n.Vector3(s,0,u),f++}return n.Mesh.CreateLines("",e,this.Zt)},t.prototype.Oh=function(t,i){null===i&&(i=360);for(var h,s,u=[],e=3.14/180,r=0,f=0;f<=i;f+=30)h=t*Math.cos(f*e),s=90==f?t:270==f?-t:t*Math.sin(f*e),u[r]=new n.Vector3(h,0,s),r++;return n.Mesh.CreateTube("",u,this.O*this.C*2,3,null,n.Mesh.NO_CAP,this.Zt)},t.prototype.ph=function(){var t=2*this.O*this.C,i=this.j*this.C;this.yh=new n.Mesh("sCtl",this.Zt),this.ci=this.jh(t/2,i),this.ci.name="X",this.vi=this.ci.clone("Y"),this.Mi=this.ci.clone("Z"),this.Ft=n.MeshBuilder.CreatePlane("XZ",{size:2*t},this.Zt),this.Gt=n.MeshBuilder.CreatePlane("ZY",{size:2*t},this.Zt),this.Ht=n.MeshBuilder.CreatePlane("YX",{size:2*t},this.Zt),this.Ft.rotation.x=1.57,this.Gt.rotation.y=-1.57,this.Ft.position.x=t,this.Ft.position.z=t,this.Gt.position.z=t,this.Gt.position.y=t,this.Ht.position.y=t,this.Ht.position.x=t,this.Ft.bakeCurrentTransformIntoVertices(),this.Gt.bakeCurrentTransformIntoVertices(),this.Ht.bakeCurrentTransformIntoVertices(),this.wi=n.Mesh.CreateBox("ALL",2*t,this.Zt),this.ci.parent=this.yh,this.vi.parent=this.yh,this.Mi.parent=this.yh,this.wi.parent=this.yh,this.Ft.parent=this.yh,this.Gt.parent=this.yh,this.Ht.parent=this.yh,this.ci.rotation.y=1.57,this.vi.rotation.x-=1.57,this.ci.visibility=0,this.vi.visibility=0,this.Mi.visibility=0,this.Ft.visibility=0,this.Gt.visibility=0,this.Ht.visibility=0,this.wi.visibility=0,this.ci.isPickable=!1,this.vi.isPickable=!1,this.Mi.isPickable=!1,this.Ft.isPickable=!1,this.Gt.isPickable=!1,this.Ht.isPickable=!1,this.wi.isPickable=!1;var h=t;this.fh=n.Mesh.CreateBox("",h,this.Zt),this.oh=this.fh.clone(""),this.lh=this.fh.clone(""),this.ah=this.xh("XZ",1.75*h,this.Zt),this.vh=this.ah.clone("ZY"),this.Mh=this.ah.clone("YX"),this.wh=n.MeshBuilder.CreatePolyhedron("sEndAll",{type:1,size:h/2},this.Zt),this.vh.rotation.z=1.57,this.Mh.rotation.x=-1.57,this.ah.position.x=t,this.ah.position.z=t,this.vh.position.z=t,this.vh.position.y=t,this.Mh.position.y=t,this.Mh.position.x=t,this.fh.parent=this.ci,this.oh.parent=this.vi,this.lh.parent=this.Mi,this.ah.parent=this.Ft,this.vh.parent=this.Gt,this.Mh.parent=this.Ht,this.wh.parent=this.wi,this.fh.position.z=i-h/2,this.oh.position.z=i-h/2,this.lh.position.z=i-h/2,this.fh.material=this.mh,this.oh.material=this.zh,this.lh.material=this.Eh,this.ah.material=this.zh,this.vh.material=this.mh,this.Mh.material=this.Eh,this.wh.material=this.Ch,this.fh.renderingGroupId=2,this.oh.renderingGroupId=2,this.lh.renderingGroupId=2,this.ah.renderingGroupId=2,this.vh.renderingGroupId=2,this.Mh.renderingGroupId=2,this.wh.renderingGroupId=2,this.fh.isPickable=!1,this.oh.isPickable=!1,this.lh.isPickable=!1,this.ah.isPickable=!1,this.vh.isPickable=!1,this.Mh.isPickable=!1,this.wh.isPickable=!1},t.prototype.gh=function(t){var i=n.Vector3.Cross(this.tt,this.it);return n.Vector3.Dot(i,this.ht)<0},t.prototype.setVisibility=function(t){this.S=t},t.prototype.setLocal=function(t){this.u!=t&&(this.u=t,t||(this.At.rotationQuaternion=n.Quaternion.Identity()))},t.prototype.isLocal=function(){return this.u},t.prototype.setTransSnap=function(t){this.v=t},t.prototype.setRotSnap=function(t){this.M=t},t.prototype.setScaleSnap=function(t){this.U=t},t.prototype.setTransSnapValue=function(t){this.ot.copyFromFloats(t,t,t),this.A=t},t.prototype.setRotSnapValue=function(t){this.L=t},t.prototype.setScaleSnapValue=function(t){this.W=t},t.prototype.Ji=function(t,i,h,s,u){var e=n.Vector3.Dot(s,u);u.scaleToRef(e,this.lt),h.addToRef(this.lt,this.at);var r=this.at;this.wt.getWorldMatrix().invertToRef(this.vt),n.Vector3.TransformCoordinatesToRef(this.at,this.vt,this.at);var f=0;r.x>=0&&r.y>=0?f=1:r.x<=0&&r.y>=0?f=2:r.x<=0&&r.y<=0?f=3:r.x>=0&&r.y<=0&&(f=4),n.Vector3.TransformCoordinatesToRef(t,this.vt,this.lt),n.Vector3.TransformCoordinatesToRef(i,this.vt,this.at),this.at.subtractInPlace(this.lt);var o=this.at,l=o.length(),a="";o.x>=0&&o.y>=0?a=o.x>=o.y?"r":"u":o.x<=0&&o.y>=0?a=-o.x>=o.y?"l":"u":o.x<=0&&o.y<=0?a=-o.x>=-o.y?"l":"d":o.x>=0&&o.y<=0&&(a=o.x>=-o.y?"r":"d");var c=0;return"d"==a?c=1==f||4==f?1:-1:"u"==a?c=1==f||4==f?-1:1:"r"==a?c=2==f||1==f?1:-1:"l"==a&&(c=2==f||1==f?-1:1),c*l},t.prototype.Ki=function(t,i,h,s){t.subtractToRef(h,this.lt),i.subtractToRef(h,this.at),n.Vector3.CrossToRef(this.lt,this.at,this.ct);var u=Math.asin(this.ct.length()/(this.lt.length()*this.at.length()));return n.Vector3.Dot(this.ct,s)>0&&(u*=-1),u},t.prototype.Lt=function(i){this.mh=t.Th("redMat",n.Color3.Red(),i),this.zh=t.Th("greenMat",n.Color3.Green(),i),this.Eh=t.Th("blueMat",n.Color3.Blue(),i),this.gi=t.Th("whiteMat",n.Color3.White(),i),this.Ch=t.Th("whiteMat",n.Color3.Yellow(),i)},t.prototype.ei=function(){this.mh.dispose(),this.zh.dispose(),this.Eh.dispose(),this.gi.dispose(),this.Ch.dispose()},t.Th=function(t,i,h){var s=new n.StandardMaterial(t,h);return s.emissiveColor=i,s.diffuseColor=n.Color3.Black(),s.specularColor=n.Color3.Black(),s.backFaceCulling=!1,s},t}(),e=function(){function t(t,i){this.lastMax=10,this.acts=new Array,this.last=-1,this.current=-1,this.mesh=t,this.lastMax=i-1,this.add()}return t.prototype.setCapacity=function(t){0!=t?(this.lastMax=t-1,this.last=-1,this.current=-1,this.acts=new Array,this.add()):console.error("capacity should be more than zero")},t.prototype.add=function(t){void 0===t&&(t=null);var i=new r(this.mesh,t);this.current<this.last&&(this.acts.splice(this.current+1),this.last=this.current),this.last==this.lastMax?(this.acts.shift(),this.acts.push(i)):(this.acts.push(i),this.last++,this.current++)},t.prototype.undo=function(){if(this.current>0){var t=this.acts[this.current].getActionType();return this.current--,this.acts[this.current].perform(this.mesh),t}},t.prototype.redo=function(){if(this.current<this.last)return this.current++,this.acts[this.current].perform(this.mesh),this.acts[this.current].getActionType()},t}(),r=function(){function t(t,i){this.Rh=t.position.clone(),null==t.rotationQuaternion?(this.kh=null,this._h=t.rotation.clone()):(this.kh=t.rotationQuaternion.clone(),this._h=null),this.qh=t.scaling.clone(),this.Nh=i}return t.prototype.getActionType=function(){return this.Nh},t.prototype.perform=function(t){t.position.copyFrom(this.Rh),null==t.rotationQuaternion?null!=this._h?t.rotation.copyFrom(this._h):t.rotation.copyFrom(this.kh.toEulerAngles()):null!=this.kh?t.rotationQuaternion.copyFrom(this.kh):t.rotationQuaternion.copyFrom(n.Quaternion.RotationYawPitchRoll(this._h.y,this._h.x,this._h.z)),t.scaling.copyFrom(this.qh)},t}()}])});
//# sourceMappingURL=EditControl.js.map

/***/ }),

/***/ "./node_modules/babylonjs/babylon.js":
/*!*******************************************!*\
  !*** ./node_modules/babylonjs/babylon.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/earcut/src/earcut.js":
/*!*******************************************!*\
  !*** ./node_modules/earcut/src/earcut.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = earcut;
module.exports.default = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode || outerNode.next === outerNode.prev) return triangles;

    var minX, minY, maxX, maxY, x, y, invSize;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 1 / invSize : 0;
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertex leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(ear, triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, invSize),
        maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);

    var p = ear.prevZ,
        n = ear.nextZ;

    // look for points inside the triangle in both directions
    while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;

        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    // look for remaining points in decreasing z-order
    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    // look for remaining points in increasing z-order
    while (n && n.z <= maxZ) {
        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return p;
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, invSize);
                earcutLinked(c, triangles, dim, minX, minY, invSize);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    }

    return m;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) * invSize;
    y = 32767 * (y - minY) * invSize;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
           locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    if ((equals(p1, q1) && equals(p2, q2)) ||
        (equals(p1, q2) && equals(p2, q1))) return true;
    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
           area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertex index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertex nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./tst/Test-EditControl.ts":
/*!*********************************!*\
  !*** ./tst/Test-EditControl.ts ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dist_EditControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dist/EditControl */ "./dist/EditControl.js");
/* harmony import */ var _dist_EditControl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dist_EditControl__WEBPACK_IMPORTED_MODULE_1__);


var box, box1, box2, box3;
var editControl, ec1, ec2, ec3;
//let camera;
window.onload = function () {
    main();
};
var main = function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Engine"](canvas, true);
    var scene = addScene(engine);
    var camera = addCamera(scene, canvas);
    addGrid(scene);
    addBoxes(scene);
    addEditControls(camera, canvas);
    setButtons(camera);
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener("resize", function () {
        engine.resize();
    });
};
var addScene = function (engine) {
    var scene = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Scene"](engine);
    scene.clearColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](0.75, 0.75, 0.75, 1);
    var light = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["HemisphericLight"]("light1", new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 1, 0), scene);
    light.intensity = .5;
    return scene;
};
var addCamera = function (scene, canvas) {
    var camera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["ArcRotateCamera"]("ArcRotateCamera", Math.PI / 4, Math.PI / 4, 20, new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0), scene);
    camera.wheelPrecision = 15;
    camera.setTarget(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero());
    camera.attachControl(canvas, false);
    return camera;
};
var addGrid = function (scene) {
    var ground = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateGround("ground1", 20, 20, 10, scene);
    var gridMaterial = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("Grid Material", scene);
    gridMaterial.wireframe = true;
    ground.material = gridMaterial;
};
var addBoxes = function (scene) {
    var mat1 = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("mat", scene);
    var mat2 = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("mat2", scene);
    var mat3 = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("mat3", scene);
    mat1.diffuseColor = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"].Red();
    mat2.diffuseColor = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"].Teal();
    mat3.diffuseColor = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"].Magenta();
    box1 = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreateBox("box1", { height: 5, width: 3, depth: 2 });
    box2 = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreateBox("box2", { height: 3, width: 2, depth: 1 });
    box3 = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreateBox("box3", { height: 2, width: 1, depth: 2 });
    box1.rotationQuaternion = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].Identity();
    box2.rotationQuaternion = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].Identity();
    box3.rotationQuaternion = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].Identity();
    box1.position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 1, 0);
    box2.position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-4, 0, 0);
    box3.position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-4, 0, 0);
    box1.material = mat1;
    box2.material = mat2;
    box3.material = mat3;
    box2.parent = box1;
    box3.parent = box2;
};
var addEditControls = function (camera, canvas) {
    ec1 = attachEditControl(box1, camera, canvas);
    ec2 = attachEditControl(box2, camera, canvas);
    ec3 = attachEditControl(box3, camera, canvas);
    box = box1;
    editControl = ec1;
};
var attachEditControl = function (mesh, camera, canvas) {
    mesh.rotationQuaternion = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Quaternion"].Identity();
    var ec = new _dist_EditControl__WEBPACK_IMPORTED_MODULE_1__["EditControl"](mesh, camera, canvas, 0.5, false);
    ec.enableTranslation();
    ec.setRotSnapValue(3.14 / 18);
    ec.setTransSnapValue(0.5);
    ec.setScaleSnapValue(0.25);
    ec.addActionStartListener(actionStartListener);
    ec.addActionListener(actionListener);
    ec.addActionEndListener(actionEndListener);
    return ec;
};
var actionStartListener = function (actionType) {
    if (actionType === 0) {
        console.log("translation started");
    }
    else if (actionType === 1) {
        console.log("rotation started");
    }
    else if (actionType === 2) {
        console.log("scaling started");
    }
};
var actionListener = function (actionType) {
    if (actionType === 0) {
        console.log("translating");
    }
    else if (actionType === 1) {
        //console.log("rotating");
    }
    else if (actionType === 2) {
        console.log("scaling");
    }
};
var actionEndListener = function (actionType) {
    if (actionType === 0) {
        console.log("translation done");
    }
    else if (actionType === 1) {
        console.log("rotation done");
    }
    else if (actionType === 2) {
        console.log("scaling done");
    }
};
var setButtons = function (camera) {
    var hideButton = document.getElementById("hide");
    hideButton.onclick = function () {
        if (editControl.isHidden()) {
            editControl.show();
        }
        else
            editControl.hide();
    };
    var transButton = document.getElementById("trans");
    var rotButton = document.getElementById("rotate");
    var scaleButton = document.getElementById("scale");
    transButton.onclick = function () {
        editControl.enableTranslation();
    };
    rotButton.onclick = function () {
        editControl.enableRotation();
    };
    scaleButton.onclick = function () {
        editControl.enableScaling();
        if (!editControl.isLocal()) {
            alert("Please note that you cannot scale in global mode");
        }
    };
    var snapTButton = document.getElementById("snaptrans");
    var snapRButton = document.getElementById("snaprot");
    var snapSButton = document.getElementById("snapscale");
    snapTButton.checked = false;
    snapRButton.checked = false;
    snapSButton.checked = false;
    snapTButton.onclick = function () {
        editControl.setTransSnap(snapTButton.checked);
    };
    snapRButton.onclick = function () {
        editControl.setRotSnap(snapRButton.checked);
    };
    snapSButton.onclick = function () {
        editControl.setScaleSnap(snapSButton.checked);
    };
    var boundTButton = document.getElementById("boundTrans");
    var boundRButton = document.getElementById("boundRot");
    var boundSButton = document.getElementById("boundScale");
    boundTButton.checked = false;
    boundRButton.checked = false;
    boundSButton.checked = false;
    boundTButton.onclick = function () {
        if (boundTButton.checked) {
            editControl.setTransBounds(new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-5, -5, -5), // min
            new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](5, 5, 5) // max
            );
        }
        else {
            editControl.removeTransBounds();
        }
    };
    boundRButton.onclick = function () {
        alert("Rotation Bounds has not been implemented yet");
    };
    boundSButton.onclick = function () {
        if (boundSButton.checked) {
            editControl.setScaleBounds(
            // new BABYLON.Vector3(0.00000001,0.00000001,0.00000001),     // works
            new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0), // causes bug
            new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](2, 2, 2) // max
            );
        }
        else {
            editControl.removeScaleBounds();
        }
    };
    var rotGuideFull = document.getElementById("rotGuideFull");
    rotGuideFull.checked = false;
    rotGuideFull.onclick = function () {
        editControl.setRotGuideFull(rotGuideFull.checked);
    };
    var undoButton = document.getElementById("undo");
    var redoButton = document.getElementById("redo");
    undoButton.onclick = function () {
        editControl.undo();
    };
    redoButton.onclick = function () {
        editControl.redo();
    };
    var focusButton = document.getElementById("focus");
    focusButton.onclick = function () {
        camera.target.copyFrom(box.getAbsolutePosition());
    };
    var pRotButton = document.getElementById("pRot");
    var eulerButton = document.getElementById("euler");
    pRotButton.onclick = function () {
        console.log(box.rotation);
        console.log(box.rotationQuaternion);
    };
    var euler = false;
    eulerButton.onclick = function () {
        euler = !euler;
        editControl.returnEuler(euler);
        console.log("enable euler : " + euler);
    };
    var selectBox1 = document.getElementById("selectBox1");
    var selectBox2 = document.getElementById("selectBox2");
    var selectBox3 = document.getElementById("selectBox3");
    var switchBox = function () {
        if (selectBox1.checked) {
            editControl = ec1;
            box = box1;
        }
        else if (selectBox2.checked) {
            editControl = ec2;
            box = box2;
        }
        else {
            editControl = ec3;
            box = box3;
        }
        switchSpace();
        snapTButton.click();
        snapRButton.click();
        snapSButton.click();
        boundTButton.click();
        boundSButton.click();
        rotGuideFull.click();
    };
    selectBox1.onclick = switchBox;
    selectBox2.onclick = switchBox;
    selectBox3.onclick = switchBox;
    var local = document.getElementById("local");
    var global = document.getElementById("global");
    var switchSpace = function () {
        editControl.setLocal(local.checked);
        if (editControl.isScalingEnabled() && !editControl.isLocal()) {
            alert("Please note that you cannot scale in global mode");
        }
    };
    local.onclick = switchSpace;
    global.onclick = switchSpace;
};


/***/ })

/******/ });
});
//# sourceMappingURL=Test-EditControl.js.map