<template>
  <el-badge :value="config.atr.value || 0">
    <magic-ui-component v-for="item in config.items"
                        :key="item.id"
                        :config="item"></magic-ui-component>
  </el-badge>
</template>

<script>
import Component from '../../Component.vue';

export default {
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
