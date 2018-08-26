<template>
    <el-form-item :label="cmeta.title" :prop="cmeta.dataKey">
      

        <template v-if="cmeta.uiMeta.uiType==='RichContent'">
            <el-select v-model="operation" placeholder="请选择">
                <el-option v-for="item in getStringOperations" :key="item" :label="item" :value="item">
                </el-option>
                <el-input type="text"></el-input>
                <template v-if="operation=='betwwen'">
                    <span>-</span>

                </template>

            </el-select>
        </template>
        <template v-else-if="cmeta.uiMeta.uiType==='Boolean'">
            <span v-if="cvalue==null"></span>
            <span v-else-if="cvalue">是</span>
            <span v-else>否</span>
        </template>

        <span v-else-if="cmeta.uiMeta.uiType==='Password'">******</span>

        <template v-else-if="cmeta.uiMeta.uiType==='Img'">
            <template v-if="cvalue!=null">
                <el-dropdown v-if="cmeta.uiMeta.multi">
                    <span class="el-dropdown-link">图片列表
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in cvalue" :key="item">
                            <a :href="item">{{item}}</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div v-else class="smallimg"> <img :src="cvalue" /></div>
            </template>
        </template>

        <template v-else-if="cmeta.uiMeta.uiType==='File'">
            <template v-if="cvalue!=null">
                <el-dropdown v-if="cmeta.uiMeta.multi " trigger="click">
                    <span class="el-dropdown-link">列表
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in cvalue" :key="item">
                            <a :href="item">{{item}}</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <a :href="cvalue" v-else>{{cvalue}}</a>
            </template>
        </template>

        <l-dictionary v-else-if="cmeta.uiMeta.uiType==='Dictionary'" :value="cvalue" :dkey="cmeta.uiMeta.dictKey" :group="cmeta.uiMeta.dictGroup" :source="dictUrl" :readonly="true"></l-dictionary>

        <a href="/" v-else-if="cmeta.uiMeta.uiType==='Pick'">{{cmeta.title}}::::TODO</a>

        <span v-else>{{cvalue}}</span>
    </el-form-item>
</template>
<script>
define(['vue', 'v!views/common/autoformitem'], function(Vue) {
    return Vue.component('l-searchfield', {
        template: template,
        props: {
            cmeta: { required: true },
            value: { required: true }
        },
        data() {
            return {
                cvalue: null,
                operation: null
            }
        },
        methods: {
            getStringOperations() {
                return ['==', 'like', 'betwwen', 'is null', 'is not null']
            },
            getAllOperations() {
                return ['>', '<', '==', 'like', 'betwwen', 'is null', 'is not null']
            },
        },

        watch: {
            value: function(v) { this.cvalue = v },
            cvalue: function(v) { this.$emit('input', v) }
        }
    })
})
</script>
