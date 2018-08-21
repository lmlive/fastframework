<template>
    <el-submenu v-if="menu.list && menu.list.length >= 1" :index="menu.id + ''" :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
        <template slot="title">
               <i class="el-icon-edit"></i>
            <span>{{ menu.obj.name }}</span>
        </template>
        <sub-menu v-for="item in menu.list" :key="item.id" :menu="item" :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
    </el-submenu>
    <el-menu-item v-else :index="menu.obj.id + ''" @click="gotoRouteHandle(menu.obj)">
        <span>{{ menu.obj.name }}</span>
    </el-menu-item>
</template>

<script>
    define(['vue'], function (Vue) {

        return Vue.component('sub-menu',{
            template: template,
            props: {
                menu: {
                    type: Object,
                    required: true
                },
                dynamicMenuRoutes: {
                    type: Array,
                    required: true
                }
            },
          
            computed: {
                sidebarLayoutSkin: {
                    get() {
                        return this.$store.state.common.sidebarLayoutSkin
                    }
                }
            },
            methods: {
                // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
                gotoRouteHandle(menu) {
                  
                 if(menu.url.indexOf('dynamic')>-1){
                     var url=menu.url.substring(menu.url.indexOf('dynamic/')+8)
                     var entityName=''
                     if(url.lastIndexOf('/')>-1)
                      entityName=url.substring(0,url.indexOf('/'))
                      else
                      entityName=url
                     this.$router.push({name:'dynamic',params:{entityName:entityName,name:menu.name}})
                 }else
                  this.$router.push(menu.url)
                    // var route = this.dynamicMenuRoutes.filter(function(item){return  item.meta.menuId === menu.menuId } )
                    // if (route.length >= 1) {
                    //     this.$router.push({
                    //         name: route[0].name
                    //     })
                    // }
                }
            }
        })
    })
</script>
