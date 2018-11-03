<template>
  <div class="mod-user"  v-loading="loading">

      <l-navbread :navs="navs()"></l-navbread>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="loadData()">
      <el-form-item>
        <el-input v-model="dataForm.keyword" placeholder="关键词" clearable></el-input>
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

        <el-button type="primary" @click="create()"  icon="el-icon-plus">新增</el-button>
        <el-button type="danger" @click="deleteHandle" :disabled="dataListSelections.length <= 0" icon="el-icon-delete">批量删除</el-button>
      </el-form-item>
    
    </el-form>
     <el-alert  v-show="searchDialog.searchDesc!=''"   :title="searchDialog.searchDesc"     type="info">  </el-alert>
    <el-table :data="dataList" border stripe size="mini"  @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>

      <el-table-column v-for="c in columns" :label="c.title" :prop="c.dataKey" :key="c.dataKey">
        <template slot-scope="scope">
          <el-button v-if="scope.column.property=='id'" type="text" size="small" @click="detail(scope.row['id'])">{{scope.row.id}}</el-button>
          <l-autotablecolumn name="c.dataKey" v-else :value="scope.row[scope.column.property]" :cmeta="c"> </l-autotablecolumn>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" fixed="right" label="操作">
        <span slot-scope="scope">
           <el-button type="text" size="small" @click="update(scope.row.id)" >修改</el-button>
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
  "v!views/common/autotablecolumn",
  "v!views/common/navbread"
], function(Vue,config) {
  "use strict";
  return Vue.component("l-entitylist", {
    template: template,
    data() {
      return {
        dataForm: {
          keyword: ""
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
        loading:true,
        searchEntity: {},
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,

        dataListSelections: []

      };
    },

    methods: {
        navs(){
            let  data=[]
            data.push({name:'首页',path:'/'})
            data.push({name:this.entityMeta.title+'列表'})
            return data
        },
      //详情
      detail(id) {
        this.$router.push(config.service.entityInfoPath + this.entityName + "/" + id);
      },
        //新增
        create(){
            let  url =config.service.entityInsertPath + this.entityName
            this.$router.push(url);
        },
      // 修改
      update(id) {
        let  url =config.service.entityUpdatePath + this.entityName+'/'+id;
        this.$router.push(url);
      },
      searchCmd(cmd) {

        if (cmd === "loadData") {
          this.loadList();
        } else {
          this.searchDialog.showdialog = true;
        }
      },
      doSearch(searchEntity, desc) {
            const _this=this;
     //  this.$message('待实现。。。。。。。。')
        this.searchDialog.searchDesc = desc;
          searchEntity.page=this.pageIndex
          searchEntity.pageSize=this.pageSize,
       this.$http.post(config.service.entityListPath+this.entityName,searchEntity)
           .then(({data})=>{
           _this.searchDialog.showdialog = false;
           if (data && data.code === 0) {
              _this.dataList = data.data.list || [];
              _this.totalCount = data.data.totalCount;
          } else {
              _this.dataList = [];
              _this.totalCount = 0;
          }
       }).catch(ex=>{
               _this.$message('查询错误：'+ex)
          })
      },
      loadEntityMeta() {
        const  self = this;

        // var mockEntitiyMeta =          "entity/user.entitymeta.json?entityName" + this.entityName;
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

        this.loading = true;
        const  self = this;
        // var mock = "entity/user.columnmeta.json";
        this.$http.get( this.$http.addUrl(config.service.columnMetaPath+this.entityName))
          .then(({ data }) => {
            if (data && data.code === 0) {
              self.columns = data.data;
              self.loadList();
            }
            self.loading = false;
          })
          .catch(ex => {
           self.$message('加载列表出错'+ex)
          });
        self.loadEntityMeta();
      },
      loadList() {
        const  _this=this
        // var mock = "entity/userlist.json?entityName=" + this.entityName;
        this.$http({
          url: _this.$http.addUrl(config.service.entityListPath+this.entityName),
          method: "get",
          params: this.$http.adornParams({
            page: this.pageIndex,
            pageSize: this.pageSize,
            _keyword: this.dataForm.keyword
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            _this.dataList = data.data.list || [];
            _this.totalCount = data.data.totalCount;
          } else {
           _this.dataList = [];
            _this.totalCount = 0;
          }

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
          const  _this=this;
        let  ids = id ? [id]: this.dataListSelections.map(item => {        return item.id;        });
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
            _this.$http({
              url: _this.$http.addUrl(config.service.entityDeletePath+_this.entityName),
              method: "post",
              data: _this.$http.addData(userIds, false)
            }).then(({ data }) => {
              if (data && data.code === 0) {
                _this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    _this.loadData();
                  }
                });
              } else {
                _this.$message.error(data.msg);
              }
            });
          })
          .catch((ex) => {_this.message('删除失败：'+ex)});
      }
    },
      activated(){
            this.entityName = this.$route.params.entityName;
            this.loadData();
        },
      beforeRouteUpdate(to,from,next){
          this.entityName = to.params.entityName;
          this.loadData();
          next()
      }

  });
});
</script>
