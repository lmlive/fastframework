<template>
    <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
        <div class="site-navbar__header">
            <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
                <a class="site-navbar__brand-lg" href="javascript:;">{{app['name']}}</a>
                <a class="site-navbar__brand-mini" href="javascript:;">LM</a>
            </h1>
        </div>
        <div class="site-navbar__body clearfix">
            <el-menu class="site-navbar__menu" mode="horizontal">
                <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
                    
                    <i class="el-icon-arrow-left"></i>
                </el-menu-item>
            </el-menu>
            <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
                <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
                    <template slot="title">
                        <el-badge value="new">
                           <i class="el-icon-edit"></i>
                        </el-badge>
                    </template>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-badge value="hot">
                        <a href="//www.renren.io/" target="_blank">官方社区</a>
                    </el-badge>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title">Git源码</template>
                    <el-menu-item index="2-1">
                        <a href="//github.com/daxiongYang/renren-fast-vue" target="_blank">前端</a>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <a href="//git.oschina.net/renrenio/renren-fast" target="_blank">后台</a>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <a href="//git.oschina.net/renrenio/renren-generator" target="_blank">代码生成器</a>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item class="site-navbar__avatar" index="3">
                    <el-dropdown :show-timeout="0" placement="bottom">
                        <span class="el-dropdown-link">
                            <img src="/ui/img/avatar.png" :alt="userName">{{ userName }}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
                            <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 弹窗, 修改密码 -->
        <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
    </nav>
</template>

<script>
    define(['vue','config',  'validate','v!views/main-navbar-update-password'], function (Vue, config, validate) {
        const isURL = validate.isURL
        return Vue.component('main-navbar',{
            template: template,
            data() {
                return {
                    updatePassowrdVisible: false,
                    app:{name:'--appname--'}
                }
            },
            mounted(){
              const self=this;
                self.$http({
                    url: self.$http.addUrl(config.service.singlePagePath+'Application'),
                    method: 'post',
                }).then(function(res){
                    const  data=res.data
                    if (data && data.code === 0) {
                     self.app=data.data||{};
                    }
                })
            },
            computed: {
                navbarLayoutType: {
                    get() {
                        return this.$store.state.common.navbarLayoutType
                    }
                },
                sidebarFold: {
                    get() {
                        return this.$store.state.common.sidebarFold
                    },
                    set(val) {
                        this.$store.commit('common/updateSidebarFold', val)
                    }
                },
                mainTabs: {
                    get() {
                        return this.$store.state.common.mainTabs
                    },
                    set(val) {
                        this.$store.commit('common/updateMainTabs', val)
                    }
                },
                userName: {
                    get() {
                        return this.$store.state.user.name
                    }
                }
            },
            methods: {
                // 修改密码
                updatePasswordHandle() {
                    const  self=this
                    this.updatePassowrdVisible = true
                    this.$nextTick(function () {
                        self.$refs.updatePassowrd.init()
                    })
                        

                },
                // 退出
                logoutHandle() {
                    var  self=this
                    this.$confirm('确定进行[退出]操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function() {
                        self.$http({
                            url: self.$http.addUrl('/sys/logout'),
                            method: 'post',
                            data: self.$http.addData()
                        }).then(function(res){
                            var data=res.data
                            if (data && data.code === 0) {
                                self.$cookies.delete('token')
                                self.$router.options.isAddDynamicMenuRoutes = false
                                self.$router.push({
                                    name: 'login'
                                })
                            }
                        })
                    }).catch(function(error){
                        console.error('logout error'+error)
                    })
                }
            }
        })
    })
</script>
