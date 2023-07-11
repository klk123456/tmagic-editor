<template>
  <div class="editor-app">
    <m-editor v-model="value"
              ref="editor"
              :menu="menu"
              :runtime-url="runtimeUrl"
              :props-configs="propsConfigs"
              :props-values="propsValues"
              :event-method-list="eventMethodList"
              :component-group-list="componentGroupList"
              :default-selected="defaultSelected"
              :moveable-options="moveableOptions"
              :auto-scroll-into-view="true"
              :stage-rect="stageRect">
      <template #workspace-content>
        <DeviceGroup v-model="stageRect"></DeviceGroup>
      </template>
    </m-editor>

    <el-dialog v-model="previewVisible"
               destroy-on-close
               class="pre-viewer"
               title="预览"
               :width="stageRect && stageRect.width">
      <iframe v-if="previewVisible"
              width="100%"
              :height="stageRect && stageRect.height"
              :src="previewUrl"></iframe>
    </el-dialog>
    <el-dialog v-model="showVueCode"
               class="pre-viewer"
               title="预览"
               :fullscreen="true">
      <VueCodeEditor ref="_firstRefs"
                     class="editor h-100"
                     :value="vueCode"
                     language="javascript"
                     theme="dracula"
                     :withFullscreenBtn="true"></VueCodeEditor>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { Coin, Connection, Document } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

// import serialize from "serialize-javascript";
import {
  editorService,
  MenuBarData,
  MoveableOptions,
  TMagicEditor,
} from "@tmagic/editor";
import type { MContainer, MNode } from "@tmagic/schema";
import { NodeType } from "@tmagic/schema";
import { CustomizeMoveableOptionsCallbackConfig } from "@tmagic/stage";
import { asyncLoadJs } from "@tmagic/utils";

import VueCodeEditor from "../../../packages/editor/src/components/VueCodeEditor.vue";
import { transVue } from "../../../packages/editor/src/utils/transvue";
import DeviceGroup from "../components/DeviceGroup.vue";
import componentGroupList from "../configs/componentGroupList";
import dsl from "../configs/dsl";

const { VITE_RUNTIME_PATH, VITE_ENTRY_PATH } = import.meta.env;
const runtimeUrl = `${VITE_RUNTIME_PATH}/playground/index.html`;
const router = useRouter();
const editor = ref<InstanceType<typeof TMagicEditor>>();
const previewVisible = ref(false);
const oldValue = ref(localStorage.getItem('magicDSL'));
let value = ref();

if (oldValue.value != null) {
  try {
    value.value = JSON.parse(oldValue.value);
  } catch (error) {
    value = ref(dsl);
  }
} else {
  value = ref(dsl);
}
// console.log(value.value);
// console.log(oldValue.value);

// 该属性是用于解析dsl文件中的json schema数据的
const defaultSelected = ref(dsl.items[0].id);
const propsValues = ref<Record<string, any>>({});
const propsConfigs = ref<Record<string, any>>({});
const eventMethodList = ref<Record<string, any>>({});
const stageRect = ref({
  // width: 1600,
  // height: 1280,
});
const showVueCode = ref(false);
const vueCode = ref("");
vueCode.value = transVue(value.value);
const previewUrl = computed(
  () =>
    `${VITE_RUNTIME_PATH}/page/index.html?localPreview=1&page=${
      editor.value?.editorService.get("page")?.id
    }`
);
const save = () => {
  // console.log(transVue);
  vueCode.value = transVue(value.value);
  // localStorage.setItem(
  //   'magicDSL',
  //   serialize(toRaw(value.value), {
  //     space: 2,
  //     unsafe: true,
  //   }).replace(/"(\w+)":\s/g, '$1: '),
  // );
  localStorage.setItem("magicDSL", JSON.stringify(value.value));
  editor.value?.editorService.resetModifiedNodeId();
};
const menu: MenuBarData = {
  left: [
    {
      type: "text",
      text: "魔方",
    },
  ],
  center: ["delete", "undo", "redo", "guides", "rule", "zoom"],
  right: [
    {
      type: "button",
      text: "Form Playground",
      handler: () => router.push("form"),
    },
    {
      type: "button",
      text: "Table Playground",
      handler: () => router.push("table"),
    },
    "/",
    {
      type: "button",
      text: "出码",
      icon: Connection,
      handler: async (services) => {        
        if (services?.editorService.get("modifiedNodeIds").size > 0) {
          try {
            await ElMessageBox.confirm(
              "有修改未保存，是否先保存再预览",
              "提示",
              {
                confirmButtonText: "保存并预览",
                cancelButtonText: "预览",
                type: "warning",
              }
            );
            save();
            ElMessage.success("保存成功");
          } catch (e) {
            console.error(e);
          }
        }
        const pageValue = editor.value?.editorService.get("page");
        vueCode.value = transVue(pageValue ? pageValue : value.value);
        showVueCode.value = true;
      },
    },
    "/",
    {
      type: "button",
      text: "预览",
      icon: Connection,
      handler: async (services) => {
        if (services?.editorService.get("modifiedNodeIds").size > 0) {
          try {
            await ElMessageBox.confirm(
              "有修改未保存，是否先保存再预览",
              "提示",
              {
                confirmButtonText: "保存并预览",
                cancelButtonText: "预览",
                type: "warning",
              }
            );
            save();
            ElMessage.success("保存成功");
          } catch (e) {
            console.error(e);
          }
        }
        previewVisible.value = true;
      },
    },
    {
      type: "button",
      text: "保存",
      icon: Coin,
      handler: () => {
        save();
        ElMessage.success("保存成功");
      },
    },
    {
      type: "button",
      text: "初始化",
      icon: Coin,
      handler:async () => {
        try {
            await ElMessageBox.confirm(
              "初始化后所有页面都会消失，不可恢复，确定要初始化？",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            );
            save();
            ElMessage.success("保存成功");
          } catch (e) {
            console.error(e);
          }
        value.value = ref(dsl).value;
        console.log(ref(dsl).value);

        save();
      },
    },
    "/",
    {
      type: "button",
      icon: Document,
      tooltip: "源码",
      handler: (service) => {
        // console.log(service?.uiService.get('showSrc'));
        service?.uiService.set("showSrc", !service?.uiService.get("showSrc"));
      },
    },
  ],
};

const moveableOptions = (
  config?: CustomizeMoveableOptionsCallbackConfig
): MoveableOptions => {
  const options: MoveableOptions = {};

  const id = config?.targetElId;
  if (!id || !editor.value) return options;

  const node = editor.value.editorService.getNodeById(id);

  if (!node) return options;

  const isPage = node.type === NodeType.PAGE;

  options.draggable = !isPage;
  options.resizable = !isPage;
  options.rotatable = !isPage;

  return options;
};

asyncLoadJs(`${VITE_ENTRY_PATH}/config/index.umd.cjs`).then(() => {
  propsConfigs.value = (globalThis as any).magicPresetConfigs;
});
asyncLoadJs(`${VITE_ENTRY_PATH}/value/index.umd.cjs`).then(() => {
  propsValues.value = (globalThis as any).magicPresetValues;
});
asyncLoadJs(`${VITE_ENTRY_PATH}/event/index.umd.cjs`).then(() => {
  eventMethodList.value = (globalThis as any).magicPresetEvents;
});

save();

editorService.usePlugin({
  beforeDoAdd: (config: MNode, parent?: MContainer | null) => {
    if (config.type === "overlay") {
      config.style = {
        ...config.style,
        left: 0,
        top: 0,
      };

      return [config, editorService.get("page")];
    }

    return [config, parent];
  },
});
</script>

<style lang="scss">
html {
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
}

.editor-app {
  width: 100%;
  height: 100%;

  .m-editor {
    flex: 1;
    height: 100%;
  }

  .el-overlay-dialog {
    display: flex;
  }

  .pre-viewer {
    margin: auto;

    .el-dialog__body {
      padding: 0;
    }
  }

  .menu-left {
    .menu-item-text {
      margin-left: 10px;
    }
  }
}
</style>
