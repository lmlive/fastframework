define(['vue', 'vuex', 'store/modules/common', 'store/modules/user'], function (Vue, vuex, common, user) {
    Vue.use(vuex)
    return new vuex.Store({
        modules: {
            common,
            user
        }

    })
})
