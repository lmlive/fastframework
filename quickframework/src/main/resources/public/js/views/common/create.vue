<template>
 
     <el-dialog :visible.sync="show" @open="loaddata">
    <el-form   ref="dataForm"  label-width="80px">
      <el-form-item v-for="item in columns" :label="item.title" :prop="item.dataKey" :key="item.dataKey">
       <l-column :readonly="false" :cmeta="item" v-model="entity[item.dataKey]"></l-column>


      </el-form-item>
       <el-button @click="save">保存</el-button>
    </el-form>
   </el-dialog>
 
</template>

<script>
define(["require", "vue", "v!views/common/dictionary", "config",'v!views/common/column'], function(
  require,
  Vue,
  d,
  config
) {
  "use strict";
  return Vue.component("l-create", {
    template: template,
    props: ["entityName", "id", "show"],
    data() {
      return {
        dictUrl: this.$http.addUrl("dictionary.json"), // config.service.dictionaryPath),
        columns: [],
        entity: {},
        uploadUrl:this.$http.addUrl(config.service.uploadPath)
      };
    },

    methods: {
      save() {
        this.$message("正在保存。。。。。");
        console.info(this.entity);
      },
      getupfilelist(data) {
        if (data instanceof Array) {
          if (data.length > 0)
            return data.map(d => {
              return { name: d, url: d };
            });
          return [];
        } else {
          if (data) return [{ name: data, url: data }];
          else return [];
        }
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
            this.$message("get column info error ," + ex);
          });

        //get entity info
        if (this.id != undefined) {
          var mockEntitiyInfo = "entity/user.json?id=" + this.id;
          this.$http({ url: this.$http.addUrl(mockEntitiyInfo) })
            .then(({ data }) => {
              self.entity = data.data;
            })
            .catch(ex => {
              this.$message("get entity info error ," + ex);
            });
        }
      },
      getColumnValue(column) {
        return this.entity[column.dataKey] + "";
      }
    }
  });
});
</script>
