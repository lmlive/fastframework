<template  >
    <span v-show="show">
        <template v-if="cmeta.uiMeta.uiType==='RichContent'">{{cvalue}}</template>

        <template v-else-if="cmeta.uiMeta.uiType==='Boolean'">
            <span v-if="cvalue==null"></span>
            <span v-else-if="cvalue">是</span>
            <span v-else>否</span>
        </template>

        <span v-else-if="cmeta.uiMeta.uiType==='Password'">******</span>

        <template v-else-if="cmeta.uiMeta.uiType==='Img'">
             <template v-if="cvalue !=null && cvalue!=undefined">
            <el-dropdown v-if="cmeta.uiMeta.multi">
                <span class="el-dropdown-link">图片列表<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item  
                    v-for="item in cvalue" 
                    :key="item">
                    <a :href="item">{{item}}</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div v-else class="smallimg"> <img :src="cvalue" /></div>
            </template>
        </template>

        <template v-else-if="cmeta.uiMeta.uiType==='File'">
              <template v-if="cvalue !=null && cvalue!=undefined">
            <el-dropdown v-if="cmeta.uiMeta.multi " trigger="click">
                <span class="el-dropdown-link">列表<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown"  >
                    <el-dropdown-item
                    v-for="item in cvalue"
                     :key="item" >
                        <a :href="item">{{item}}</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
             <a :href="cvalue" v-else>{{cvalue}}</a>
            </template>
        </template>

        <l-dictionary v-else-if="cmeta.uiMeta.uiType==='Dictionary'" 
        :value="cvalue" 
        :dkey="cmeta.uiMeta.dictKey" 
        :group="cmeta.uiMeta.dictGroup"
         :source="dictUrl" 
         :readonly="true"></l-dictionary>

<template v-else-if="cmeta.uiMeta.uiType==='Pick'">
    <template v-if="cvalue !=null && cvalue!=undefined">
  <el-dropdown v-if="cmeta.uiMeta.multiPick" trigger="click">
      <span class="el-dropdown-link">列表<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown"  >
                    <el-dropdown-item   v-for="item in cvalue" :key="item"  >  
                        <a :href="'/entity/detail/'+item.id">{{item.id}}</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
  </el-dropdown>    
   <a :href="'/entity/detail/'+cvalue.id" v-else>{{cvalue}}</a>
   </template>
</template>
 <l-embedded :readonly="true" v-else-if="cmeta.uiMeta.uiType==undefined" v-model="cvalue" :columnMeta="cmeta"></l-embedded>
        <span v-else>{{cvalue}}</span>
    </span>
</template>
<script>
define(["vue","config", "v!views/common/dictionary",'v!views/common/embedded'], function(Vue,config) {
  return Vue.component("l-autotablecolumn", {
    template: template,
    props: {
      cmeta: { required: true },
      value: { required: true },
      show: { type: Boolean, default: true }
    },
    data() {
      return {
        dictUrl: this.$http.addUrl(config.service.dictionaryPath),
        cvalue: this.value == undefined ? null : this.value
      };
    },
    watch: {
      value: function(v) {
        this.cvalue = v;
      }
    },

    methods: {
      
      getupfilelist(data) {
        if (data instanceof Array && data.length > 0) {
          return data.map(d => {
            return { name: d, url: d };
          });
        } else if (data) {
          return [{ name: data, url: data }];
        } else return [];
      }
    }
  });
});
</script>

