<template>
  <el-option
           :label="config.atr.label"
           :value="config.atr.value">
           <!-- {{config.text}} -->
  </el-option>
</template>

<script>
// import Component from '../../Component.vue';

export default {
  // 外层边框组件+app名称+页面名称
  data () {
    return {

    };
  },
  components: {
    // 'magic-ui-component': Component,
  },
  props: ['config'],
  watch: {


  },
  created () { },
  mounted () {

  },
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>
