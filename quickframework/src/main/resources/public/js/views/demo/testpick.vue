<template>
<div>
    <l-pickupfield
    :entityName="''"
    :multiPick="true"
    :pickFields=pickFields
    v-model="pick"
    ></l-pickupfield>
<el-button primary @click="getValue">get value </el-button>
<el-button primary @click="setValue">set value </el-button>
    </div>
</template>
<script>
define([
    'require',
    'vue',
    'v!views/common/pickupfield'
], function(require, Vue) {
    'use strict';
return Vue.component('l-test-pick',{
    template:template,
    data(){
        return {pick:[10],pickFields:["id","loginName"]}
    },
    methods:{
        getValue(){
            var _this=this
            console.info(JSON.stringify(_this.pick))
        },
        setValue(){
            this.pick=10
        }
    }
})
});
</script>
