<template>
    <main
            class="site-wrapper"
            :class="{ 'site-sidebar--fold': sidebarFold }"
            v-loading.fullscreen.lock="loading"
            element-loading-text="拼命加载中">
        <template v-if="!loading">
            <main-navbar/>
            <main-sidebar/>
            <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
                <main-content/>

            </div>

        </template>
    </main>
</template>

<script>
    define(['vue', 'v!views/main-content', 'v!views/main-navbar', 'v!views/main-sidebar'], function (Vue) {

        return Vue.component('l-main', {
            template: template,
            data() {
                return {
                    loading: true
                }
            },
            computed: {
                documentClientHeight: {
                    get() {
                        return this.$store.state.common.documentClientHeight
                    },
                    set(val) {
                        this.$store.commit('common/updateDocumentClientHeight', val)
                    }
                },
                sidebarFold: {
                    get() {
                        return this.$store.state.common.sidebarFold
                    }
                },
                userId: {
                    get() {
                        return this.$store.state.user.id
                    },
                    set(val) {
                        this.$store.commit('user/updateId', val)
                    }
                },
                userName: {
                    get() {
                        return this.$store.state.user.name
                    },
                    set(val) {
                        this.$store.commit('user/updateName', val)
                    }
                }
            },

            mounted() {
                this.resetDocumentClientHeight()
                this.getUserInfo()
                this.loadMenuList()
            },
            methods: {
                // 重置窗口可视高度
                resetDocumentClientHeight() {
                    this.documentClientHeight = document.documentElement['clientHeight']
                    window.onresize = function () {
                        this.documentClientHeight = document.documentElement['clientHeight']
                    }
                },
                // 获取当前管理员信息
                getUserInfo() {
                    var self = this
                    this.$http({
                        url: this.$http.adornUrl('/system/SystemUser/info'),
                        method: 'get',
                        params: this.$http.adornParams()
                    }).then(function (res) {
                        var data = res.data
                        if (data && data.code === 0) {
                            self.loading = false
                            self.userId = data.id
                            self.userName = data.disName
                        }
                    })
                },
                //load menulist
                loadMenuList(){
                    var  self=this
                    this.$http.get(self.$http.adornUrl('/sys/menu/nav')).then(function(res){
                        if(res.data.code==0){
                            sessionStorage.setItem('menuList',  JSON.stringify(res.data.menuList));
                            // sessionStorage.setItem('')
                        }
                    }).catch(function(err){
                        console.error('-------load menulist error'+err)
                    })
                }
            }

        })
    })

</script>
