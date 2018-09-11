<template>
  <span v-if="readonly">
    {{txt}}</span>
  <el-select v-model="dvalue" placeholder="请选择" :loading="loading" v-else>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
define(["vue", 'utils/util'], function(Vue, util) {
  "use strict";
  var dictCacheRoot = "CACHE_DICT_"
  return Vue.component("l-dictionary", {
    template: template,
    props: ["group", "dkey", "value", "source", "readonly"],
    data() {
      return { dvalue: null, options: [], txt: null,loading:false };
    },
    watch: {
      dvalue: function(v) {
        this.$emit('input', this.dvalue)
      }
    },
    methods: {
      loadFromServer() {
        var self = this;
        var cacheKey = dictCacheRoot + self.group + self.dkey;
        var cachedata = util.cache.get(cacheKey);
        if (cachedata) {
          self.bindData(cachedata)
          util.cache.put(cacheKey, cachedata)
          return;
        }
        self.loading=true
        self
          .$http({ url: self.source })
          .then(({ data }) => {
            self.loading=false
            if (data.code == 0) {
              var dict = data.data.value
              var options = Object.getOwnPropertyNames(dict).map(d => {
                return { "value": d, "label": dict[d] }
              })
              util.cache.put(cacheKey, options)
              self.bindData(options)

            } else {
              self.$message("加载字典出错");
            }
          })
          .catch(ex => {
            self.$message("load dictionary data failed" + ex);
          });
      },
      bindData(data) {
       var self=this
        if (this.readonly) {
          data.forEach(function(e) {
            if (e.value == self.value) {
              self.txt = e.label;
              return;
            }
          });

        } else {
          this.options = data
          if (this.value != undefined)
            this.dvalue = this.value + ''
        }






      }
    },
    mounted() {
      var self = this;
      if (typeof source == Array) {
        bindData(self.source)
        
      } else {
        self.loadFromServer()
      }
    }
  });
});
</script>

