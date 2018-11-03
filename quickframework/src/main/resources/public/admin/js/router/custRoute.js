define(['vue','loader'],function (Vue,loader) {
 
 
    var  mainRoutes = {
        path: '/test',
        component:function(){
            // return loader('views/demo/remote')
            return loader('http://p1i0wixvz.bkt.clouddn.com/remote2.vue')
        },
        meta: {
            title: 'static.test',
            isTab:false
        },
    }
    return mainRoutes;
})