<template>
<h3>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="item in cnavs">
                <el-breadcrumb-item v-if="item.path!=undefined && item.path.length>0"   :to="{ path: item.path}"><slot>{{item.name}}</slot></el-breadcrumb-item>
                <el-breadcrumb-item v-else  :to="{ path: item.path}"><slot>{{item.name}}</slot></el-breadcrumb-item>
            </template>
        </el-breadcrumb>
</h3>
</template>

<script>
     define(['vue'],function (Vue) {
         return Vue.component('l-navbread',{
             template:template,
             props:{
                 navs:{type:Array}
             },
             data(){
                 return {cnavs:this.navs}
             },
             watch:{
                 navs(v){
                     this.cnavs=v
                 }
             }
         })
     })
</script>
