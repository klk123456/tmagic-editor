<template>
  <el-progress :stroke-width="config.pgsStrokeWidth" :width="config.pgsWidth" :color="config.color" :type="config.progressType ? config.progressType : undefined " :percentage="parseInt(config.progress)"/>

</template>

<script>
// 页面倒计时组件

export default {
  name: 'my-progress',
  data() {
    return {
    };
  },
  computed: {

  },
  props: ['config'],
  watch: {
    
  },
  methods: {
   
  },
  mounted() {
   
  },
  beforeUnmount() {
  },
};
</script>

<style lang="scss">

</style>
