<template>
  <el-radio-group size="small" v-model="viewerDevice" :class="viewerDevice" @change="deviceSelect">
    <el-radio-button label="pc">PC</el-radio-button>
    <el-radio-button label="phone">Phone</el-radio-button>
    <el-radio-button label="pad">Pad</el-radio-button>
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';

import { editorService } from '@tmagic/editor';

enum DeviceType {
  Phone = 'phone',
  Pad = 'pad',
  PC = 'pc',
}

const devH: Record<DeviceType, number> = {
  phone: 817,
  pad: 1024,
  pc: 1024,
};

const devW: Record<DeviceType, number> = {
  phone: 375,
  pad: 768,
  pc: 1280,
};

const getDeviceHeight = (viewerDevice: DeviceType) => devH[viewerDevice];

const getDeviceWidth = (viewerDevice: DeviceType) => devW[viewerDevice];

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        width: 375,
        height: 817,
      }),
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const calcFontsize = (width: number) => {
      const iframe = editorService.get('stage')?.renderer.iframe;
      // console.log(iframe);

      if (!iframe?.contentWindow) return;
      if (!iframe?.contentWindow.appInstance) return;
      iframe.contentWindow.appInstance.designWidth = width;
    };

    const viewerDevice = ref(DeviceType.Phone);
    function deviceSelect(device: DeviceType) {
      const width = getDeviceWidth(device);
      const height = getDeviceHeight(device);
      emit('update:modelValue', {
        width,
        height,
      });
      calcFontsize(width);
    }
    // nextTick(() => {
    //   viewerDevice.value = DeviceType.PC;
    //   deviceSelect(viewerDevice.value);
    // });

    return {
      viewerDevice,
      deviceSelect,
    };
  },
});
</script>

<style lang="scss">
.m-editor-workspace {
  * {
    user-select: none;
  }

  .el-slider {
    position: absolute;
    bottom: 40px;
    left: 20px;
    width: 250px;
    opacity: 0.5;
    transition: opacity 1s;
  }

  .el-slider:hover {
    opacity: 1;
  }

  .el-radio-group {
    position: absolute;
    top: 10px;
    right: 40px;
    z-index: 10;
  }

  .viewer-scrollbar > .el-scrollbar__bar {
    display: none;
  }

  .select-component {
    text-align: center;
    transform: translate3d(0, -70px, 0);

    p {
      margin-top: 8px;
    }
  }

  .close-pop-button {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
