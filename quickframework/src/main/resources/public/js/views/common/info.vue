<template>
  
    <el-form ref="dataForm" label-width="80px">
        <p>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/entity/list/'+this.entityName }">{{entityMeta.title}}列表</el-breadcrumb-item>
  <el-breadcrumb-item>{{entityMeta.title}} 详情</el-breadcrumb-item>
 
</el-breadcrumb>
     </p>
 
  <el-form>
    <el-form-item :label="item.title+'：'" v-for="item in columns" :key="item.dataKey">
    <l-autotablecolumn  :value="entity[item.dataKey]" :cmeta="item"   />
    </el-form-item>
  </el-form>
      

    </el-form>
  
</template>

<script>
define(["require", "vue","config", "v!views/common/autotablecolumn"], function(
  require,
  Vue,
  config
) {
  "use strict";
  return Vue.component("l-info", {
    template: template,
    data() {
      return {
        dictUrl: this.$http.addUrl(config.service.dictionaryPath),
        columns: [],
        entity: {},
        entityName: null,
        id: null,
        entityMeta: {}
      };
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

      loaddata() {
        //get column metainfo
        var mock = "entity/user.columnmeta.json?entityName=" + this.entityName;
        var self = this;
        this.$http({ url: this.$http.addUrl(config.service.columnMetaPath+this.entityName) })
          .then(({ data }) => {
            if (data.code === 0) {
              self.columns = data.data;
              self.loadEntityData();
            }
          })
          .catch(ex => {
            self.$message("get column info error ," + ex);
          });

        self.loadEntityMeta();
      },
      //get entity info
      loadEntityData() {
        var self = this;
        var mockEntitiyInfo = "entity/user.json?id=" + this.id;
        this.$http({ url: this.$http.addUrl(config.service.entityInfoPath+this.entityName+'/'+this.id) })
          .then(({ data }) => {
            self.entity = data.data;
          })
          .catch(ex => {
            self.$message("get entity info error ," + ex);
          });
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
      }
    },
created(){console.info('create info component')},
    mounted() {
    
      this.entityName = this.$route.params.entityName;
      this.id = this.$route.params.id;
      console.info('----------entity info page '+this.entityName);
      this.loaddata();
    },
    beforeRouteUpdate(to, from, next) {
      this.entityName = to.params.entityName;
      this.id = to.params.id;
      this.loadData();
      next();
    }
  });
});
</script>
