<template>
  <el-tabs v-model="config.atr['v-model']" :type="config.atr.type" :tab-position="config.atr['tab-position']" height="500px" >
    <slot> <magic-ui-component v-for="item in config.items"
                          :key="item.id"
                          :config="item"></magic-ui-component></slot>
  </el-tabs>
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
