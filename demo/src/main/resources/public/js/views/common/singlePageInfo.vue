<template>

    <el-form ref="dataForm" label-width="20%"  v-loading="loading">
        <l-navbread :navs="navs()"></l-navbread>
        <el-form-item :label="item.title+'：'" v-for="item in columns" :key="item.dataKey">
            <l-autotablecolumn :value="entity[item.dataKey]" :cmeta="item"/>
        </el-form-item>

        <el-form-item>
        <el-button @click="goEdit" type="primary" icon="el-icon-edit">编辑</el-button>
        <el-button @click="()=>{this.$router.back()}" icon="el-icon-back">返回</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    define(["require", "vue", "config", "v!views/common/autotablecolumn",'v!views/common/navbread'], function (
        require,
        Vue,
        config
    ) {
        return Vue.component("l-singlePageInfo", {
            template: template,
            data() {
                return {
                    dictUrl: this.$http.addUrl(config.service.dictionaryPath),
                    columns: [],
                    entity: {},
                    entityName: null,
                    id: null,
                    loading:true,
                    entityMeta: {},

                };
            },

            methods: {
                goEdit(){
                    this.$router.push(config.service.singlePageEditPath+this.entityName)
                },
                navs(){
                    var data=[]
                    data.push({name:'首页',path:'/'})
                    data.push({name:this.entityMeta.title+'列表',path:'/system/entity/list/'+this.entityName})
                    data.push({name:this.entityMeta.title+'详情'})
                    return data
                },
                getupfilelist(data) {
                    if (data instanceof Array && data.length > 0) {
                        return data.map(d => {
                            return {name: d, url: d};
                        })

                    } else if (data) {
                        return [{name: data, url: data}];
                    } else return [];
                },

                loaddata() {
                    //get column metainfo
                    //var mock = "entity/user.columnmeta.json?entityName=" + this.entityName;
                    var self = this;
                    this.loading=true
                    this.$http({url: this.$http.addUrl(config.service.columnMetaPath + this.entityName)})
                        .then(({data}) => {
                            self.columns = data.data;
                            self.loadEntityData();
                            self.loading=false
                        }).catch(ex => {
                        self.$message("get column info error ," + ex);
                    }) ;

                    self.loadEntityMeta();
                },
                //get entity info
                loadEntityData() {
                    var self = this;
                    // var mockEntitiyInfo = "entity/user.json?id=" + this.id;
                    var url=config.service.singlePagePath + this.entityName

                    this.$http({url: this.$http.addUrl(url)})
                        .then(({data}) => {

                            self.entity = data.data || {}
                            self.loading=false
                        }). catch(ex => {
                        self.$message("get singlepage info error ," + ex);
                    })

                },
                loadEntityMeta() {
                    var self = this;
                    // var mockEntitiyMeta ="entity/user.entitymeta.json?entityName" + this.entityName;
                    this.$http({url: this.$http.addUrl(config.service.entityMetaPath + this.entityName)})
                        .then(({data}) => {
                            self.entityMeta = data.data;
                        }).catch(ex => {
                        self.$message("get entityMeta   error ," + ex);
                    })

                },
                getColumnValue(column) {
                    return this.entity[column.dataKey] + "";
                }
            },

            activated(){
                this.entityName = this.$route.params.entityName;
                this.id = this.$route.params.id;
                this.loaddata();
            }, beforeRouteUpdate(to,from,next){
                this.entityName = to.params.entityName;
                this.id = to.params.id;
                this.loadData();
                next()
            }


        });
    });
</script>
