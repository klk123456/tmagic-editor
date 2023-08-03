<template>
  <el-tab-pane :label="config.atr.label" >
    <slot></slot>
     <magic-ui-component v-for="item in config.items"
                          :key="item.id"
                          :config="item"></magic-ui-component>
  </el-tab-pane>
</template>

<script>
import Component from '../../Component.vue';

export default {
  // 外层边框组件+app名称+页面名称
  data () {
    return {

    };
  },
  components: {
    'magic-ui-component': Component,
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
