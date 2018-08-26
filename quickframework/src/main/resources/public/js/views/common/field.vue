<template  >
 <span v-show="show">
    <template v-if="readonly">
        <template v-if="cmeta.uiMeta.visable">
        <el-input v-if="cmeta.uiMeta.uiType==='RichContent'" autosize type="textarea" readonly v-model="cvalue"></el-input>

        <template v-else-if="cmeta.uiMeta.uiType==='Boolean'">
            <span v-if="cvalue==null"></span>
            <span v-else-if="cvalue">是</span>
            <span v-else>否</span>
        </template>

        <span v-else-if="cmeta.uiMeta.uiType==='Password'">*************</span>

        <el-upload v-else-if="cmeta.uiMeta.uiType==='Img'" class="upload-demo" action="/" :before-remove="()=>{return false}" :file-list="getupfilelist(cvalue)" list-type="picture">
        </el-upload>

        <el-upload v-else-if="cmeta.uiMeta.uiType==='File'" class="upload-demo" action="/" :before-remove="()=>{return false}" :file-list="getupfilelist(cvalue)">
        </el-upload>

        <l-dictionary v-else-if="cmeta.uiMeta.uiType==='Dictionary'" :value="cvalue" :dkey="cmeta.uiMeta.dictKey" :group="cmeta.uiMeta.dictGroup" :source="dictUrl" :readonly="true"></l-dictionary>

        <a href="/" v-else-if="cmeta.uiMeta.uiType==='Pick'">{{cmeta.title}}::::TODO</a>

        <l-embedded v-else-if="cmeta.uiMeta.uiType==undefined" :value="cvalue" :columnMeta="cmeta"></l-embedded>

        <span v-else>{{cvalue}}</span>
        </template>
    </template>

    <template v-else>
         
        <el-input v-if="cmeta.uiMeta.uiType==='RichContent'" autosize type="textarea" v-model="cvalue" ></el-input>

        <template v-else-if="cmeta.uiMeta.uiType==='Boolean'">
            <el-radio v-model="cvalue" label="true">是</el-radio>
           <el-radio v-model="cvalue" label="false">否</el-radio>
           <el-radio v-model="cvalue" label="">未知</el-radio>
        </template>

        <el-input v-else-if="cmeta.uiMeta.uiType==='Password'" v-model="cvalue" type="password" ></el-input>

        <template v-else-if="cmeta.uiMeta.uiType==='Number'">
            <el-input-number v-model="cvalue" label="cmeta.title"></el-input-number>

        </template>

        <el-date-picker v-else-if="cmeta.uiMeta.uiType==='Date'" v-model="cvalue" type="date" placeholder="选择日期">
        </el-date-picker>

        <el-date-picker v-else-if="cmeta.uiMeta.uiType==='DateTime'" v-model="cvalue" type="datetime" placeholder="选择日期">
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

        <a href="/" v-else-if="cmeta.uiMeta.uiType==='Pick'">{{cmeta.title}}</a>

        <l-embedded :readonly="false" v-else-if="cmeta.uiMeta.uiType==undefined" v-model="cvalue" :columnMeta="cmeta"></l-embedded>

        <template v-else>
            <el-input v-model="cvalue"  ></el-input>
        </template>
       
    </template>
 </span>
</template>
<script>
define(['vue', 'v!views/common/embedded', 'v!views/common/dictionary'], function(Vue) {
    return Vue.component('l-field', {
        template: template,
        props: {
            readonly:{type:Boolean,default:false},
            cmeta:{required:true},
            value:{required:true},
            show:{type:Boolean,default:true}
        },
        data() {
            return {
                  dictUrl: this.$http.addUrl("dictionary.json"), // config.service.dictionaryPath),
                  cvalue:this.value,
                
            }
        },
        watch:{
            value:function(v){
                this.cvalue=v
            },
            cvalue:function(v){
                this.$emit('input',v)
            }
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
        }

    })
})

</script>

