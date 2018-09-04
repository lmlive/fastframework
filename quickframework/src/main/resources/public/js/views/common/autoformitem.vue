<template  >
     
    <el-form-item v-if="cmeta.uiMeta.visable" :label="cmeta.title" :prop="cmeta.dataKey" :rules="rules">
    <el-input v-if="cmeta.uiMeta.uiType==='RichContent'" autosize type="textarea" v-model="cvalue"></el-input>

    <template v-else-if="cmeta.uiMeta.uiType==='Boolean'">
        <el-radio v-model="cvalue" label="true">是</el-radio>
        <el-radio v-model="cvalue" label="false">否</el-radio>
        <el-radio v-model="cvalue" label="">未知</el-radio>
    </template>

    <el-input v-else-if="cmeta.uiMeta.uiType==='Password'" v-model="cvalue" type="password"></el-input>

    <template v-else-if="cmeta.uiMeta.uiType==='Number'">
        <el-input-number v-model="cvalue" label="cmeta.title"></el-input-number>

    </template>

    <el-date-picker v-else-if="cmeta.uiMeta.uiType==='Date'" value-format="yyyy-MM-dd" v-model="cvalue" type="date" placeholder="选择日期">
    </el-date-picker>

    <el-date-picker v-else-if="cmeta.uiMeta.uiType==='DateTime'"  value-format="yyyy-MM-dd HH:mm:ss" v-model="cvalue" type="datetime" placeholder="选择日期">
    </el-date-picker>

    <el-upload v-else-if="cmeta.uiMeta.uiType==='Img'" :multiple="cmeta.uiMeta.multi" class="upload-demo" action="uploadUrl" :file-list="getupfilelist(cvalue)" ist-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
    </el-upload>

    <el-upload v-else-if="cmeta.uiMeta.uiType==='File'" class="upload-demo" :multiple="cmeta.uiMeta.multi" action="uploadUrl" :file-list="getupfilelist(cvalue)">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传文件</div>
    </el-upload>

    <l-dictionary v-else-if="cmeta.uiMeta.uiType==='Dictionary'" :key="cmeta.uiMeta.dictKey" :group="cmeta.uiMeta.dictGroup" :source="dictUrl" :readonly="false" v-model="cvalue"></l-dictionary>

     <l-pickupfield  v-else-if="cmeta.uiMeta.uiType==='Pick'" 
            :entityName="cmeta.uiMeta.pickEntityShortName"    
            :multiPick="cmeta.uiMeta.multiPick"   
            :pickFields="cmeta.uiMeta.pickColumns"
                v-model="cvalue"></l-pickupfield>   
   
   
    <l-embedded :readonly="false" v-else-if="cmeta.uiMeta.uiType==undefined" v-model="cvalue" :columnMeta="cmeta"></l-embedded>

    <template v-else>
        <el-input v-model="cvalue" type="text"></el-input>
    </template>
    </el-form-item>
     
</template>
<script>
define([
  "vue",
  "v!views/common/embedded",
  "v!views/common/dictionary",
   "v!views/common/pickupfield"
], function(Vue) {
  return Vue.component("l-autoformitem", {
    template: template,
    props: {
      cmeta: { required: true },
      value: { required: true }
    },
    data() {
      return {
        dictUrl: this.$http.addUrl("dictionary.json"), // config.service.dictionaryPath),
        cvalue: this.value,
        rules:[]
      };
    },
    watch: {
      value: function(v) {
        this.cvalue = v;
      },
      cvalue: function(v) {
        this.$emit("input", v);
      }
    },
    created(){ 
      console.info('created'+this.cmeta.uiMeta.validMeta.length)
         var rule=[]
          this.cmeta.uiMeta.validMeta.forEach(d=>{
              rule.push({message:d.errorMsg, pattern:d.regEx,required:d.required})
          })
          this.rules=rule
          console.info(this.rules)
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
      }
    }
  });
});
</script>

