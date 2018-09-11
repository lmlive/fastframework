define(['vue','loader'],function (Vue,loader) {
 
 
    var  mainRoutes = {
        path: '/test',
        component:function(){
            return loader('views/demo/testpick')
        },
        meta: {
            title: 'test',
            isTab:false
        },
    }
    return mainRoutes;
})