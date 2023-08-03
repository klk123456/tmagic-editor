<template>
  <el-card :header="config.atr.header"
           :shadow="config.atr.shadow">
    <magic-ui-component v-for="item in config.items"
                        :key="item.id"
                        :config="item"></magic-ui-component>
  </el-card>
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
