define(['vue','loader'],function (Vue,loader) {
 
 
    var  mainRoutes = {
        path: '/test',
        component:function(){
            return loader('views/demo/testupload')
        },
        meta: {
            title: 'test',
            isTab:false
        },
    }
    return mainRoutes;
})