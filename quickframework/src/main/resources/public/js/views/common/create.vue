<template>
 
     <el-dialog :visible.sync="show" @open="loaddata">
    <el-form   ref="dataForm"  label-width="80px">
      <el-form-item v-for="item in columns" :label="item.title" :prop="item.dataKey" :key="item.dataKey">
        <el-input v-if="item.uiMeta.uiType==='RichContent'" autosize  type="textarea"  v-model="entity[item.dataKey]"></el-input>
        
          <template  v-else-if="item.uiMeta.uiType==='Boolean'">
            <span v-if="entity[item.dataKey]">是</span>
            <span v-else>否</span>
         </template>

 <el-input     v-else-if="item.uiMeta.uiType==='Password'" 
 v-model="entity[item.dataKey]" type="password" ></el-input>
  
    
   
      <el-input-number v-model="entity[item.dataKey]"  
        v-else-if="item.uiMeta.uiType==='Number'"  
          label="item.title"></el-input-number>
      v-else-if="item.uiMeta.uiType==='File'"
      
      <el-date-picker v-else-if="item.uiMeta.uiType==='Date'"
      v-model="entity[itme.dataKey]"
      type="date"
      placeholder="选择日期">
    </el-date-picker>

      <el-date-picker v-else-if="item.uiMeta.uiType==='DateTime'"
      v-model="entity[itme.dataKey]"
      type="datetime"
      placeholder="选择日期">
    </el-date-picker>

  <el-upload  v-else-if="item.uiMeta.uiType==='Img'"
  class="upload-demo"
  action="/"
  :file-list="getupfilelist(entity[item.dataKey])"
  list-type="picture">
</el-upload>

 <el-upload  v-else-if="item.uiMeta.uiType==='File'"
  class="upload-demo"
  action="/"
  :file-list="getupfilelist(entity[item.dataKey])">
</el-upload> 

<span   v-else-if="item.uiMeta.uiType==='Dictionary'">{{item.title}}</span>

<a href="/"   v-else-if="item.uiMeta.uiType==='Pick'">{{item.title}}</a>

<el-input v-else :value="entity[item.dataKey]" ></el-input>
      </el-form-item>
       
    </el-form>
   </el-dialog>
 
</template>

<script>
define(["require", "vue"], function(require, Vue) {
  "use strict";
  return Vue.component("l-create", {
    template: template,
    props: ["entityName", "id", "show"],
    data() {
      return {
        columns: [],
        entity: {}
      };
    },
     
    methods: {
      getupfilelist(data){
        if(data instanceof Array)
        {
          return data.map(d=>{return {name:d,url:d}})
        }else
        {
          return [{name:data,url:data}]
        }
      },
      loaddata() {
        //get column metainfo
       
        var mock = "entity/user.columnmeta.json?entityName="+this.entityName;
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
        var mockEntitiyInfo = "entity/user.json?id=" + this.id;
        this.$http({ url: this.$http.adornUrl(mockEntitiyInfo) })
          .then(({ data }) => {
            self.entity = data.data;
          })
          .catch(ex => {
            alert(ex);
          });
      },
      getColumnValue(column) {
        return this.entity[column.dataKey]+"";
      }
    }
  });
});
</script>
