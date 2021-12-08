"use strict";(self["webpackChunkadmin_one_vue_tailwind"]=self["webpackChunkadmin_one_vue_tailwind"]||[]).push([[535],{1472:function(e,n,t){t.d(n,{Z:function(){return m}});t(9653),t(8309);var r=t(6252),l=t(3577),o=t(2262),u=t(9963),a=["type","name","value"],i=(0,r._)("span",{class:"check"},null,-1),d={class:"control-label"},s={props:{options:{type:Object,default:function(){}},name:{type:String,required:!0},type:{type:String,default:"checkbox"},column:Boolean,modelValue:{type:[Object,Array,String,Number],default:null}},emits:["update:modelValue"],setup:function(e,n){var t=n.emit,s=e,c=(0,o.Fl)({get:function(){return s.modelValue},set:function(e){t("update:modelValue",e)}}),m=(0,o.Fl)((function(){return"radio"===s.type?"radio":"checkbox"}));return function(n,t){return(0,r.wg)(),(0,r.iD)("div",{class:(0,l.C_)(["flex justify-start flex-wrap -mb-3",{"flex-col":e.column}])},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.options,(function(n,s){return(0,r.wg)(),(0,r.iD)("label",{key:s,class:(0,l.C_)([e.type,"mr-6 mb-3 last:mr-0"])},[(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":t[0]||(t[0]=function(e){return(0,o.dq)(c)?c.value=e:null}),type:(0,o.SU)(m),name:e.name,value:s},null,8,a),[[u.YZ,(0,o.SU)(c)]]),i,(0,r._)("span",d,(0,l.zw)(n),1)],2)})),128))],2)}}};const c=s;var m=c},4533:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(6252),l=t(3577),o=t(2262),u={class:"mb-6 last:mb-0"},a={key:0,class:"block font-bold mb-2"},i={key:1,class:"text-xs text-gray-500 dark:text-gray-400 mt-1"},d={props:{label:{type:String,default:null},help:{type:String,default:null}},setup:function(e){var n=(0,r.Rr)(),t=(0,o.Fl)((function(){var e=[],t=n.default().length;return t>1&&e.push("grid grid-cols-1 gap-3"),2===t&&e.push("md:grid-cols-2"),e}));return function(n,d){return(0,r.wg)(),(0,r.iD)("div",u,[e.label?((0,r.wg)(),(0,r.iD)("label",a,(0,l.zw)(e.label),1)):(0,r.kq)("",!0),(0,r._)("div",{class:(0,l.C_)((0,o.SU)(t))},[(0,r.WI)(n.$slots,"default")],2),e.help?((0,r.wg)(),(0,r.iD)("div",i,(0,l.zw)(e.help),1)):(0,r.kq)("",!0)])}}};const s=d;var c=s},2089:function(e,n,t){t.d(n,{Z:function(){return s}});t(6699);var r=t(6252),l=t(3577),o=t(2262),u=t(8637),a=t(229),i={props:{bg:{type:String,required:!0,validator:function(e){return["login","error"].includes(e)}}},setup:function(e){var n=e,t=(0,u.oR)(),i=(0,o.Fl)((function(){return t.state.darkMode})),d=(0,o.Fl)((function(){var e,t={login:"bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500",loginDark:"bg-gradient-to-tr from-purple-900 via-pink-900 to-red-900",error:"bg-gradient-to-tr from-pink-400 via-red-500 to-yellow-500",errorDark:"bg-gradient-to-tr from-pink-900 via-red-900 to-yellow-900"},r=i.value?"".concat(n.bg,"Dark"):n.bg;return null!==(e=t[r])&&void 0!==e?e:""}));return function(e,n){return(0,r.wg)(),(0,r.j4)(a.Z,{class:(0,l.C_)((0,o.SU)(d))},{default:(0,r.w5)((function(){return[(0,r.WI)(e.$slots,"default",{cardClass:"w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl",cardRounded:"rounded-lg"})]})),_:3},8,["class"])}}};const d=i;var s=d},4013:function(e,n,t){t.r(n),t.d(n,{default:function(){return y}});var r=t(6252),l=t(3577),o=t(9963),u=t(2262),a=t(2119),i=t(5317),d=t(2089),s=t(887),c=t(1472),m=t(4533),p=t(8864),f=t(859),g=t(6401),b=t(9275),w={setup:function(e){var n=(0,u.qj)({login:"john.doe",pass:"highly-secure-password-fYjUw-",remember:["remember"]}),t=(0,a.tv)(),w=function(){t.push("/")};return function(e,t){return(0,r.wg)(),(0,r.j4)(d.Z,{bg:"login"},{default:(0,r.w5)((function(e){var a=e.cardClass,d=e.cardRounded;return[(0,r.Wm)(s.Z,{class:(0,l.C_)(a),rounded:d,form:"",onSubmit:(0,o.iM)(w,["prevent"])},{default:(0,r.w5)((function(){return[(0,r.Wm)(m.Z,{label:"Login",help:"Please enter your login"},{default:(0,r.w5)((function(){return[(0,r.Wm)(p.Z,{modelValue:(0,u.SU)(n).login,"onUpdate:modelValue":t[0]||(t[0]=function(e){return(0,u.SU)(n).login=e}),icon:(0,u.SU)(i.rI3),name:"login",autocomplete:"username"},null,8,["modelValue","icon"])]})),_:1}),(0,r.Wm)(m.Z,{label:"Password",help:"Please enter your password"},{default:(0,r.w5)((function(){return[(0,r.Wm)(p.Z,{modelValue:(0,u.SU)(n).pass,"onUpdate:modelValue":t[1]||(t[1]=function(e){return(0,u.SU)(n).pass=e}),icon:(0,u.SU)(i.AD$),type:"password",name:"password",autocomplete:"current-password"},null,8,["modelValue","icon"])]})),_:1}),(0,r.Wm)(c.Z,{modelValue:(0,u.SU)(n).remember,"onUpdate:modelValue":t[2]||(t[2]=function(e){return(0,u.SU)(n).remember=e}),name:"remember",options:{remember:"Remember"}},null,8,["modelValue"]),(0,r.Wm)(f.Z),(0,r.Wm)(b.Z,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(g.Z,{type:"submit",color:"info",label:"Login"}),(0,r.Wm)(g.Z,{to:"/",color:"info",outline:"",label:"Back"})]})),_:1})]})),_:2},1032,["class","rounded","onSubmit"])]})),_:1})}}};const v=w;var y=v},6699:function(e,n,t){var r=t(2109),l=t(1318).includes,o=t(1223);r({target:"Array",proto:!0},{includes:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")}}]);
//# sourceMappingURL=login-legacy.fb59021f.js.map