<template>
 
      
 <el-select v-model="cvalue" :multiple="multiPick" placeholder="请选择"   
 :remote ="true"
 :filterable="true"
 :remote-method="querySearch" :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="displayLabel(item)"
      :value="item.id">
      <!-- <template v-for="c in pickFields">
        <span style="padding-right:3px;" :key="c">{{ item[c] }}</span>
      </template> -->
      
    </el-option>
  </el-select>


</template>
<script>
/*
insert ,update  显示单选，多选
info ，list 显示连接
*/
define(["require", "vue", "utils/config"], function(require, Vue, config) {
  "use strict";
  return Vue.component("l-pickupfield", {
    template: template,
    props: {
      entityName: { required: true },
      pickFields: { required: false },
      multiPick: { type: Boolean, required: false, default: false },
      value: {},
      url: { type: String, required: false }
    },
    watch: {
      value: function(v) {
        this.cvalue = v;
      },
      cvalue: function(v) {
        this.$emit("input", v);
      }
    },
    data() {
      return {
        cvalue: null,
        loading: false,
        options: []
      };
    },
    mounted() {
      if (this.value != null) {
        this.querySearch("", this.value);
      }
    },
    methods: {
      displayLabel(item) {
        if (this.pickFields) {
          return this.pickFields
            .map(d => {
              return item[d];
            })
            .join(",");
        } else {
          return item["id"];
        }
      },
      defualtUrl() {
        return this.$http.addUrl(config.entityListPath);
      },
      querySearch(q, value) {
        var _this = this;
        _this.loading = true;
        var mockurl = "entity/userlist.json";
        if (value) mockurl += "?ids=" + value;

        this.$http({
          url: _this.$http.addUrl(mockurl),
          params: { entityName: _this.entityName, keyword: q }
        })
          .then(({ data }) => {
            _this.loading = false;
            if (data.code == 0) {
              _this.options = data.data.list;
              if (value) {
                _this.cvalue = value;
              }
            } else {
              _this.$message("---load data error" + data.msg);
            }
          })
          .catch(ex => {
            _this.loading = false;
            _this.$message("---query entity list error" + ex);
          });
      }
    }
  });
});
</script>


