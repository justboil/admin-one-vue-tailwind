import{O as f,v as r,H as m,P as y,o as c,p as i,h as t,a as b,q as _,d as v,B as g,C as h}from"./index.5bdd6623.js";const V={class:"flex items-stretch justify-start relative"},k={class:"inline-flex"},x=["accept"],S={key:0},B={class:"inline-flex px-4 py-2 justify-center bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r"},C={__name:"FormFilePicker",props:{modelValue:{type:[Object,File,Array],default:null},label:{type:String,default:"Upload"},icon:{type:String,default:f},accept:{type:String,default:null},color:{type:String,default:"info"}},emits:["update:modelValue"],setup(a,{emit:u}){const o=a,s=r(null),e=r(o.modelValue),d=m(()=>o.modelValue);y(d,l=>{e.value=l,l||(s.value.input.value=null)});const p=l=>{const n=l.target.files||l.dataTransfer.files;e.value=n[0],u("update:modelValue",e.value)};return(l,n)=>(c(),i("div",V,[t("label",k,[b(v,{as:"a",label:a.label,icon:a.icon,color:a.color,class:_({"rounded-r-none":e.value})},null,8,["label","icon","color","class"]),t("input",{ref_key:"root",ref:s,type:"file",class:"absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1",accept:a.accept,onInput:p},null,40,x)]),e.value?(c(),i("div",S,[t("span",B,g(e.value.name),1)])):h("",!0)]))}};export{C as _};