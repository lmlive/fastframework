<template  >
     
    <el-form-item v-if="cmeta.uiMeta.visable" :label="cmeta.title" :prop="cmeta.dataKey" :rules="rules">
    <el-input v-if="cmeta.uiMeta.uiType==='RichContent'" autosize type="textarea" v-model="cvalue" :rows="2"></el-input>

        <el-input v-else-if="cmeta.uiMeta.uiType==='TextArea'" autosize type="textarea" v-model="cvalue" :rows="2"></el-input>

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

    <el-upload v-else-if="cmeta.uiMeta.uiType==='Img'" :multiple="cmeta.uiMeta.multi" class="upload-demo" :action="uploadUrl" :file-list="getupfilelist(cvalue)" ist-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
    </el-upload>

    <el-upload v-else-if="cmeta.uiMeta.uiType==='File'" class="upload-demo" :multiple="cmeta.uiMeta.multi" :action="uploadUrl" :file-list="getupfilelist(cvalue)">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传文件</div>
    </el-upload>

    <l-dictionary v-else-if="cmeta.uiMeta.uiType==='Dictionary'" :key="cmeta.uiMeta.dictKey" :group="cmeta.uiMeta.dictGroup" :source="dictUrl" :readonly="false" v-model="cvalue"></l-dictionary>

     <l-pickupfield  v-else-if="cmeta.uiMeta.uiType==='Pick'" 
            :entityName="cmeta.uiMeta.pickEntityShortName"    
            :multiPick="cmeta.uiMeta.multiPick"   
            :pickFields="cmeta.uiMeta.pickColumns"
                v-model="cvalue"></l-pickupfield>   
   <l-form-item-enum v-else-if="cmeta.uiMeta.uiType==='Enum'" :source="cmeta.uiMeta.enumSource" v-model="cvalue"></l-form-item-enum>
   
    <l-embedded :readonly="false" v-else-if="cmeta.uiMeta.uiType==undefined" v-model="cvalue" :columnMeta="cmeta"></l-embedded>

    <template v-else>
        <el-input v-model="cvalue" type="text"></el-input>
    </template>
    </el-form-item>
     
</template>
<script>
define([
  "vue","config",
  "v!views/common/embedded",
  "v!views/common/dictionary",
   "v!views/common/pickupfield",
    "v!views/common/form-item-enum"
], function(Vue,config) {
  return Vue.component("l-autoformitem", {
    template: template,
    props: {
      cmeta: { required: true },
      value: { required: true }
    },
    data() {
      return {
        dictUrl: this.$http.addUrl(config.service.dictionaryPath),
        cvalue: this.value,
          shouldConvertValue:false,
        rules:[],
          uploadUrl:this.$http.addUrl(config.service.uploadPath)
      };
    },
    watch: {
      value: function(v) {
          if(v instanceof  Object){
              this.shouldConvertValue=true;
              this.cvalue=this.$JSON.stringify(v)
          }else
        this.cvalue = v;
      },
      cvalue: function(v) {
          if(this.shouldConvertValue)
          {
              try{
                  var d=this.$JSON.parse(v);
                  console.info(d)
                  this.$emit('input',d);
              }catch (e) {

              }

      }
          else
            this.$emit("input", v);
      }
    },
    created(){ 
         var rule=[]
          this.cmeta.uiMeta.validMeta.forEach(d=>{
              rule.push({message:d.errorMsg, pattern:d.regEx,required:d.required})
          })
          this.rules=rule
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

