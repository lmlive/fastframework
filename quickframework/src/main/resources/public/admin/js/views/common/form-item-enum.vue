<template>
  <span v-if="readonly"> {{txt}}</span>
  <el-select v-model="dvalue" placeholder="请选择" :loading="loading" v-else>
    <el-option v-for="item in source" :key="item" :label="item" :value="item">
    </el-option>
  </el-select>
</template>
<script>
define(["vue", 'utils/util'], function(Vue, util) {

  return Vue.component("l-form-item-enum", {
    template: template,
    props: [  "value", "source", "readonly"],
    data() {
      return { dvalue: null, options: [], txt: null,loading:false };
    },
    watch: {
      dvalue: function(v) {
        this.$emit('input', this.dvalue)
      }
    },


  });
});
</script>

