<template>
  <el-dialog :visible="show" @open="loaddata" @close="()=>{this.$emit('close')}">
    <el-form ref="dataForm" label-width="80px">
      <l-autoformitem v-for="item in columns" 
      :label="item.title" 
      :value="entity[item.dataKey]" 
      :cmeta="item" 
      :readonly="true" 
      :key="item.dataKey" />

    </el-form>
  </el-dialog>
</template>

<script>
define(["require", "vue", "v!views/common/autoformitem"], function(require, Vue) {
  "use strict";
  return Vue.component("l-info", {
    template: template,
    props: {entityName:{required:true}, id:{required:true},show:{required:true,type:Boolean,default:false}},
    data() {
      return {
        dictUrl: this.$http.addUrl("dictionary.json"), // config.service.dictionaryPath),
        columns: [],
        entity: {}
       
      };
    },
 
    methods: {
      getupfilelist(data) {
        if (data instanceof Array && data.length > 0) {
          return data.map(d => {
            return { name: d, url: d };
          });
        } else if (data) {
          return [{ name: data, url: data }];
        } else return [];
      },

      loaddata() {
        //get column metainfo

        var mock = "entity/user.columnmeta.json?entityName=" + this.entityName;
        var self = this;
        this.$http({ url: this.$http.addUrl(mock) })
          .then(({ data }) => {
            if (data.code === 0) {
              self.columns = data.data;
            }
          })
          .catch(ex => {
            self.$message('get column info error ,' + ex)
          });

        //get entity info
        var mockEntitiyInfo = "entity/user.json?id=" + this.id;
        this.$http({ url: this.$http.addUrl(mockEntitiyInfo) })
          .then(({ data }) => {
            self.entity = data.data;
          })
          .catch(ex => {
            self.$message('get entity info error ,' + ex)
          });
      },
      getColumnValue(column) {
        return this.entity[column.dataKey] + "";
      }
    }
  });
});
</script>
