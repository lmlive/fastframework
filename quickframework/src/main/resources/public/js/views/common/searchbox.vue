<template>
    <el-dialog :visible="show" @close="()=>{this.$emit('close')}">
        <el-form size="mini" >
            <el-row v-for="item in columnMetas" :key="item.dataKey" v-if="isSearchAble(item)">
                <el-col :span="3">{{item.title}}</el-col>
                <el-col :span="5">
                 <el-select  v-model="searchEntity[item.dataKey+'_operation']" size="mini" placeholder="操作">
                    <el-option v-for="item in getAllOperations" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="8">
                <l-autoformitem v-model="searchEntity[item.dataKey]" :cmeta="item" :showLabel="false"></l-autoformitem>
                </el-col>
               <el-col :span="8">
                <template v-if="searchEntity[item.dataKey+'_operation']==='between'">
                    <span>-</span>
                    <l-autoformitem :showLabel="false" v-model="searchEntity[item.dataKey+'_bw2']" :cmeta="item"></l-autoformitem>
                </template>
               </el-col>
            </el-row>
            <el-form-item>
                <el-button>Search</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
define(['vue', 'v!views/common/autoformitem'], function(Vue) {
    return Vue.component('l-searchbox', {
        template: template,
        props: {
            columnMetas: { required: true, type: Array },
            value: { required: true },
            show: { type: Boolean, default: false }

        },
        data() {
            return { searchEntity: {} }
        },

        methods: {
            search() {
                this.$emit('search', this.searchEntity)
            },
            getStringOperations() {
                return ['==', 'like', 'betwwen', 'is null', 'is not null']
            },
            getAllOperations() {
                return ['>', '<', '==', 'like', 'betwwen', 'is null', 'is not null']
            },
            isSearchAble(meta) {
                return meta.uiMeta.uiType === 'RichContext'
                    || meta.uiMeta.uiType === 'Boolean'
                    || meta.uiMeta.uiType === 'Number'
                    || meta.uiMeta.uiType === 'Date'
                    || meta.uiMeta.uiType === 'DateTime'
                    || meta.uiMeta.uiType === 'Dictionary'
                    || meta.uiMeta.uiType === 'Text'

            }

        }
    })
})
</script>


