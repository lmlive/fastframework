<template>
 
      
 <el-select @change="onchange"  v-model="selectValue" :multiple="multiPick" placeholder="请选择"   
 :remote ="true"
 :filterable="true"
 :remote-method="querySearch" :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="displayLabel(item)"
      :value="item.id"> 
    </el-option>
  </el-select>


</template>
<script>
/*
insert ,update  显示单选，多选
info ，list 显示连接
*/
define([ "vue", "config"], function( Vue, config) {
  "use strict";
  return Vue.component("l-pickupfield", {
    template: template,
    props: {
      entityName: { required: true },
      pickFields: { required: false,default:null,type:Array },
      multiPick: { type: Boolean, required: false, default: false },
      value: {default:null},
      url: { type: String, required: false }
    },
    watch: {
      value: function(v) {
        this.selectValue = this.objToSelectValue(v);
      }
    
    },
    data() {
      return {
        cvalue: null,
        loading: false,
        selectValue:null,
        options: []
      };
    },
    mounted() {

      if (this.value != null) {
        this.selectValue=this.objToSelectValue(this.value)
        this.querySearch("", this.selectValue);
      }
    },
    methods: {
      onchange(v){
        this.$emit('input',this.selectValueToObj(v))
      },
      objToSelectValue(v){
        if(this.multiPick){
          return v.map(d=>{return d.id})
        }else
        return v.id
      },
      selectValueToObj(v){
        if(this.multiPick){
          return v.map(d=>{
            return {id:d}
          })
        }else
        return {id:d}
      },
      displayLabel(item) {
        if (this.pickFields!=null ) {

          return this.pickFields.map(d => {
              return item[d];
            }).join(",");
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
        // const mockurl =config.service.entityListPath+this.entityName;// "entity/userlist.json";
        // if (value) mockurl += "?ids=" + value;
        let url=config.service.entityListPath+this.entityName
          if(value!=null){
              url+='?ids='+value
          }
        this.$http({
          url: _this.$http.addUrl(url),
          params: { entityName: _this.entityName, keyword: q }
        })
          .then(({ data }) => {
            _this.loading = false;
            if (data.code == 0) {
              _this.options = data.data.list;
              if (value) {
                _this.selectValue = value;
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


