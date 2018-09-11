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
     
},entity:{}}
      } 
      
        
    })
});
</script>

