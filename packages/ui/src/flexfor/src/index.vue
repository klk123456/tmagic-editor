<template>
  <div class="flex"
       :style="{flexDirection:config.direction}">
    <div v-for="item of config.nums" :key="item">
      <magic-ui-component v-for="item in config.items"
                          :key="item.id"
                          :config="item"></magic-ui-component>
    </div>

  </div>
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
  created () {
  },
  mounted () {

  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  
}
</style>
