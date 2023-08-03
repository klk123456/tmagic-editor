import { MApp, MComponent } from "@tmagic/schema";
export const transVue = function (json: MComponent) {
  const fn = json.codeBlocks;
  let method = "";
  // 取代码块里的函数，拼接好后插入method中
  if (fn) {
    Object.keys(fn).forEach((key) => {
      const fnItem = fn[key];
      method += `${key}:${fnItem.content},\n`;
    });
  }
  // 驼峰aB转a-b
  function toLine(name: string) {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  // 记录各个组件的个数，方便为各个组件绑定的数据命名
  const count = new Map();
  // 递归获取Vue模板
  function deepComponent(component: MComponent) {
    // 元素不一定存在的属性（摒弃type、id、name、layout、style、events、created、items、其余均作为config参数传给组件)
    const ban = new Set([
      "type",
      "id",
      "name",
      "layout",
      "style",
      "events",
      "created",
      "items",
      "HyperText",
      "atr",
      "mounted",
      "multiple"
    ]);
    // 基础组件不存在外层DIV包裹。
    const base = new Set([
      "img",
      "ul",
      "li",
      "ol",
      "input",
      "button",
      "el-link",
      "el-badge",
      "div",
      "el-card",
      "el-tabs",
      "el-tab-pane",
      "el-menu",
      "el-menu-item",
      "el-cascader",
      "el-option",
      "el-select",
      "el-date-picker",
      "table",
      "thead",
      "tbody",
      "th",
      "tr",
      "td"
    ]);
    // 没有终止符的标签
    const notEnd = new Set(["img", "input"]);
    // 非字符型数据
    const specialData = new Set(["isRemind", "isGray", "isActive", "isRead", "nums"]);
    // 有一些元素，虽然是纯数字，但是不能存在px作为单位，下列是对某些参数进行处理。
    const num = new Set(["fontWeight"]);
    // 组件封装出来的Data,总的Data包括多条数据
    let data = "";
    // 封装组件Data的Value,例如data(){return {key:value}}这段代码中attr就表述value
    let attr = "{\n";

    // 提取元素id的数字作为组件的标识数（可以依据个人意愿进行修改，甚至可以用计数法由1~N）
    // const no = component.id.toString().replace(/[^\d]/g, '');

    // 封装组件Data的Key,例如data(){return {key:value}}这段代码中propsName就表述key
    let propsName = "";
    // 读取属性条,存在标签的才读取，不存在标签不需要data,例如文本组件，他text静态贴入外层了，则无需data数据了。
    if (component.HyperText) {
      Object.keys(component || {}).forEach((key) => {
        // 特殊的数据指非字符串类型数据
        if (specialData.has(key)) {
          attr += `${key}:${component[key]},`;
        } else if (!ban.has(key)) {
          attr += `${key}:"${component[key]}",`;
        }
      });
      if(component.atr && component.atr['v-model']){
        attr += `model : "${component.atr['v-model']}"`
      }
      attr += "}";
      if (attr != "{\n}") {
        if (count.has(`config_${component.type}`)) {
          const num = count.get(`config_${component.type}`);
          count.set(`config_${component.type}`, num + 1);

          propsName = `config_${component.type}${num}`;
        } else {
          count.set(`config_${component.type}`, 1);
          propsName = `config_${component.type}`;
        }

        // propsName = `config_${component.type}${no}`;
        // 属性不为空的时候才会加入到data中。
        data += `${propsName}: ${attr},`;
      }
    }

    // 读取class
    let style = `.${component.id} { \n`;
    // class内部样式
    Object.keys(component.style || {}).forEach((styleName) => {
      // 这里有条es的规则，他担心component的style为空，禁止直接引用style对象，实际上我就是遍历style的key。
      if (component?.style && component.style[styleName]) {
        const isNum = isNaN(component.style[styleName]) ? "" : num.has(styleName) ? "" : "px";
        // transform 属性值为一个对象，所以要对他单独处理
        if (styleName == "transform") {
          const obj = component.style[styleName];
          let value = "";
          Object.keys(obj || {}).forEach((key) => {
            // 若无属性则不需要添加了
            if (obj[key]) {
              value += `${key}(${parseInt(obj[key])}${key == "rotate" ? "deg" : ""}) `;
            }
          });
          // 若有属性则添加
          if (value.length > 0) {
            style += `${toLine(styleName)}:${value};\n`;
          }
        } else {
          if (styleName == "backgroundImage") {
            style += `${toLine(styleName)}:${
              component.style ? "'" + component.style[styleName] + "'" + isNum : ""
            };\n`;
          } else {
            style += `${toLine(styleName)}:${
              component.style ? component.style[styleName] + isNum : ""
            };\n`;
          }
        }
      }
    });
    //单独处理基础组件图片
    // if(component.HyperText == 'img'){
    //   console.log("!")
    //   style += `background-image:url('${component['src']}'});`
    //   style += 'background-size:100% 100%;';
    // }
    style += "}";

    // 贴入标签上的class属性
    let domClass = `class="${component.id}"`;
    if (!component.style) {
      style = "";
      domClass = "";
    }
    let itemCreated = "";
    // 组件调用的方法，意义不大，很少使用，是代码块的代码。
    if (component.created?.hookData) {
      for (const method of component.created.hookData) {
        let params = "";
        Object.keys(method.params).forEach((key, index) => {
          // 暂时无法辨别数字变量还是字符串变量，统一默认为字符串变量
          if (index > 0) {
            params += `,`;
          }
          params += `"${method.params[key]}"`;
        });
        itemCreated += `this.${method.codeId}(${params});`;
      }
    }
    // 拼接Template内的内容
    let html = "";
    if (!base.has(component.HyperText)) {
      html += `<div ${domClass}> `;
    }
    // console.log(` ${component.HyperText == 'img' ? domClass : ''}`);
    html += component.HyperText
      ? `<${component.HyperText} ${
          base.has(component.HyperText) ? domClass : propsName ? ":config='" + propsName + "'" : ""
        } ${component.HyperText == "img" ? ":src='" + propsName + ".src'" : " "} `
      : "";

    // component的所有atr属性会已原名添加到基础组件属性中。
    Object.keys(component.atr || {}).forEach((key) => {
      if(key == 'v-model' && component.atr[key]){
        html += `v-model="${propsName}.model"`
      }
      else if (component.atr[key] || component.atr[key] === false) {
        html += `${key}="${component.atr[key]}" `;
      }
    });

    html += component.HyperText ? `id="${component.id}" >` : "";

    /* 递归读取内部的items拼接到html的中间，例如<div>...<items>...</items>...</div>
    同时递归取到items的style以及data,itemCreated也是函数调用的代码块,使用频率较少。*/
    if (component.items) {
      for (const deepItem of component.items) {
        const itemDom = deepComponent(deepItem);
        html += `${itemDom[0]}`;
        style += itemDom[1];
        itemCreated += itemDom[2];
        data += itemDom[3];
      }
    }
    html += `${component.text ? `${component.text}` : ""}`;
    if (component.HyperText && !notEnd.has(component.HyperText)) {
      html += `</${component.HyperText}>`;
    }
    if (!base.has(component.HyperText)) {
      html += "</div>";
    }
    return [html, style, itemCreated, data];
  }
  const component = json;
  let styles = "<style scoped>\n";
  let html = "<template>\n";
  let createdMethod = "";
  let data = "";
  const itemDom = deepComponent(component);
  html += itemDom[0];
  styles += itemDom[1];
  createdMethod = itemDom[2];
  data += itemDom[3];

  styles += "</style>";
  html += "</template>";
  // 模板可以自行删减。
  const scriptTemplate = `<script>  
  export default {
    name: '${json.name}',
    data(){
      return {
        ${data}
      }
      
    },
    watch: {},
    computed: {},
    beforCreate() {},
    created() {
      ${createdMethod}
    },
    mounted() {},
    beforeUpdate() {},
    update() {},
    destroyed() {},
    methods: {
      ${method}
    }
  }
  </script>\n`;
  return html + scriptTemplate + styles;
};
