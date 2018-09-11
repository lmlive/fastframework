<template>
<div>
    <p>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/system/entity/list/'+this.entityName }">{{entityMeta.title}}列表</el-breadcrumb-item>
  <el-breadcrumb-item >新增{{entityMeta.title}}</el-breadcrumb-item>
</el-breadcrumb>
     </p>

    <el-form  :model="entity" size="mini" label-width="80px" ref='form'>
      <l-autoformitem v-if="item.uiMeta.insertAble && !item.uiMeta.disAsReadOnly"
       v-for="item in columns" 
       :cmeta="item"
       v-model="entity[item.dataKey]"
       :key="item.dataKey">
      </l-autoformitem>
      <el-form-item >
        <el-button @click="save">保存</el-button>
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
  "v!views/common/autoformitem"
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
       
      };
    },
    methods: {
      save() {
          var _this=this;
        this.$refs['form'].validate(v=>{
          if(v){
       this.$message("正在保存。。。。。");
        console.info(this.entity);
        this.$http.post(this.$http.addUrl(config.service.entityInsertPath+_this.entityName),this.$http.adornParams(this.entity)).
        	then(({data})=>{
        	if(data.code===0){
        		_this.$message('operation successfull')
        	}else
        	{
        	 _this.$message('operation failed'+data.msg)
        	}
        	}).catch(e=>{
        	_this.$message('save data error '+e)
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

        var mock = "entity/user.columnmeta.json?entityName=" + this.entityName;
        var self = this;
        this.$http({ url: this.$http.addUrl(config.service.columnMetaPath+this.entityName) })
          .then(({ data }) => {
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

        var mockEntitiyMeta =
          "entity/user.entitymeta.json?entityName" + this.entityName;
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
    mounted() {
      this.reset()
      this.entityName = this.$route.params.entityName;
      this.id = this.$route.params.id;
      
      this.loaddata();
    },
    beforeRouteUpdate(to, from, next) {
      this.reset()
      this.entityName = to.params.entityName;
      this.id = to.params.id;
 console.info('--------create '+JSON.stringify(this.$data))
      this.loadData();
      next();
    }
  });
});
</script>
