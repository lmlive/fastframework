<template>
<div>
  <el-form :model="entity"  ref="form" :rules="rules" >
    <el-form-item prop="test">
     <el-input type="text" v-model="entity['test']" ></el-input>
     </el-form-item>
      
    
    <l-autoformitem  
       v-for="item in columns"
       :cmeta="item"
       v-model="entity[item.dataKey]"
       :key="item.dataKey">
      </l-autoformitem>

  
    </el-form>
<el-button primary @click="getValue">get value </el-button>
<el-button primary @click="setValue">set value </el-button>
    </div>
</template>
<script>
define(["vue", "v!views/common/pickupfield",'v!views/common/autoformitem'], function(Vue) {
  "use strict";
  return Vue.component("l-test-pick", {
    template: template,
    data() {
      return {
        columns:[ 
    {
      "dataKey": "name",
      "title": "LoginName",
      "type": "java.lang.String",
      "entityClass": "com.livem.quickframework.entity.SystemUser",
      "entityName": null,
      "extendMeta": null,
      "uiMeta": {
        "updateAble": true,
        "insertAble": true,
        "visable": true,
        "disAsReadOnly": false,
        "uiType": "text",
        "validMeta": [{regEx:'\\S+',message:'can not null'}],
        "multi": false
      },
      "key": false
    },
     
    {
      "dataKey": "sex",
      "title": "性别",
      "type": "java.lang.Integer",
      "entityClass": "com.livem.quickframework.entity.SystemUser",
      "entityName": null,
      "extendMeta": null,
      "uiMeta": {
        "updateAble": true,
        "insertAble": true,
        "visable": true,
        "disAsReadOnly": false,
        "uiType": "Dictionary",
        "validMeta": [],
        "dictKey": "sex",
        "dictGroup": "SYSTEM_DATA"
      },
      "key": false
    }
        ],
        pick: [{ id: 10 }],
        entity: {},
        pickFields: ["id", "loginName"],
        rules: {
           
          test: [
            {
               pattern:'\\S+',
              required: true,
              message: "can not blank",
              
            }
          ],
          name:[{pattern:"\\S+", message: "can not blank"}]
        }
      };
    },
    methods: {
      getValue() {
        var _this = this;
        _this.$refs["form"].validate(v => {
          if (v) _this.$message("validated ...");
        });
        console.info(JSON.stringify(_this.entity));
        console.info(JSON.stringify(_this.test));
      },
      setValue() {
        this.pick = [{ id: 9 }];
      }
    },
    mounted() {
      console.info("------------");
    }
  });
});
</script>
