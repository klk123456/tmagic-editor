System.register(["./index-legacy-77e7fc80.js"],(function(e,n){"use strict";var o;return{setters:[e=>{o=e.t}],execute:function(){e("_",Vue.defineComponent({__name:"Component",props:{config:{default:()=>({})},model:{default:()=>({})}},setup(e){const n=e,t=Vue.inject("app"),c=Vue.computed((()=>`magic-ui-${o(n.config.type)}`)),i=Vue.computed((()=>t?.transformStyle(n.config.style)));return(e,o)=>(()=>{if(!1===n.config.visible)return!1;const e=n.config?.display;return"function"==typeof e?e(t):!1!==e})()?(Vue.openBlock(),Vue.createBlock(Vue.resolveDynamicComponent(c.value),{key:0,ref:"component",id:e.config.id,class:Vue.normalizeClass("magic-ui-component"+(e.config.className?` ${e.config.className}`:"")),style:Vue.normalizeStyle(i.value),config:e.config},null,8,["id","class","style","config"])):Vue.createCommentVNode("",!0)}}))}}}));
//# sourceMappingURL=Component.vue_vue_type_script_setup_true_lang-legacy-f269d8bc.js.map
