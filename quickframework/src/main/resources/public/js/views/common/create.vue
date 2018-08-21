<template>
 
     <el-dialog :visible.sync="show" @open="loaddata">
    <el-form   ref="dataForm"  label-width="80px">
      <el-form-item v-for="item in columns" :label="item.title" :prop="item.dataKey" :key="item.dataKey">
        <el-input v-if="item.uiMeta.uiType==='RichContent'" autosize  type="textarea"  v-model="entity[item.dataKey]"></el-input>
        
          <template  v-else-if="item.uiMeta.uiType==='Boolean'">
            <span v-if="entity[item.dataKey]">是</span>
            <span v-else>否</span>
         </template>

 <el-input v-else-if="item.uiMeta.uiType==='Password'" 
 v-model="entity[item.dataKey]" type="password" ></el-input>
  
    <template  v-else-if="item.uiMeta.uiType==='Number'"  >
      <el-input-number v-model="entity[item.dataKey]"  v-if="!item.key" 
          label="item.title"></el-input-number>
          <span v-else>{{entity[item.key]}}</span>
    </template>
   
    
      
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
  action="uploadUrl"
  :file-list="getupfilelist(entity[item.dataKey])"
  list-type="picture">
   <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

 <el-upload  v-else-if="item.uiMeta.uiType==='File'"
  class="upload-demo"
  action="uploadUrl"
  :file-list="getupfilelist(entity[item.dataKey])">
   <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">上传文件，且不超过500kb</div>
</el-upload> 

<l-dictionary   v-else-if="item.uiMeta.uiType==='Dictionary'" 
:key="item.uiMeta.dictKey" 
:group="item.uiMeta.dictGroup"
:source="dictUrl"
:readonly="false"
v-model="entity[item.dataKey]"
></l-dictionary>

<a href="/"   v-else-if="item.uiMeta.uiType==='Pick'">{{item.title}}</a>

<l-embedded v-else-if="item.uiMeta.uiType==undefined" :entity="entity" :columnMeta="item"></l-embedded>

<template v-else>
  <el-input  v-model="entity[item.dataKey]" v-if="!item.key"></el-input>
  <span v-else>{{entity[item.dataKey]}}</span>
</template>


      </el-form-item>
       <el-button @click="save">保存</el-button>
    </el-form>
   </el-dialog>
 
</template>

<script>
define(["require", "vue", "v!views/common/dictionary", "config"], function(
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
