<template>
  <div class="mod-user">
    <p>{{entityName}}</p>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.query" placeholder="关键词" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button   type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button   type="danger" @click="deleteHandle()" 
        :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      stripe
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
       
       <el-table-column v-for="c in columns"  :label="c.title"  :prop="c.dataKey">
          <template slot-scope="scope">
            <el-button v-if="scope.column.property=='id'"  type="text" size="small" @click="detail(scope.row['id'])">{{scope.row.id}}</el-button>
            <span v-else>{{scope.row[scope.column.property]}}</span>
          </template>
       </el-table-column>

      <el-table-column
      fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button   type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button   type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
 

     <l-info ref="entityInfo" :show="dialog.showdialog" :entityName="entityName" :id="dialog.id"></l-info>
   
  </div>
</template>

<script>
define(["vue", "v!views/common/info"], function(Vue) {
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
        dialog: {
          action: null,
          id: null,
          showdialog: false
        },

        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      };
    },
    activated() {
      this.getDataList();
    },
    methods: {
      detail(id) {
        this.dialog.action = "查看详情";
        this.dialog.id = id;
        this.dialog.showdialog = true;
        console.info(id)
      
        console.info(this.$refs.entityInfo.id)
      },
      loadInfo() {
        console.log(this.$refs.entityInfo);
        console.log(this.$refs);
      },
      getColumns() {
        this.dataListLoading = true;
        var self = this;
        var mock = "entity/user.columnmeta.json";
        this.$http({
          url: this.$http.adornUrl(mock),
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
        this.dataListLoading = true;
        var mock = "entity/userlist.json";
        this.$http({
          url: this.$http.adornUrl(mock),
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
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id);
        });
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
              url: this.$http.adornUrl("/sys/user/delete"),
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
          .catch(() => {});
      }
    },
    mounted() {
      //get entityname from url
      this.entityName = this.$route.params.entityName;
      this.getColumns();
      this.getDataList();
    }
  });
});
</script>
