<template>
<div >
    <el-dialog :visible="show" @open="loaddata" >
    <el-form   ref="dataForm"  label-width="80px">
      <el-form-item v-for="item in columns" :label="item.title" :prop="item.dataKey">
        <el-input :value="getColumnValue(item)" ></el-input>
      </el-form-item>
       
    </el-form>
   
    </el-dialog>
</div>
</template>

<script>
define(["require", "vue"], function(require, Vue) {
  "use strict";
  return Vue.component("l-info", {
    template: template,
    props: ["entityName", "id", "show"],
    data() {
      return {
        columns: [],
        entity: {}
      };
    },
  
    methods: {
      loaddata() {
        //get column metainfo
        var mock = "entity/user.columnmeta.json?entityName="+entityName;
        var self = this;
        this.$http({ url: this.$http.adornUrl(mock) })
          .then(({ data }) => {
            if (data.code === 0) {
              self.columns = data.data;
            }
          })
          .catch(ex => {
            alert(ex);
          });

        //get entity info
        var mockEntitiyInfo = "entity/user.json?id=" + id;
        this.$http({ url: this.$http.adornUrl(mockEntitiyInfo) })
          .then(({ data }) => {
            self.entity = data.data;
          })
          .catch(ex => {
            alert(ex);
          });
      },
      getColumnValue(column) {
        return this.entity[column.dataKey];
      }
    }
  });
});
</script>
