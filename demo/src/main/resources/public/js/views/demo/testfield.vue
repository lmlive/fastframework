<<template>
<div>
    <l-field :readonly="false" :cmeta="unit" v-model="entity[unit.dataKey]"></l-field>
    <el-button @click="test">test </el-button>
    </div>
</template>
<<script>
define([
    'vue',
    'v!views/common/field',
     'v!views/common/embedded'
], function( Vue) {
    'use strict';
    return Vue.component('l-test',{
      template:template,
      methods:{
        test(){
          console.log(this.entity)
        }
      },
      data(){
return {
  dict:{
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
  },
  unit:{
   
        "dataKey": "updateDate",
        "entityClass": "org.livem.test.entity.Recorded",
        "key": false,
        "title": "更改日期",
        "type": "java.util.Date",
        "uiMeta": {
          "disAsReadOnly": false,
          "insertAble": false,
          "uiType": "Date",
          "updateAble": true,
          "validMeta": [],
          "visable": true
        }
      
  },
    item:
    {
      "dataKey": "recordInfo",
      "entityClass": "org.livem.test.entity.SystemUser",
      "key": false,
      "subColumns": [{
        "dataKey": "createDate",
        "entityClass": "org.livem.test.entity.Recorded",
        "key": false,
        "title": "创建日期",
        "type": "java.util.Date",
        "uiMeta": {
          "disAsReadOnly": false,
          "insertAble": true,
          "uiType": "Date",
          "updateAble": false,
          "validMeta": [],
          "visable": true
        }
      }, {
        "dataKey": "updateDate",
        "entityClass": "org.livem.test.entity.Recorded",
        "key": false,
        "title": "更改日期",
        "type": "java.util.Date",
        "uiMeta": {
          "disAsReadOnly": false,
          "insertAble": false,
          "uiType": "Date",
          "updateAble": true,
          "validMeta": [],
          "visable": true
        }
      }],
      "title": "recordInfo",
      "type": "org.livem.test.entity.Recorded",
      "uiMeta": {
        "disAsReadOnly": false,
        "insertAble": true,
        "updateAble": true,
        "validMeta": [],
        "visable": true
      }
     
},entity:{'sex':'1','updateDate':'2018-10-10'}}
      } 
      
        
    })
});
</script>

