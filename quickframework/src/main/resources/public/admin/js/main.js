requirejs.config({
    basePath: '',
    paths: {
        'vue': "./lib/vue",
        "ELEMENT": "lib/elementjs",
        "v": "lib/requirejs-vue",
        "VueRouter": "lib/vue-router",
        "axios": "lib/axios.min",
        "mock": "lib/axios-mock-adapter.min",
        'httputil': "lib/httputil",
        "validate": 'utils/validate',
        'request': 'utils/httpRequest',
		"routeInfo":'router/index',
		"loader":'lib/loader',
		'merge':'lib/merge',
		'vuex':'lib/vuex',
        'config':'utils/config',
		'cookie':'lib/vue-cookies'
    },
	shim: {
			'VueRouter': {exports: "VueRouter"}

	}

})

require(['vue', 'ELEMENT', 'store/index','routeInfo','utils/httpRequest','cookie','v!App'],
    function (Vue, elementui, store,routeInfo,http,cookie,app) {
        Vue.use(elementui)
        Vue.use(cookie)
	    Vue.prototype.$http=http
        Vue.prototype.$JSON=JSON
          new Vue({
            router: routeInfo,
            store:store,
            el: '#root',
            render:h=>h(app)

        })
        return app;
    })
