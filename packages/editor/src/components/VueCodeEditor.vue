<template>
  <div class="wrap h-100">
    <div class="w-100 code-editor" :ref="generateId"></div>
  </div>
</template>
<script>
// 引入全局实例
import ace from 'ace-builds';

// import cssWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-css';
// import jsWorkerUrl from require('ace-builds/src-noconflict/worker-javascript');
// import jsonWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-json';
// import { cloneDeep } from '@/utils/tool';
// 主题风格，引入主题后还需要在 options 中指定主题才会生效
import 'ace-builds/src-min-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/theme-dracula';
// 支持代码格式， 需要引入具体的语法高亮库才会有对应的语法高亮效果
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/mode-json';
import 'ace-builds/src-min-noconflict/mode-css';
import 'ace-builds/src-min-noconflict/ext-language_tools';

import parserBabel from '../utils/parserBabel';
import parserHtml from '../utils/parserHtml';
// 引入prettier格式化代码,使用的是线上的资源，可以下载后本地使用
import parserCss from '../utils/parserPostCss';
import prettier from '../utils/standalone';
// ace.config.setModuleUrl('ace/mode/javascript_worker', jsWorkerUrl);
// ace.config.setModuleUrl('ace/mode/json_worker', jsonWorkerUrl);
// ace.config.setModuleUrl('ace/mode/css_worker', cssWorkerUrl);
// ace.config.setModuleUrl(
//   'ace/snippets/javascript',
//   require('file-loader!ace-builds/src-noconflict/snippets/javascript.js'),
// );
// ace.config.setModuleUrl('ace/snippets/css', require('file-loader!ace-builds/src-noconflict/snippets/css.js'));
export default {
  name: 'CodeEditor',
  model: {
    event: 'change',
  },
  props: {
    // 编辑器内容
    value: String,
    // 默认语言
    language: {
      type: String,
      default: 'javascript',
    },
    // 主题，对应主题库 JS 需要提前引入
    theme: {
      type: String,
      default: 'dracula',
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 最大行数
    maxLines: Number,
    // 是否显示全屏按钮
    withFullscreenBtn: {
      type: Boolean,
      default: true,
    },
    withFooterBtns: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null,
      generateId: `id_${Math.random().toString(36).substr(2, 4)}`,
      isVisible: false,
      dialogValue: '',
      option: {
        arrowParens: 'always',
        bracketSameLine: false,
        bracketSpacing: true,
        embeddedLanguageFormatting: 'auto',
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
        jsxSingleQuote: false,
        printWidth: 80,
        proseWrap: 'preserve',
        quoteProps: 'as-needed',
        requirePragma: false,
        semi: true,
        singleAttributePerLine: false,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
        vueIndentScriptAndStyle: false,
      },
    };
  },
  mounted() {
    // 初始化
    this.initEditor();
  },
  watch: {
    value(val) {
      if (this.editor.getValue() !== val) {
        let newValue = val;
        try {
          newValue = prettier.format(val, {
            semi: false,
            parser: 'vue',
            plugins: [parserHtml, parserBabel, parserCss],
          });
        } catch (e) {
          console.log(e);
        }
        this.editor.setValue(newValue);
        this.editor.clearSelection();
      }
    },
  },
  methods: {
    // 初始化
    initEditor() {
      // 创建实例
      let newValue = this.value;
      try {
        newValue = prettier.format(this.value, {
          semi: false,
          parser: 'vue',
          plugins: [parserHtml, parserBabel, parserCss],
        });
      } catch (e) {
        console.log(e);
      }

      // const code = prettier.format('<div>asyncLoadJs\n</div>', this.option);

      // console.log(code);

      this.editor = ace.edit(this.$refs[this.generateId], {
        mode: `ace/mode/${this.language}`,
        theme: `ace/theme/${this.theme}`,
        fontSize: 12,
        tabSize: 2,
        value: newValue,
        selectionStyle: 'text',
        maxLines: this.maxLines,
        readOnly: this.readonly,
      });
      // 设置属性等，具体需要可根据官方参数自行设置
      this.editor.setOptions({
        enableBasicAutocompletion: true,
        // enableSnippets: true,
        enableLiveAutocompletion: true,
        wrap: true,
        setShowPrintMargin: false,
      });
      // 设置值改变监听
      this.editor.on('change', () => {
        this.$emit('change', this.editor.getValue());
      });
    },
    // 实例方法，高亮某一行
    gotoLine(lineNumber) {
      this.editor.gotoLine(lineNumber);
    },
    // 全屏编辑
    fullscreen() {
      this.dialogValue = cloneDeep(this.editor.getValue());
      this.isVisible = true;
    },
    closeEditCode() {
      this.editor.setValue(this.dialogValue);
      this.editor.clearSelection();
    },
    // resize编辑器
    resize() {
      this.editor.resize(true);
    },
    destroy() {
      if (this.editor) {
        this.editor.destroy();
        this.editor = null;
      }
    },
  },
  beforeUnmount() {
    this.destroy();
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
  .code-editor {
    min-height: 200px;
    height: calc(100vh - 56px);
    border: 1px solid #282f3a;
    background-color: #0e1013;
  }
  .icon-fullscreen {
    position: absolute;
    // color: #fff;
    right: 10px;
    font-size: 16px;
    z-index: 9999;
    cursor: pointer;
  }
}
.code-dialog {
  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background-image: linear-gradient(270deg, #00deff, #2483ff 74%);
  }
  display: flex;
  flex-direction: column;
  background-color: #303640;
  .el-dialog__header {
    border: none;
    .el-dialog__title {
      color: #ccc;
    }
  }
  .el-dialog__body {
    flex: 1 1 0;
    padding-top: 10px;
  }
}
</style>
