<template>
<div>
    <ul v-for="item in value" :key="item">
        <li v-if="type==='img'">
            <img src="item">
            <span v-if="!readonly" @click="delete(item)"><i class="el-icon-remove"></i></span>
        </li>
        <li v-else="type==='file'">
            <a :href="item"></a>
            <span v-if="!readonly" @click="delete(item)"><i class="el-icon-remove"></i></span>
        </li>
    </ul>
    <el-button v-if="!readonly">上传</el-button>
    </div>
</template>
<script>
define([
    'vue',
], function(Vue) {
    'use strict';
    return Vue.component('l-fileinput',{
        template:template,
        props:['readonly','value','type','multi','remote'],
        data(){
            return {
                list:[]
            }
        },
        mounted(){
            this.list=value
        },
        methods:{
            upload(){
                //upload file
                var value="/upload/1.jpg"
                //trigger event
                this.list.push(value)
                this.$emit('change',this.list)
            },
            delete(item){ 
                var index=this.list.indexOf(item)
                if(index>-1){
                    this.list.slice(index,1)
                     this.$emit('change',this.list)
                }

            }
        }
    })
});
</script>
