<template>
    <div v-loading="loading">

<l-navbread :navs="navs()"></l-navbread>
        <el-form :model="entity" size="mini" label-width="20%" ref='form'>
            <l-autoformitem v-if="item.uiMeta.updateAble && !item.uiMeta.disAsReadOnly"
                            v-for="item in columns"
                            :cmeta="item"
                            v-model="entity[item.dataKey]"
                            :key="item.dataKey">
            </l-autoformitem>
            <el-form-item>
                <el-button @click="save" type="primary"  icon="el-icon-circle-check-outline">保存</el-button>
                <el-button @click="()=>{this.$router.back()}" icon="el-icon-back">返回</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    define([
        "require",
        "vue",
        "v!views/common/dictionary",
        "config",
        "v!views/common/autoformitem",
        "v!views/common/navbread"
    ], function (require, Vue, d, config) {
        "use strict";
        return Vue.component("l-edit", {
            template: template,
            data() {
                return {
                    dictUrl: this.$http.addUrl(config.service.dictionaryPath),
                    columns: [],
                    entity: {},
                    id: null,
                    entityMeta: {},
                    entityName: null,
                    uploadUrl: this.$http.addUrl(config.service.uploadPath),
                    loading:true
                };
            },
            methods: {
                navs(){
                    var data=[]
                    data.push({name:'首页',path:'/'})
                    data.push({name:this.entityMeta.title+'列表',path:config.service.entityListPath+this.entityName})
                    data.push({name:this.entityMeta.title+'编辑'})
                    return data
                },
                save() {
                    const  _this=this;
                    this.$refs['form'].validate(d => {
                        if (d) {
                            _this.$message("正在保存。。。。。");
                            console.info(this.entity);
                            _this.$http.post(config.service.entityUpdatePath+_this.entityName,_this.entity).then(({data})=>{
                                if(data.code===0){
                                    _this.$message('保存成功');
                                    _this.$router.back()
                                }else
                                    _this.$message('保存失败！！'+data.msg)
                            }).catch((e)=>{
                                _this.$message('操作失败！'+e)
                            })
                        }
                    })

                },
                getupfilelist(data) {
                    if (data instanceof Array) {
                        if (data.length > 0)
                            return data.map(d => {
                                return {name: d, url: d};
                            });
                        return [];
                    } else {
                        if (data) return [{name: data, url: data}];
                        else return [];
                    }
                },
                loaddata() {
                    //get column metainfo
                    this.loading=true
                    // var mock = "entity/user.columnmeta.json?entityName=" + this.entityName;
                    const  self = this;
                    this.$http({url: this.$http.addUrl(config.service.columnMetaPath + this.entityName)})
                        .then(({data}) => {
                            self.loading=false
                            if (data.code === 0) {
                                self.columns = data.data;
                                //get entity info
                                self.loadEntityInfo();
                            }
                        })
                        .catch(ex => {
                            this.$message("获取列属性失败： ," + ex);
                        });

                    self.loadEntityMeta();
                },
                loadEntityInfo() {
                    const  self = this;
                    //    var mockEntitiyInfo = "entity/user.json?id=" + this.id;
                    this.$http({url: this.$http.addUrl(config.service.entityInfoPath + this.entityName + '?id=' + this.id)})
                        .then(({data}) => {
                            self.entity = data.data;
                        })
                        .catch(ex => {
                            this.$message("获取数据失败：," + ex);
                        });

                },
                loadEntityMeta() {
                    const  self = this;

                    // var mockEntitiyMeta =  "entity/user.entitymeta.json?entityName" + this.entityName;
                    this.$http({url: this.$http.addUrl(config.service.entityMetaPath + this.entityName)})
                        .then(({data}) => {
                            self.entityMeta = data.data;
                        })
                        .catch(ex => {
                            this.$message("获取实体属性失败： ," + ex);
                        });
                },
                getColumnValue(column) {
                    return this.entity[column.dataKey] + "";
                },

            },


            activated(){
                this.entityName = this.$route.params.entityName;
                this.id = this.$route.params.id;
                this.loaddata();
            },
            beforeRouteUpdate(to,from,next){
                this.entityName = to.params.entityName;
                this.id = to.params.id;
                this.loadData();
                next()
            }
        });
    });
</script>
