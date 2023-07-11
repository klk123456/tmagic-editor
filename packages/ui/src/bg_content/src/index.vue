<template>
  <div class="content" :style="{ background: `url(${imgSrc.value})` }" />
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';

import { BgContent } from '../../types';
import useApp from '../../useApp';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<BgContent>,
      default: () => ({}),
    },

    model: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    useApp(props);
    const imgSrc = ref();
    // const changeBg = function (appName: string, pageName: string, imgName: string) {
    //   console.log(appName, pageName, imgName);
    //   imgSrc.value = new URL(`../../assets/Picture/${appName}/${pageName}/${imgName}`, import.meta.url).href;
    // };
    imgSrc.value = computed(
      () =>
        new URL(
          `../../assets/Picture/${props.config.appName}/${props.config.pageName}/${props.config.imgName}`,
          import.meta.url,
        ).href, 
    );

    // changeBg(props.config.appName, props.config.pageName, props.config.imgName);

    return {
      imgSrc,
      // changeBg,
    };
  },
});
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
  background-size: 100% 100% !important;
  box-shadow: 0px 3px 6px 0px rgba(29, 149, 118, 0.12);
}
</style>
