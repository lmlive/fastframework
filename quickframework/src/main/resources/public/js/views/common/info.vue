<template>
 
     <el-dialog :visible.sync="show" @open="loaddata">
    <el-form   ref="dataForm"  label-width="80px">
      <el-form-item v-for="item in columns" :label="item.title+':'" :prop="item.dataKey" :key="item.dataKey">
        <el-input v-if="item.uiMeta.uiType==='RichContent'" autosize  type="textarea"  v-model="entity[item.dataKey]"></el-input>
        
          <template  v-else-if="item.uiMeta.uiType==='Boolean'">
            <span v-if="entity[item.dataKey]">是</span>
            <span v-else>否</span>
         </template>

      <span  v-else-if="item.uiMeta.uiType==='Password'"  >*************</span>
  
     
  <el-upload  v-else-if="item.uiMeta.uiType==='Img'"
  class="upload-demo"
  action="/"
  :before-remove="()=>{return false}"
  :file-list="getupfilelist(entity[item.dataKey])"
  list-type="picture">
</el-upload>

 <el-upload  v-else-if="item.uiMeta.uiType==='File'"
  class="upload-demo"
  action="/"
  :before-remove="()=>{return false}"
  :file-list="getupfilelist(entity[item.dataKey])">
</el-upload> 

<l-dictionary   v-else-if="item.uiMeta.uiType==='Dictionary'" 
:value="entity[item.dataKey]"
:dkey="item.uiMeta.dictKey" 
:group="item.uiMeta.dictGroup"
:source="dictUrl"
:readonly="true"
 
></l-dictionary>

<a href="/"   v-else-if="item.uiMeta.uiType==='Pick'">{{item.title}}</a>

<l-embedded v-else-if="item.uiMeta.uiType==undefined" :entity="entity" :columnMeta="item"></l-embedded>

<span v-else >{{entity[item.dataKey]}}</span>
</el-form-item>
       
    </el-form>
   </el-dialog>
 
</template>

<script>
define(["require", "vue", "v!views/common/embedded",'v!views/common/dictionary'], function(require, Vue) {
  "use strict";
  return Vue.component("l-info", {
    template: template,
    props: ["entityName", "id", "show"],
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
            self.$message('get column info error ,'+ex)
          });

        //get entity info
        var mockEntitiyInfo = "entity/user.json?id=" + this.id;
        this.$http({ url: this.$http.addUrl(mockEntitiyInfo) })
          .then(({ data }) => {
            self.entity = data.data;
          })
          .catch(ex => {
           self.$message('get entity info error ,'+ex)
          });
      },
      getColumnValue(column) {
        return this.entity[column.dataKey] + "";
      }
    }
  });
});
</script>
