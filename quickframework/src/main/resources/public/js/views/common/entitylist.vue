<template>
  <div class="mod-user">
    <p>{{entityName}}</p>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.query" placeholder="关键词" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="search">
          <el-button type="primary">
            搜索
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="getDataList">搜索</el-dropdown-item>
            <el-dropdown-item command="advanceSearch">高级搜索</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>

        <el-button type="primary" @click="addOrUpdateHandle">新增</el-button>
        <el-button type="danger" @click="deleteHandle" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border stripe size="mini" v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>

      <el-table-column v-for="c in columns" :label="c.title" :prop="c.dataKey" :key="c.dataKey">
        <template slot-scope="scope">
          <el-button v-if="scope.column.property=='id'" type="text" size="small" @click="detail(scope.row['id'])">{{scope.row.id}}</el-button>
          <l-autodiscolumn v-else :value="scope.row[scope.column.property]" :cmeta="c">
          </l-autodiscolumn>
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

    <l-info ref="entityInfo" @close="infoDialog.showdialog=false" :show="infoDialog.showdialog" :entityName="entityName" :id="infoDialog.id"></l-info>
    <l-create ref="addOrUpdate" @close="updateDialog.showdialog=false" :show="updateDialog.showdialog" :entityName="entityName" :id="updateDialog.id"></l-create>
    <l-searchbox @close="searchDialog.showdialog=false" :show="searchDialog.showdialog" :columnMetas="columns" v-model="searchEntity"></l-searchbox>
  </div>
</template>

<script>
define(["vue",'v!views/common/searchbox','v!views/common/autodiscolumn', "v!views/common/info", "v!views/common/create", ], function(Vue) {
  "use strict";
  return Vue.component("l-entitylist", {
    template: template,
    data() {
      return {
        dataForm: {
          query: ""
        },
        entityName: null,
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
          showdialog: false
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
      detail(id) {
        this.infoDialog.id = id;
        this.infoDialog.showdialog = true;
        this.$refs.entityInfo.loaddata();
      },
      search(cmd) {
        console.info(cmd)
        if(cmd==='getDataList'){
          this.getDataList()
        }else{
          this.searchDialog.showdialog = true
        }
       
        
      },
      getColumns() {
        this.dataListLoading = true;
        var self = this;
        var mock = "entity/user.columnmeta.json";
        this.$http({
          url: this.$http.addUrl(mock),
          method: "get"
        })
          .then(({ data }) => {
            if (data && data.code === 0) {
              self.columns = data.data;
            }
            self.dataListLoading = false;
          })
          .catch(ex => {
            alert(ex);
          });
      },
      // 获取数据列表
      getDataList() {
        console.info('-----------load data------------')
        this.dataListLoading = true;
        var mock = "entity/userlist.json?entityName=" + this.entityName;
        this.$http({
          url: this.$http.addUrl(mock),
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
        this.getDataList();
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val;
        this.getDataList();
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val;
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.updateDialog.showdialog = true
        this.updateDialog.id = id
        this.$refs.addOrUpdate.loaddata()
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
              url: this.$http.addUrl("/sys/user/delete"),
              method: "post",
              data: this.$http.adornData(userIds, false)
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.getDataList();
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            });
          })
          .catch(() => { });
      }
    },
    mounted() {
      //get entityname from url
      //console.log(this.$route.params)
      this.entityName = this.$route.params.entityName;
      this.getColumns();
      this.getDataList();
    }
  });
});
</script>
