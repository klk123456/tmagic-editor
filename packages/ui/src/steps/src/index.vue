<template>
  <el-steps :active="transInt(config._active)" finish-status="success" class="step">
    <el-step v-for="(step, index) in config.steps.split(',')" :key="index" :title="step" />
  </el-steps>
</template>

<script lang="ts">
// import props from '@editor/services/props';
export default {
  name: 'steps-ui',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },

    model: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const transInt = function (active: string) {
      let parse = 0;
      try {
        parse = parseInt(active, 10);
      } catch (e) {
        parse = 0;
      }
      return parse;
    };
    return { transInt };
  },
};
</script>
<style lang="scss" scoped></style>
