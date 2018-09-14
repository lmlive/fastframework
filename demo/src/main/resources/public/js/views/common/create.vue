<template>
<div v-loading="loading">
    <l-navbread :navs="navs()"></l-navbread>
    <el-form  :model="entity" size="mini" label-width="20%" ref='form'>
      <l-autoformitem v-if="item.uiMeta.insertAble && !item.uiMeta.disAsReadOnly"
       v-for="item in columns" 
       :cmeta="item"
       v-model="entity[item.dataKey]"
       :key="item.dataKey">
      </l-autoformitem>
      <el-form-item >
        <el-button @click="save" icon="el-icon-circle-check-outline">保存</el-button>
          <el-button @click="()=>{this.$router.back()}" icon="el-icon-back">返回</el-button>
      </el-form-item>
      
    </el-form>
</div>
</template>

<script>
define([
  "require",
  "vue",
  "v!views/common/dictionary",
  "config",
  "v!views/common/autoformitem",
    "v!views/common/navbread"
], function(require, Vue, d, config) {
  "use strict";
  return Vue.component("l-create", {
    template: template,
    data() {
      return {
        dictUrl: this.$http.addUrl(config.service.dictionaryPath),
        columns: [],
        entity: {},
        id: null,
        entityMeta: {},
        entityName: null,
        uploadUrl: this.$http.addUrl(config.service.uploadPath),
          loading:true
       
      };
    },
    methods: {
        navs(){
            const  data=[]
            data.push({name:'首页',path:'/'})
            data.push({name:this.entityMeta.title+'列表',path:config.service.entityListPath+this.entityName})
            data.push({name:this.entityMeta.title+'创建'})
            return data
        },
      save() {
          const _this=this;
        this.$refs['form'].validate(v=>{
          if(v){
       this.$message("正在保存。。。。。");

        this.$http.post(this.$http.addUrl(config.service.entityInsertPath+_this.entityName),this.entity).

        	then(({data})=>{
        	if(data.code===0){
        		_this.$message('保存成功');
        		_this.$router.back()
        	}else
        	{
        	 _this.$message('保存失败：'+data.msg)
        	}
        	}).catch(e=>{
        	_this.$message('操作失败 '+e)
        	})
          }
        })
     
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
          this.loading=true
        // var mock = "entity/user.columnmeta.json?entityName=" + this.entityName;
        const  self = this;
        this.$http({ url: this.$http.addUrl(config.service.columnMetaPath+this.entityName) })
          .then(({ data }) => {
              self.loading=false
            if (data.code === 0) {
              self.columns = data.data;
            }
          })
          .catch(ex => {
            this.$message("get column info error ," + ex);
          });

        self.loadEntityMeta();
      },
  
      loadEntityMeta() {
        var self = this;

        // var mockEntitiyMeta ="entity/user.entitymeta.json?entityName" + this.entityName;
        this.$http({ url: this.$http.addUrl(config.service.entityMetaPath+this.entityName) })
          .then(({ data }) => {
            self.entityMeta = data.data;
          })
          .catch(ex => {
            this.$message("get entityMeta   error ," + ex);
          });
      },
      getColumnValue(column) {
        return this.entity[column.dataKey] + "";
      },
      reset() {
        this.columns = [];
        this.entity = {};
        this.id = null;
        this.entityMeta = [];
        this.entityName = null;
      }
    },

      activated(){
          this.entityName = this.$route.params.entityName;
          this.id = this.$route.params.id;
          this.loaddata();
      },
      beforeRouteUpdate(to,from,next){
          this.entityName = to.params.entityName;
          this.id =to.params.id;
          this.loadData();
          next()
      }

  });
});
</script>
