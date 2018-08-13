define(['vue'],function (Vue) {
var c=Vue.extend({template:"<h1>ok</h1>",data(){return {}},
mounted:function () {
    console.log(this.$route)
    console.log(this.$route.params)
}
})
    var  mainRoutes = {
        path: '/test/:post*',
        component:c,
        meta: {
            title: '主入口整体布局',
            isTab:true
        },
    }
    return mainRoutes;
})