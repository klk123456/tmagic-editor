<template>
  <el-pagination
    :page-size="config.atr.pagesize"
    :pager-count="config.atr.pagercount"
    layout="prev, pager, next"
    :total="config.atr.total">
  </el-pagination>
</template>

<script>
import Component from '../../Component.vue';

export default {
  data () {
    return {

    };
  },
  components: {
    'magic-ui-component':Component
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