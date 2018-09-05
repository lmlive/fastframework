<template>
  <div class="mod-user">
        <p>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/entity/list/'+this.entityName }">{{entityMeta.title}}列表</el-breadcrumb-item>
 
 
</el-breadcrumb>
     </p>

    <el-form :inline="true" :model="dataForm" @keyup.enter.native="loadData()">
      <el-form-item>
        <el-input v-model="dataForm.query" placeholder="关键词" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="searchCmd">
          <el-button type="primary">
            搜索
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="loadData">搜索</el-dropdown-item>
            <el-dropdown-item command="advanceSearch">高级搜索</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>

        <el-button type="primary" @click="addOrUpdateHandle(null)">新增</el-button>
        <el-button type="danger" @click="deleteHandle" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    
    </el-form>
     <el-alert  v-show="searchDialog.searchDesc!=''"   :title="searchDialog.searchDesc"     type="info">  </el-alert>
    <el-table :data="dataList" border stripe size="mini" v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>

      <el-table-column v-for="c in columns" :label="c.title" :prop="c.dataKey" :key="c.dataKey">
        <template slot-scope="scope">
          <el-button v-if="scope.column.property=='id'" type="text" size="small" @click="detail(scope.row['id'])">{{scope.row.id}}</el-button>
          <l-autotablecolumn v-else :value="scope.row[scope.column.property]" :cmeta="c"> </l-autotablecolumn>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" fixed="right" label="操作">
        <span slot-scope="scope">
           <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

     <l-searchbox @search="doSearch" @close="searchDialog.showdialog=false" :show="searchDialog.showdialog" :columnMetas="columns" v-model="searchEntity"></l-searchbox>
  </div>
</template>

<script>
define([
  "vue",
  'config',
  "v!views/common/searchbox",
  //"v!views/common/autotablecolumn" 
  
], function(Vue,config) {
  "use strict";
  return Vue.component("l-entitylist", {
    template: template,
    data() {
      return {
        dataForm: {
          query: ""
        },
        entityName: null,
        entityMeta: {},
        columns: [],
        infoDialog: {
          id: null,
          showdialog: false
        },
        updateDialog: {
          id: null,
          showdialog: false
        },
        searchDialog: {
          showdialog: false,
          searchDesc: ""
        },

        searchEntity: {},
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      };
    },

    methods: {
      //详情
      detail(id) {
        this.$router.push("/system/entity/detail/" + this.entityName + "/" + id);
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        var url ="/system/entity/edit/" + this.entityName;
        if (id != undefined) url += "/" + id;
        this.$router.push(url);
      },
      searchCmd(cmd) {
        console.info(cmd);
        if (cmd === "loadData") {
          this.loadData();
        } else {
          this.searchDialog.showdialog = true;
        }
      },
      doSearch(searchEntity, desc) {
        console.info(
          "-----TODO dosearch from server ---" + JSON.stringify(searchEntity)
        );
        this.searchDialog.searchDesc = desc;
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

      // 获取数据列表
      loadData() {
        this.dataListLoading = true;
        var self = this;
        var mock = "entity/user.columnmeta.json";
        this.$http({
          url: this.$http.addUrl(config.service.columnMetaPath+this.entityName),
          method: "get"
        })
          .then(({ data }) => {
            if (data && data.code === 0) {
              self.columns = data.data;
              self.loadList();
            }
            self.dataListLoading = false;
          })
          .catch(ex => {
            alert(ex);
          });
        self.loadEntityMeta();
      },
      loadList() {
        this.dataListLoading = true;
        var mock = "entity/userlist.json?entityName=" + this.entityName;
        this.$http({
          url: this.$http.addUrl(config.service.entityListPath+this.entityName),
          method: "get",
          params: this.$http.adornParams({
            page: this.pageIndex,
            limit: this.pageSize,
            username: this.dataForm.userName
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.data.list;
            this.totalCount = data.data.totalCount;
          } else {
            this.dataList = [];
            this.totalCount = 0;
          }
          this.dataListLoading = false;
        });
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.loadData();
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val;
        this.loadData();
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val;
      },

      // 删除
      deleteHandle(id) {
        var ids = id
          ? [id]
          : this.dataListSelections.map(item => {
              return item.id;
            });
        this.$confirm(
          `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$http({
              url: this.$http.addUrl(config.service.entityDeletePath+this.entityName),
              method: "post",
              data: this.$http.adornData(userIds, false)
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.loadData();
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            });
          })
          .catch(() => {});
      }
    },
    mounted() {
    
      this.entityName = this.$route.params.entityName;
      console.info('--------mounted entityList-------'+this.entityName);
      this.loadData();
    },
    beforeRouteUpdate(to, from, next) {
     console.info('--------mounted entityList-------'+this.entityName);
      this.entityName = to.params.entityName;
      this.loadData();
      next();
    }
  });
});
</script>
