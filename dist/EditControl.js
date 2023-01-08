!function(t,i){if("object"==typeof exports&&"object"==typeof module)module.exports=i(require("babylonjs"));else if("function"==typeof define&&define.amd)define(["babylonjs"],i);else{var s="object"==typeof exports?i(require("babylonjs")):i(t.BABYLON);for(var h in s)("object"==typeof exports?exports:t)[h]=s[h]}}(self,(t=>(()=>{"use strict";var i={247:i=>{i.exports=t}},s={};function h(t){var n=s[t];if(void 0!==n)return n.exports;var u=s[t]={exports:{}};return i[t](u,u.exports,h),u.exports}h.n=t=>{var i=t&&t.t?()=>t.default:()=>t;return h.d(i,{a:i}),i},h.d=(t,i)=>{for(var s in i)h.o(i,s)&&!h.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},h.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),h.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"t",{value:!0})};var n={};return(()=>{h.r(n),h.d(n,{EditControl:()=>s});var t,i=h(247);!function(t){t[t.TRANS=0]="TRANS",t[t.ROT=1]="ROT",t[t.SCALE=2]="SCALE"}(t||(t={}));var s=function(){function s(t,s,h,n,e,r){var o=this;this.i=!0,this.h=!1,this.u=!1,this.l=1,this.v=Math.PI/18,this.M=.4,this.p=1,this.L=.02,this.A=new i.Color3(1,.2,.2),this.j=new i.Color3(.2,1,.2),this.S=new i.Color3(.2,.2,1),this.O=new i.Color3(1,1,1),this.T=new i.Color3(1,1,.2),this.R=.75,this.g=!1,this.k=new i.Matrix,this.q=new i.Vector3(0,0,0),this.C=2,this._=new i.Vector3(0,0,0),this.B=new i.Vector3(0,0,0),this.N="",this.D=!1,this.F=null,this.G=null,this.H=null,this.I=!1,this.J=!1,this.K=!1,this.P=!1,this.U=new i.Vector3(0,0,0),this.V=new i.Vector3(0,0,0),this.W=!1,this.$=new i.Vector3(0,0,0),this.tt=.25,this.it=new i.Vector3(0,0,0),this.st=new i.Vector3(0,0,0),this.ht=new i.Vector3(0,0,0),this.nt=new i.Vector3(0,0,0),this.ut=!1,this.et=0,this.rt=!1,this.ot=!1,this.ft=!1,this.lt=180,this.ct=new i.Vector3(this.l,this.l,this.l),this.vt=new i.Vector3(0,0,0),this.wt=new i.Vector3(0,0,0),this.Mt=new i.Vector3(0,0,0),this.Xt=new i.Matrix,this.Yt=t,this.Zt=s,this.dt=h,null!=n&&(this.p=n),this.ut=null!==e&&e,this.bt(),null!=r&&(this.L=r),this.Lt=i.UtilityLayerRenderer.DefaultUtilityLayer,this.Lt.onlyCheckPointerDownEvents=!1,this.zt=this.Lt.utilityLayerScene,this.yt=new u(t,10),t.computeWorldMatrix(!0),this.At=this.jt(t),this.St(t),this.g=this.xt(t),console.log("lhs rhs issue "+this.g),this.Ot=new i.Mesh("",this.zt),this.Ot.rotationQuaternion=i.Quaternion.Identity(),this.Ot.visibility=0,this.Ot.isPickable=!1,this.Tt(this.zt),this.Et().parent=this.Ot,this.Rt().parent=this.Ot,this.gt=function(t){return o.kt(t)},this.qt=function(t){return o.Ct(t)},this._t=function(t){return o.Bt(t)},h.addEventListener("pointerdown",this.gt,!1),h.addEventListener("pointerup",this.qt,!1),h.addEventListener("pointermove",this._t,!1),this.Nt=function(){return o.Qt()},this.zt.registerBeforeRender(this.Nt)}return s.prototype.getRoot=function(){return this.Ot},s.prototype.bt=function(){if(!this.ut&&(null==this.Yt.rotationQuaternion||null==this.Yt.rotationQuaternion))throw"Error: Eulerian is set to false but the mesh's rotationQuaternion is not set."},s.prototype.xt=function(t){var s=!1,h=t.parent;if(null==h)return!1;this.St(h);var n=i.Vector3.Cross(this.st,this.ht);return s=i.Vector3.Dot(n,this.nt)<0,this.St(t),s},s.prototype.Qt=function(){this.Ot.position=this.Yt.getAbsolutePivotPoint(),this.Dt(),this.Ft(),this.i?(this.Ot.getWorldMatrix().invertToRef(this.k),i.Vector3.TransformCoordinatesToRef(this.Zt.position,this.k,this.q),this.Gt.lookAt(this.q,0,0,0,i.Space.LOCAL)):(this.Zt.position.subtractToRef(this.Ot.position,this.q),this.Gt.lookAt(this.Zt.position,0,0,0,i.Space.WORLD)),this.ot?this.Ht():this.rt?this.It(this.Jt,this.Kt,this.Pt):this.ft&&this.It(this.Ut,this.Vt,this.Wt)},s.prototype.Dt=function(){if(this.i)if(null==this.Yt.parent)if(this.ut){var t=this.Yt.rotation;i.Quaternion.RotationYawPitchRollToRef(t.y,t.x,t.z,this.Ot.rotationQuaternion)}else this.Ot.rotationQuaternion.copyFrom(this.Yt.rotationQuaternion);else{if(this.$t(this.Yt))return;this.Yt.getWorldMatrix().getRotationMatrixToRef(this.Xt),i.Quaternion.FromRotationMatrixToRef(this.Xt,this.Ot.rotationQuaternion)}},s.prototype.$t=function(t){if(null==t.parent)return!1;for(;null!=t.parent;){if(t.parent.scaling.x!=t.parent.scaling.y||t.parent.scaling.y!=t.parent.scaling.z)return!0;t=t.parent}return!1},s.prototype.Ft=function(){this.Ot.position.subtractToRef(this.Zt.position,this._),i.Vector3.FromArrayToRef(this.Zt.getWorldMatrix().asArray(),8,this.B);var t=i.Vector3.Dot(this._,this.B)/this.B.length(),s=Math.abs(t/this.C);i.Vector3.FromFloatsToRef(s,s,s,this.Ot.scaling)},s.prototype.Ht=function(){var t=Math.atan(this.q.y/this.q.z);this.q.z>=0?this.ti.rotation.x=-t:this.ti.rotation.x=-t-Math.PI;var i=Math.atan(this.q.x/this.q.z);this.q.z>=0?this.ii.rotation.y=i:this.ii.rotation.y=i+Math.PI;var s=Math.atan(this.q.x/this.q.y);this.q.y>=0?this.si.rotation.z=-s:this.si.rotation.z=-s-Math.PI},s.prototype.It=function(t,i,s){var h=this.q;t.rotation.x=0,t.rotation.y=0,t.rotation.z=0,i.rotation.x=0,i.rotation.y=0,i.rotation.z=0,s.rotation.x=0,s.rotation.y=0,s.rotation.z=0,h.x<=0&&h.y>=0&&h.z>=0?(t.rotation.z=3.14,s.rotation.y=3.14):h.x<=0&&h.y>=0&&h.z<=0?(t.rotation.y=3.14,i.rotation.y=3.14,s.rotation.y=3.14):h.x>=0&&h.y>=0&&h.z<=0?(t.rotation.x=3.14,i.rotation.y=3.14):h.x>=0&&h.y<=0&&h.z>=0?(i.rotation.z=3.14,s.rotation.x=3.14):h.x<=0&&h.y<=0&&h.z>=0?(t.rotation.z=3.14,i.rotation.z=3.14,s.rotation.z=3.14):h.x<=0&&h.y<=0&&h.z<=0?(t.rotation.y=3.14,i.rotation.x=3.14,s.rotation.z=3.14):h.x>=0&&h.y<=0&&h.z<=0&&(t.rotation.x=3.14,i.rotation.x=3.14,s.rotation.x=3.14)},s.prototype.switchTo=function(t,i){t.computeWorldMatrix(!0),this.Yt=t,null!=i&&(this.ut=i),this.bt(),this.St(t),this.yt=new u(t,10),this.g=this.xt(t),this.refreshBoundingInfo()},s.prototype.switchCamera=function(t){this.Zt=t},s.prototype.setUndoCount=function(t){this.yt.setCapacity(t)},s.prototype.undo=function(){var t=this.yt.undo();this.Yt.computeWorldMatrix(!0),this.St(this.Yt),this.hi(t),this.ni(t),this.ui(t)},s.prototype.redo=function(){var t=this.yt.redo();this.Yt.computeWorldMatrix(!0),this.St(this.Yt),this.hi(t),this.ni(t),this.ui(t)},s.prototype.detach=function(){this.dt.removeEventListener("pointerdown",this.gt,!1),this.dt.removeEventListener("pointerup",this.qt,!1),this.dt.removeEventListener("pointermove",this._t,!1),this.zt.unregisterBeforeRender(this.Nt),this.removeAllActionListeners(),this.ei()},s.prototype.hide=function(){this.D=!0,this.rt?(this.N="T",this.disableTranslation()):this.ot?(this.N="R",this.disableRotation()):this.ft&&(this.N="S",this.disableScaling()),this.ri()},s.prototype.ri=function(){this.oi.visibility=0,this.fi.visibility=0,this.li.visibility=0},s.prototype.ai=function(){this.oi.visibility=this.R,this.fi.visibility=this.R,this.li.visibility=this.R},s.prototype.show=function(){this.D=!1,this.ai(),"T"==this.N?this.enableTranslation():"R"==this.N?this.enableRotation():"S"==this.N&&this.enableScaling()},s.prototype.isHidden=function(){return this.D},s.prototype.ei=function(){this.Ot.dispose(),this.ci(),this.yt=null},s.prototype.addActionListener=function(t){this.F=t},s.prototype.removeActionListener=function(){this.F=null},s.prototype.addActionStartListener=function(t){this.G=t},s.prototype.removeActionStartListener=function(){this.G=null},s.prototype.addActionEndListener=function(t){this.H=t},s.prototype.removeActionEndListener=function(){this.H=null},s.prototype.removeAllActionListeners=function(){this.F=null,this.G=null,this.H=null},s.prototype.kt=function(t){var i=this;if(t.preventDefault(),this.I=!0,0==t.button){var s=this.zt.getEngine(),h=s.isPointerLock?.5*this.dt.width:this.zt.pointerX,n=s.isPointerLock?.5*this.dt.height:this.zt.pointerY,u=this.zt.pick(h,n,(function(t){if(i.rt){if(t==i.vi||t==i.wi||t==i.Mi||t==i.Jt||t==i.Kt||t==i.Pt||t==i.pi)return!0}else if(i.ot){if(t==i.ti||t==i.ii||t==i.si||t==i.Xi)return!0}else if(i.ft&&(t==i.Yi||t==i.Zi||t==i.di||t==i.Ut||t==i.Vt||t==i.Wt||t==i.bi))return!0;return!1}),!1,this.Zt);if(u.hit){this.Li=u.pickedMesh;var e=this.Li.getChildren();e.length>0?e[0].visibility=this.R:this.Li.visibility=this.R;var r=this.Li.name;"X"==r?this.zi.visibility=1:"Y"==r?this.yi.visibility=1:"Z"==r?this.Ai.visibility=1:"XZ"==r?(this.zi.visibility=1,this.Ai.visibility=1):"ZY"==r?(this.Ai.visibility=1,this.yi.visibility=1):"YX"==r?(this.yi.visibility=1,this.zi.visibility=1):"ALL"==r&&(this.zi.visibility=1,this.yi.visibility=1,this.Ai.visibility=1),this.mi(!0),this.ji=this.Si(this.Li),null!=this.ji?this.xi=this.Oi():this.xi=null,window.setTimeout((function(t,s){return i.Ti(t,s)}),0,this.Zt,this.dt)}}},s.prototype.mi=function(i){this.K=i,i?(this.Ei(),this.Ri==t.ROT&&(this.et=0),this.hi(this.Ri)):this.ui(this.Ri)},s.prototype.isEditing=function(){return this.K},s.prototype.Ti=function(t,i){var s=t,h=i;this.zt.getEngine().isPointerLock||s.detachControl(h)},s.prototype.isPointerOver=function(){return this.J},s.prototype.gi=function(){var t=this,i=this.zt.getEngine(),s=i.isPointerLock?.5*this.dt.width:this.zt.pointerX,h=i.isPointerLock?.5*this.dt.height:this.zt.pointerY,n=this.zt.pick(s,h,(function(i){if(t.rt){if(i==t.vi||i==t.wi||i==t.Mi||i==t.Jt||i==t.Kt||i==t.Pt||i==t.pi)return!0}else if(t.ot){if(i==t.ti||i==t.ii||i==t.si||i==t.Xi)return!0}else if(t.ft&&(i==t.Yi||i==t.Zi||i==t.di||i==t.Ut||i==t.Vt||i==t.Wt||i==t.bi))return!0;return!1}),!1,this.Zt);if(n.hit){if(n.pickedMesh!=this.ki){if(this.J=!0,this.qi(),this.ki=n.pickedMesh,this.ot)this.Ci=this.ki.getChildren()[0].color,this.ki.getChildren()[0].color=this.O;else{var u=this.ki.getChildren();u.length>0?(this._i=u[0].material,u[0].material=this.Bi):(this._i=this.ki.material,this.ki.material=this.Bi)}"X"==this.ki.name?this.oi.color=this.O:"Y"==this.ki.name?this.fi.color=this.O:"Z"==this.ki.name&&(this.li.color=this.O)}}else this.J=!1,null!=this.ki&&(this.Ni(this.ki),this.ki=null)},s.prototype.qi=function(){null!=this.ki&&(this.ki.visibility=0,this.Ni(this.ki))},s.prototype.Ni=function(t){switch(t.name){case"X":this.oi.color=this.A;break;case"Y":this.fi.color=this.j;break;case"Z":this.li.color=this.S}if(this.ot)t.getChildren()[0].color=this.Ci;else{var i=t.getChildren();i.length>0?i[0].material=this._i:t.material=this._i}},s.prototype.Ct=function(t){(this.I=!1,this.K)&&(this.zt.getEngine().isPointerLock||this.Zt.attachControl(!0),this.mi(!1),this.Qi(),null!=this.ki&&(this.Ni(this.ki),this.ki=null),this.yt.add(this.Ri))},s.prototype.Ei=function(){this.rt?this.Ri=t.TRANS:this.ot?this.Ri=t.ROT:this.ft&&(this.Ri=t.SCALE)},s.prototype.ni=function(t){null!=this.F&&this.F(t)},s.prototype.hi=function(t){null!=this.G&&this.G(t)},s.prototype.ui=function(t){null!=this.H&&this.H(t)},s.prototype.Bt=function(t){if(this.I){if(this.K&&null!=this.xi){var i=this.Oi();if(null!=i){if(this.ot)this.Di(this.Yt,this.Li,i,this.xi);else{var s=i.subtract(this.xi);if(0==s.x&&0==s.y&&0==s.z)return;this.rt?this.Fi(s):this.ft&&this.i&&this.Gi(s)}this.xi=i,this.ni(this.Ri)}}}else this.gi()},s.prototype.Si=function(t){var s=t.name;if(this.rt||this.ft){if("XZ"==s)return this.Hi;if("ZY"==s)return this.Ii;if("YX"==s)return this.Ji;if("ALL"==s)return this.Gt;this.Ot.getWorldMatrix().invertToRef(this.k),i.Vector3.TransformCoordinatesToRef(this.Zt.position,this.k,this.q);var h=this.q;if("X"===s)return Math.abs(h.y)>Math.abs(h.z)?this.Hi:this.Ji;if("Z"===s)return Math.abs(h.y)>Math.abs(h.x)?this.Hi:this.Ii;if("Y"===s)return Math.abs(h.z)>Math.abs(h.x)?this.Ji:this.Ii}else{if(!this.ot)return null;this.P=!1,this.Ot.getWorldMatrix().invertToRef(this.k),i.Vector3.TransformCoordinatesToRef(this.Zt.position,this.k,this.q);h=this.q;switch(s){case"X":return Math.abs(h.x)<.2?(this.P=!0,this.Gt):this.Ii;case"Y":return Math.abs(h.y)<.2?(this.P=!0,this.Gt):this.Hi;case"Z":return Math.abs(h.z)<.2?(this.P=!0,this.Gt):this.Ji;default:return this.Gt}}},s.prototype.Fi=function(t){null!=this.Yt.parent&&this.$t(this.Yt)?this.St(this.Ot):this.St(this.Yt);var s=this.Li.name;this.U.x=0,this.U.y=0,this.U.z=0,"X"!=s&&"XZ"!=s&&"YX"!=s&&"ALL"!=s||(this.i?this.U.x=i.Vector3.Dot(t,this.st)/this.st.length():this.U.x=t.x),"Y"!=s&&"ZY"!=s&&"YX"!=s&&"ALL"!=s||(this.i?this.U.y=i.Vector3.Dot(t,this.ht)/this.ht.length():this.U.y=t.y),"Z"!=s&&"XZ"!=s&&"ZY"!=s&&"ALL"!=s||(this.i?this.U.z=i.Vector3.Dot(t,this.nt)/this.nt.length():this.U.z=t.z),this.Ki(this.Yt,this.U,this.i),this.Pi&&(this.Yt.position.x=Math.max(this.Yt.position.x,this.Pi.x),this.Yt.position.y=Math.max(this.Yt.position.y,this.Pi.y),this.Yt.position.z=Math.max(this.Yt.position.z,this.Pi.z)),this.Ui&&(this.Yt.position.x=Math.min(this.Yt.position.x,this.Ui.x),this.Yt.position.y=Math.min(this.Yt.position.y,this.Ui.y),this.Yt.position.z=Math.min(this.Yt.position.z,this.Ui.z)),this.Yt.computeWorldMatrix(!0)},s.prototype.Ki=function(t,s,h){if(this.h){var n=!1;if(this.V.addInPlace(s),Math.abs(this.V.x)>this.ct.x&&(this.V.x>0?s.x=this.ct.x:s.x=-this.ct.x,n=!0),Math.abs(this.V.y)>this.ct.y&&(this.V.y>0?s.y=this.ct.y:s.y=-this.ct.y,n=!0),Math.abs(this.V.z)>this.ct.z&&(this.V.z>0?s.z=this.ct.z:s.z=-this.ct.z,n=!0),!n)return;Math.abs(s.x)!==this.ct.x&&(s.x=0),Math.abs(s.y)!==this.ct.y&&(s.y=0),Math.abs(s.z)!==this.ct.z&&(s.z=0),i.Vector3.FromFloatsToRef(0,0,0,this.V),n=!1}h?(this.st.normalizeToRef(this.vt),this.ht.normalizeToRef(this.wt),this.nt.normalizeToRef(this.Mt),this.Yt.translate(this.vt,s.x,i.Space.WORLD),this.Yt.translate(this.wt,s.y,i.Space.WORLD),this.Yt.translate(this.Mt,s.z,i.Space.WORLD)):null==this.Yt.parent?this.Yt.position.addInPlace(s):this.Yt.setAbsolutePosition(s.addInPlace(this.Yt.absolutePosition))},s.prototype.Gi=function(t){this.St(this.Yt),this.it.x=0,this.it.y=0,this.it.z=0;var s=this.Li.name;"X"!=s&&"XZ"!=s&&"YX"!=s||(this.it.x=i.Vector3.Dot(t,this.st)/this.st.length(),this.Yt.scaling.x<0&&(this.it.x=-this.it.x)),"Y"!=s&&"ZY"!=s&&"YX"!=s||(this.it.y=i.Vector3.Dot(t,this.ht)/this.ht.length(),this.Yt.scaling.y<0&&(this.it.y=-this.it.y)),"Z"!=s&&"XZ"!=s&&"ZY"!=s||(this.it.z=i.Vector3.Dot(t,this.nt)/this.nt.length(),this.Yt.scaling.z<0&&(this.it.z=-this.it.z));var h=this.At;if(this.it.x=this.it.x/h.x,this.it.y=this.it.y/h.y,this.it.z=this.it.z/h.z,"ALL"==s){var n=i.Vector3.Dot(t,this.Zt.upVector);n/=Math.max(h.x,h.y,h.z),this.it.copyFromFloats(n,n,n)}else{var u=!1;if("XZ"==s?(u=!0,Math.abs(this.it.x)>Math.abs(this.it.z)?this.it.z=this.it.x:this.it.x=this.it.z):"ZY"==s?(u=!0,Math.abs(this.it.z)>Math.abs(this.it.y)?this.it.y=this.it.z:this.it.z=this.it.y):"YX"==s&&(u=!0,Math.abs(this.it.y)>Math.abs(this.it.x)?this.it.x=this.it.y:this.it.y=this.it.x),u){this.Ot.position.subtractToRef(this.Zt.position,this._);n=i.Vector3.Dot(t,this._);this.it.x=Math.abs(this.it.x),this.it.y=Math.abs(this.it.y),this.it.z=Math.abs(this.it.z),n>0?(this.Yt.scaling.x>0&&(this.it.x=-this.it.x),this.Yt.scaling.y>0&&(this.it.y=-this.it.y),this.Yt.scaling.z>0&&(this.it.z=-this.it.z)):(this.Yt.scaling.x<0&&(this.it.x=-this.it.x),this.Yt.scaling.y<0&&(this.it.y=-this.it.y),this.Yt.scaling.z<0&&(this.it.z=-this.it.z))}}this.Vi(this.Yt,this.it),this.Wi&&(this.Yt.scaling.x=Math.max(this.Yt.scaling.x,this.Wi.x),this.Yt.scaling.y=Math.max(this.Yt.scaling.y,this.Wi.y),this.Yt.scaling.z=Math.max(this.Yt.scaling.z,this.Wi.z)),this.$i&&(this.Yt.scaling.x=Math.min(this.Yt.scaling.x,this.$i.x),this.Yt.scaling.y=Math.min(this.Yt.scaling.y,this.$i.y),this.Yt.scaling.z=Math.min(this.Yt.scaling.z,this.$i.z))},s.prototype.Vi=function(t,s){if(this.W){var h=!1;if(this.$.addInPlace(s),Math.abs(this.$.x)>this.tt&&(s.x>0?s.x=this.tt:s.x=-this.tt,h=!0),Math.abs(this.$.y)>this.tt&&(s.y>0?s.y=this.tt:s.y=-this.tt,h=!0),Math.abs(this.$.z)>this.tt&&(s.z>0?s.z=this.tt:s.z=-this.tt,h=!0),!h)return;Math.abs(s.x)!==this.tt&&0!==s.x&&(s.x=0),Math.abs(s.y)!==this.tt&&0!==s.y&&(s.y=0),Math.abs(s.z)!==this.tt&&0!==s.z&&(s.z=0),i.Vector3.FromFloatsToRef(0,0,0,this.$),h=!1}t.scaling.addInPlace(s)},s.prototype.St=function(t){var s=t.getWorldMatrix();i.Vector3.FromArrayToRef(s.m,0,this.st),i.Vector3.FromArrayToRef(s.m,4,this.ht),i.Vector3.FromArrayToRef(s.m,8,this.nt)},s.prototype.jt=function(t){if(t instanceof i.AbstractMesh){var s=t.getBoundingInfo().boundingBox,h=s.maximum.subtract(s.minimum);return 0==h.x&&(h.x=1),0==h.y&&(h.y=1),0==h.z&&(h.z=1),h}return new i.Vector3(1,1,1)},s.prototype.refreshBoundingInfo=function(){this.At=this.jt(this.Yt)},s.prototype.Di=function(t,s,h,n){this.i&&null!=this.Yt.parent&&this.$t(t)?this.St(this.Ot):this.St(t);var u,e=0;s==this.ti?u=this.i?this.st:i.Axis.X:s==this.ii?u=this.i?this.ht:i.Axis.Y:s==this.si&&(u=this.i?this.nt:i.Axis.Z),this.Ot.position.subtractToRef(this.Zt.position,this._),this.P?(e=this.ts(n,h,this.Zt.position,this._,u),this.zt.useRightHandedSystem&&(e=-e)):e=this.ss(n,h,t.getAbsolutePivotPoint(),this._),this.g&&(e=-e),this.u&&(this.et+=e,e=0,Math.abs(this.et)>=this.v&&(e=this.et>0?this.v:-this.v,this.et=0)),0!==e&&(this._.normalize(),s==this.Xi?t.rotate(this._,-e,i.Space.WORLD):(i.Vector3.Dot(u,this._)>=0&&(e=-e),t.rotate(u,e,i.Space.WORLD)),this.ut&&(t.rotation=t.rotationQuaternion.toEulerAngles(),t.rotationQuaternion=null),this.i&&(this.g&&(e=-e),null!=this.Yt.parent&&this.$t(t)&&(s==this.Xi?this.Ot.rotate(this._,-e,i.Space.WORLD):this.Ot.rotate(u,e,i.Space.WORLD))))},s.prototype.Oi=function(){var t=this,i=this.zt.getEngine(),s=i.isPointerLock?.5*this.dt.width:this.zt.pointerX,h=i.isPointerLock?.5*this.dt.height:this.zt.pointerY,n=this.zt.pick(s,h,(function(i){return i==t.ji}),null,this.Zt);return n.hit?n.pickedPoint:null},s.prototype.Qi=function(){this.zi.visibility=0,this.yi.visibility=0,this.Ai.visibility=0},s.prototype.getRotationQuaternion=function(){return this.Ot.rotationQuaternion},s.prototype.getPosition=function(){return this.Ot.position},s.prototype.isTranslationEnabled=function(){return this.rt},s.prototype.enableTranslation=function(){this.D||(null==this.vi&&(this.hs(),this.ns.parent=this.Ot),this.qi(),this.rt||(this.us(this.es,this.R),this.rt=!0,this.disableRotation(),this.disableScaling()))},s.prototype.disableTranslation=function(){this.rt&&(this.us(this.es,0),this.rt=!1)},s.prototype.isRotationEnabled=function(){return this.ot},s.prototype.returnEuler=function(t){this.ut=t},s.prototype.enableRotation=function(){this.D||(null==this.rs&&(this.os(),this.rs.parent=this.Ot),this.qi(),this.ot||(this.us(this.fs,this.R),this.ot=!0,this.disableTranslation(),this.disableScaling()))},s.prototype.disableRotation=function(){this.ot&&(this.us(this.fs,0),this.ot=!1)},s.prototype.isScalingEnabled=function(){return this.ft},s.prototype.enableScaling=function(){this.D||(null==this.Yi&&(this.ls(),this.cs.parent=this.Ot),this.qi(),this.ft||(this.us(this.vs,this.R),this.ft=!0,this.disableTranslation(),this.disableRotation()))},s.prototype.disableScaling=function(){this.ft&&(this.us(this.vs,0),this.ft=!1)},s.prototype.setScaleBounds=function(t,i){this.Wi=t||null,this.$i=i||null,null!=this.Wi&&(0==this.Wi.x&&(this.Wi.x=1e-8),0==this.Wi.y&&(this.Wi.y=1e-8),0==this.Wi.z&&(this.Wi.z=1e-8))},s.prototype.removeScaleBounds=function(){this.Wi=null,this.$i=null},s.prototype.setTransBounds=function(t,i){this.Pi=t||null,this.Ui=i||null},s.prototype.removeTransBounds=function(){this.Pi=null,this.Ui=null},s.prototype.setRotBounds=function(t,i){this.ws=t||null,this.Ms=i||null},s.prototype.removeRotBounds=function(){this.ws=null,this.Ms=null},s.prototype.Et=function(){var t=new i.Mesh("",this.zt);this.zi=i.MeshBuilder.CreateLines("",{points:[new i.Vector3(-100,0,0),new i.Vector3(100,0,0)]},this.zt),this.yi=i.MeshBuilder.CreateLines("",{points:[new i.Vector3(0,-100,0),new i.Vector3(0,100,0)]},this.zt),this.Ai=i.MeshBuilder.CreateLines("",{points:[new i.Vector3(0,0,-100),new i.Vector3(0,0,100)]},this.zt),this.zi.isPickable=!1,this.yi.isPickable=!1,this.Ai.isPickable=!1,this.zi.parent=t,this.yi.parent=t,this.Ai.parent=t,this.zi.color=this.A,this.yi.color=this.j,this.Ai.color=this.S,this.Qi();var s=this.M*this.p*.75;return this.oi=i.MeshBuilder.CreateLines("",{points:[new i.Vector3(0,0,0),new i.Vector3(s,0,0)]},this.zt),this.fi=i.MeshBuilder.CreateLines("",{points:[new i.Vector3(0,0,0),new i.Vector3(0,s,0)]},this.zt),this.li=i.MeshBuilder.CreateLines("",{points:[new i.Vector3(0,0,0),new i.Vector3(0,0,s)]},this.zt),this.oi.isPickable=!1,this.fi.isPickable=!1,this.li.isPickable=!1,this.oi.parent=t,this.fi.parent=t,this.li.parent=t,this.oi.color=this.A,this.fi.color=this.j,this.li.color=this.S,this.oi.renderingGroupId=1,this.fi.renderingGroupId=1,this.li.renderingGroupId=1,t},s.prototype.Rt=function(){this.Gt=i.MeshBuilder.CreatePlane("",{size:5},this.zt),this.Hi=i.MeshBuilder.CreatePlane("",{size:5},this.zt),this.Ii=i.MeshBuilder.CreatePlane("",{size:5},this.zt),this.Ji=i.MeshBuilder.CreatePlane("",{size:5},this.zt),this.Gt.isPickable=!1,this.Hi.isPickable=!1,this.Ii.isPickable=!1,this.Ji.isPickable=!1,this.Gt.visibility=0,this.Hi.visibility=0,this.Ii.visibility=0,this.Ji.visibility=0,this.Gt.renderingGroupId=1,this.Hi.renderingGroupId=1,this.Ii.renderingGroupId=1,this.Ji.renderingGroupId=1,this.Gt.lookAt(this.Zt.position),this.Hi.rotate(i.Axis.X,1.57),this.Ii.rotate(i.Axis.Y,1.57);var t=new i.Mesh("",this.zt);return this.Gt.parent=t,this.Hi.parent=t,this.Ii.parent=t,this.Ji.parent=t,t},s.prototype.hs=function(){var t=2*this.L*this.p,s=this.M*this.p;this.ns=new i.Mesh("",this.zt),this.ps(t,s,this.ns,this.zt),this.Xs(t,s,this.zt)},s.prototype.ps=function(t,s,h,n){var u=this.Ys(t/2,s);u.name="X";var e=u.clone("Y"),r=u.clone("Z"),o=2*t,f=i.MeshBuilder.CreatePlane("XZ",{size:o},n),l=i.MeshBuilder.CreatePlane("ZY",{size:o},n),a=i.MeshBuilder.CreatePlane("YX",{size:o},n);f.rotation.x=1.57,l.rotation.y=-1.57,f.position.x=2*t,f.position.z=2*t,l.position.z=2*t,l.position.y=2*t,a.position.y=2*t,a.position.x=2*t,f.bakeCurrentTransformIntoVertices(),l.bakeCurrentTransformIntoVertices(),a.bakeCurrentTransformIntoVertices();var c=i.MeshBuilder.CreateBox("ALL",{size:2*t},n);u.parent=h,e.parent=h,r.parent=h,f.parent=h,l.parent=h,a.parent=h,c.parent=h,u.rotation.y=1.57,e.rotation.x-=1.57,this.vi=u,this.wi=e,this.Mi=r,this.Jt=f,this.Kt=l,this.Pt=a,this.pi=c,this.Zs=[u,e,r,f,l,a,c],this.us(this.Zs,0),this.ds(this.Zs)},s.prototype.Xs=function(t,s,h){var n=s/5,u=i.MeshBuilder.CreateCylinder("",{height:n,diameterTop:0,diameterBottom:t,tessellation:6,subdivisions:1},h),e=u.clone(""),r=u.clone(""),o=2*t,f=i.MeshBuilder.CreatePlane("XZ",{size:o},h),l=i.MeshBuilder.CreatePlane("ZY",{size:o},h),a=i.MeshBuilder.CreatePlane("YX",{size:o},h),c=i.MeshBuilder.CreateBox("ALL",{size:t},h);u.rotation.x=1.57,e.rotation.x=1.57,r.rotation.x=1.57,f.rotation.x=1.57,l.rotation.y=1.57,f.position.x=o,f.position.z=o,l.position.z=o,l.position.y=o,a.position.y=o,a.position.x=o,u.parent=this.vi,e.parent=this.wi,r.parent=this.Mi,f.parent=this.Jt,l.parent=this.Kt,a.parent=this.Pt,c.parent=this.pi,u.position.z=s-n/2,e.position.z=s-n/2,r.position.z=s-n/2,u.material=this.bs,e.material=this.Ls,r.material=this.zs,f.material=this.Ls,l.material=this.bs,a.material=this.zs,c.material=this.ys,this.As=u,this.js=e,this.Ss=r,this.xs=f,this.Os=l,this.Ts=a,this.Es=c,this.es=[u,e,r,f,l,a,c],this.ds(this.es),this.Rs(this.es)},s.prototype.setRotGuideFull=function(t){this.lt=t?360:180,null!=this.rs&&(this.rs.dispose(),this.Xi.dispose(),this.rs=null,this.enableRotation())},s.prototype.os=function(){var t=this.M*this.p*2;this.rs=new i.Mesh("",this.zt),this.gs(t,this.rs),this.ks(t)},s.prototype.gs=function(t,i){var s=this.qs(t/2,this.lt),h=this.qs(t/2,this.lt),n=this.qs(t/2,this.lt),u=this.qs(t/1.75,360);s.name="X",h.name="Y",n.name="Z",u.name="ALL",s.rotation.z=1.57,n.rotation.x=-1.57,s.bakeCurrentTransformIntoVertices(),n.bakeCurrentTransformIntoVertices(),u.rotation.x=1.57,s.parent=i,h.parent=i,n.parent=i,u.parent=this.Gt,this.ti=s,this.ii=h,this.si=n,this.Xi=u,this.Cs=[s,h,n,u],this.us(this.Cs,0),this.ds(this.Cs)},s.prototype.ks=function(t){var s=this._s(t/2,this.lt,!1),h=s.clone(""),n=s.clone(""),u=this._s(t/1.75,360,!1),e=this._s(t/2,360,!1);s.parent=this.ti,h.parent=this.ii,n.parent=this.si,s.rotation.z=1.57,n.rotation.x=-1.57,u.parent=this.Xi,e.parent=this.Xi,s.color=this.A,h.color=this.j,n.color=this.S,u.color=this.T,e.color=i.Color3.Gray(),this.Bs=s,this.Ns=h,this.Qs=n,this.Ds=u,this.Fs=e,this.fs=[s,h,n,u,e],this.ds(this.fs),this.Rs(this.fs)},s.prototype.us=function(t,i){t.map((function(t){return t.visibility=i}))},s.prototype.ds=function(t){t.map((function(t){t.isPickable=!1}))},s.prototype.Rs=function(t){t.map((function(t){return t.renderingGroupId=2}))},s.prototype.Ys=function(t,s){var h=[new i.Vector3(t,t,0),new i.Vector3(-t,t,0),new i.Vector3(-t,-t,0),new i.Vector3(t,-t,0),new i.Vector3(t,t,0)],n=[new i.Vector3(0,0,0),new i.Vector3(0,0,s)];return i.MeshBuilder.ExtrudeShape("",{shape:h,path:n,scale:1,rotation:0,cap:2},this.zt)},s.prototype._s=function(t,s,h){null===s&&(s=360);for(var n,u,e=[],r=3.14/180,o=0,f=0;f<=s;f+=5)n=t*Math.cos(f*r),u=90==f?t:270==f?-t:t*Math.sin(f*r),e[o]=new i.Vector3(n,0,u),o++;if(h){t-=.04;for(f=0;f<=s;f+=5)n=t*Math.cos(f*r),u=90==f?t:270==f?-t:t*Math.sin(f*r),e[o]=new i.Vector3(n,0,u),o++}return i.MeshBuilder.CreateLines("",{points:e},this.zt)},s.prototype.qs=function(t,s){null===s&&(s=360);for(var h,n,u=[],e=3.14/180,r=0,o=0;o<=s;o+=30)h=t*Math.cos(o*e),n=90==o?t:270==o?-t:t*Math.sin(o*e),u[r]=new i.Vector3(h,0,n),r++;return i.MeshBuilder.CreateTube("",{path:u,radius:this.L*this.p*2,tessellation:3,cap:i.Mesh.NO_CAP},this.zt)},s.prototype.ls=function(){var t=2*this.L*this.p,s=this.M*this.p;this.cs=new i.Mesh("",this.zt),this.Gs(t,s,this.cs),this.Hs(t,s)},s.prototype.Gs=function(t,s,h){var n=this.Ys(t/2,s);n.name="X";var u=n.clone("Y"),e=n.clone("Z"),r=i.MeshBuilder.CreatePlane("XZ",{size:2*t},this.zt),o=i.MeshBuilder.CreatePlane("ZY",{size:2*t},this.zt),f=i.MeshBuilder.CreatePlane("YX",{size:2*t},this.zt);r.rotation.x=1.57,o.rotation.y=-1.57,r.position.x=2*t,r.position.z=2*t,o.position.z=2*t,o.position.y=2*t,f.position.y=2*t,f.position.x=2*t,r.bakeCurrentTransformIntoVertices(),o.bakeCurrentTransformIntoVertices(),f.bakeCurrentTransformIntoVertices();var l=i.MeshBuilder.CreateBox("ALL",{size:2*t},this.zt);n.parent=h,u.parent=h,e.parent=h,l.parent=h,r.parent=h,o.parent=h,f.parent=h,n.rotation.y=1.57,u.rotation.x-=1.57,this.Yi=n,this.Zi=u,this.di=e,this.Ut=r,this.Vt=o,this.Wt=f,this.bi=l,this.Is=[n,u,e,r,o,f,l],this.us(this.Is,0),this.ds(this.Is)},s.prototype.Hs=function(t,s){var h=i.MeshBuilder.CreateBox("",{size:t},this.zt),n=h.clone(""),u=h.clone(""),e=2*t,r=i.MeshBuilder.CreatePlane("XZ",{size:e},this.zt),o=i.MeshBuilder.CreatePlane("ZY",{size:e},this.zt),f=i.MeshBuilder.CreatePlane("YX",{size:e},this.zt),l=i.MeshBuilder.CreateBox("ALL",{size:t},this.zt);r.rotation.x=1.57,o.rotation.y=-1.57,r.position.x=e,r.position.z=e,o.position.z=e,o.position.y=e,f.position.y=e,f.position.x=e,h.parent=this.Yi,n.parent=this.Zi,u.parent=this.di,r.parent=this.Ut,o.parent=this.Vt,f.parent=this.Wt,l.parent=this.bi,h.position.z=s-t/2,n.position.z=s-t/2,u.position.z=s-t/2,h.material=this.bs,n.material=this.Ls,u.material=this.zs,r.material=this.Ls,o.material=this.bs,f.material=this.zs,l.material=this.ys,this.Js=h,this.Ks=n,this.Ps=u,this.Us=r,this.Vs=o,this.Ws=f,this.$s=l,this.vs=[h,n,u,r,o,f,l],this.ds(this.vs),this.Rs(this.vs)},s.prototype.setVisibility=function(t){this.R=t},s.prototype.setLocal=function(t){this.i!=t&&(this.i=t,t||(this.Ot.rotationQuaternion=i.Quaternion.Identity()))},s.prototype.isLocal=function(){return this.i},s.prototype.setTransSnap=function(t){this.h=t},s.prototype.isTransSnap=function(){return this.h},s.prototype.setRotSnap=function(t){this.u=t},s.prototype.isRotSnap=function(){return this.u},s.prototype.setScaleSnap=function(t){this.W=t},s.prototype.isScaleSnap=function(){return this.W},s.prototype.setTransSnapValue=function(t){this.ct.copyFromFloats(t,t,t),this.l=t},s.prototype.getTransSnapValue=function(){return this.l},s.prototype.setRotSnapValue=function(t){this.v=t},s.prototype.getRotSnapValue=function(){return this.v},s.prototype.setScaleSnapValue=function(t){this.tt=t},s.prototype.getScaleSnapValue=function(){return this.tt},s.prototype.ts=function(t,s,h,n,u){var e=i.Vector3.Dot(n,u);u.scaleToRef(e,this.vt),h.addToRef(this.vt,this.wt);var r=this.wt;this.Zt.getWorldMatrix().invertToRef(this.Xt),i.Vector3.TransformCoordinatesToRef(this.wt,this.Xt,this.wt);var o=0;r.x>=0&&r.y>=0?o=1:r.x<=0&&r.y>=0?o=2:r.x<=0&&r.y<=0?o=3:r.x>=0&&r.y<=0&&(o=4),i.Vector3.TransformCoordinatesToRef(t,this.Xt,this.vt),i.Vector3.TransformCoordinatesToRef(s,this.Xt,this.wt),this.wt.subtractInPlace(this.vt);var f=this.wt,l=f.length(),a="";f.x>=0&&f.y>=0?a=f.x>=f.y?"r":"u":f.x<=0&&f.y>=0?a=-f.x>=f.y?"l":"u":f.x<=0&&f.y<=0?a=-f.x>=-f.y?"l":"d":f.x>=0&&f.y<=0&&(a=f.x>=-f.y?"r":"d");var c=0;return"d"==a?c=1==o||4==o?1:-1:"u"==a?c=1==o||4==o?-1:1:"r"==a?c=2==o||1==o?1:-1:"l"==a&&(c=2==o||1==o?-1:1),c*l},s.prototype.ss=function(t,s,h,n){t.subtractToRef(h,this.vt),s.subtractToRef(h,this.wt),i.Vector3.CrossToRef(this.vt,this.wt,this.Mt);var u=Math.asin(this.Mt.length()/(this.vt.length()*this.wt.length()));return i.Vector3.Dot(this.Mt,n)>0&&(u*=-1),u},s.th=function(t,s){var h=new i.StandardMaterial("",s);return h.emissiveColor=t,h.diffuseColor=i.Color3.Black(),h.specularColor=i.Color3.Black(),h.backFaceCulling=!1,h},s.prototype.Tt=function(t){this.bs=s.th(this.A,t),this.Ls=s.th(this.j,t),this.zs=s.th(this.S,t),this.Bi=s.th(this.O,t),this.ys=s.th(this.T,t)},s.prototype.ci=function(){this.bs.dispose(),this.Ls.dispose(),this.zs.dispose(),this.Bi.dispose(),this.ys.dispose()},s}(),u=function(){function t(t,i){this.lastMax=10,this.acts=new Array,this.last=-1,this.current=-1,this.mesh=t,this.lastMax=i-1,this.add()}return t.prototype.setCapacity=function(t){0!=t?(this.lastMax=t-1,this.last=-1,this.current=-1,this.acts=new Array,this.add()):console.error("capacity should be more than zero")},t.prototype.add=function(t){void 0===t&&(t=null);var i=new e(this.mesh,t);this.current<this.last&&(this.acts.splice(this.current+1),this.last=this.current),this.last==this.lastMax?(this.acts.shift(),this.acts.push(i)):(this.acts.push(i),this.last++,this.current++)},t.prototype.undo=function(){if(this.current>0){var t=this.acts[this.current].getActionType();return this.current--,this.acts[this.current].perform(this.mesh),t}},t.prototype.redo=function(){if(this.current<this.last)return this.current++,this.acts[this.current].perform(this.mesh),this.acts[this.current].getActionType()},t}(),e=function(){function t(t,i){this.ih=t.position.clone(),null==t.rotationQuaternion?(this.sh=null,this.hh=t.rotation.clone()):(this.sh=t.rotationQuaternion.clone(),this.hh=null),this.nh=t.scaling.clone(),this.uh=i}return t.prototype.getActionType=function(){return this.uh},t.prototype.perform=function(t){t.position.copyFrom(this.ih),null==t.rotationQuaternion?null!=this.hh?t.rotation.copyFrom(this.hh):t.rotation.copyFrom(this.sh.toEulerAngles()):null!=this.sh?t.rotationQuaternion.copyFrom(this.sh):t.rotationQuaternion.copyFrom(i.Quaternion.RotationYawPitchRoll(this.hh.y,this.hh.x,this.hh.z)),t.scaling.copyFrom(this.nh)},t}()})(),n})()));
//# sourceMappingURL=EditControl.js.map