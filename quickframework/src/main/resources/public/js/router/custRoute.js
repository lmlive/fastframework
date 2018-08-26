define(['vue','loader'],function (Vue,loader) {
 
 
    var  mainRoutes = {
        path: '/test',
        component:function(){
            return loader('views/demo/testfield')
        },
        meta: {
            title: 'test',
            isTab:false
        },
    }
    return mainRoutes;
})