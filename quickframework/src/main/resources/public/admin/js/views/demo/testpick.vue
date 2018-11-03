<template>
<div>
  <el-form   >

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
                "dataKey":"id",
                "entityClass":"com.livem.quickframework.entity.Role",
                "key":true,
                "title":"ID",
                "type":"java.lang.Long",
                "uiMeta":{
                    "disAsReadOnly":true,
                    "insertAble":false,
                    "uiType":"Number",
                    "updateAble":false,
                    "validMeta":[

                    ],
                    "visable":true
                }
            },
            {
                "dataKey":"menus",
                "entityClass":"com.livem.quickframework.entity.Role",
                "key":false,
                "title":"权限点",
                "type":"java.util.List",
                "uiMeta":{
                    "disAsReadOnly":false,
                    "insertAble":true,
                    "multiPick":true,
                    "pickColumns":[
                        "id",
                        "name"
                    ],
                    "pickEntityShortName":"SysMenu",
                    "pickEntityType":"com.livem.quickframework.entity.SysMenu",
                    "uiType":"Pick",
                    "updateAble":true,
                    "validMeta":[

                    ],
                    "visable":true
                }
            },
            {
                "dataKey":"role_name",
                "entityClass":"com.livem.quickframework.entity.Role",
                "key":false,
                "title":"角色名称",
                "type":"java.lang.String",
                "uiMeta":{
                    "disAsReadOnly":false,
                    "insertAble":true,
                    "uiType":"Text",
                    "updateAble":true,
                    "validMeta":[

                    ],
                    "visable":true
                }
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
        const  _this = this;
        console.info(JSON.stringify(_this.entity));
      },
      setValue() {

        this.entity={
             menus: [{ id: 2,  "name": "应用配置" },{id:3, "name": "用户管理"}],
            id:10
      }
      }
    },
    mounted() {
      console.info("------------");
    }
  });
});
</script>
