import{_ as s}from"./Component.vue_vue_type_script_setup_true_lang-fa00224b.js";import{u as a}from"./useApp-d5521bba.js";import"./index-8dbe6a62.js";const u=["id"],p=Vue.defineComponent({__name:"index",props:{config:{},model:{default:()=>({})}},setup(i){const n=i,o=Vue.inject("app"),c=Vue.computed(()=>o==null?void 0:o.transformStyle(n.config.style||{})),l=()=>{window.location.reload()};return a({config:n.config,methods:{refresh:l}}),(e,r)=>(Vue.openBlock(),Vue.createElementBlock("div",{id:"".concat(e.config.id||""),class:Vue.normalizeClass("magic-ui-page magic-ui-container magic-layout-".concat(e.config.layout).concat(e.config.className?" ".concat(e.config.className):"")),style:Vue.normalizeStyle(c.value)},[Vue.renderSlot(e.$slots,"default"),(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(e.config.items,t=>(Vue.openBlock(),Vue.createBlock(s,{key:t.id,config:t},null,8,["config"]))),128))],14,u))}});export{p as default};
//# sourceMappingURL=index-25b2ca0e.js.map
