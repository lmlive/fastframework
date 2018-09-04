define(['axios', 'lib/vue-cookies', 'vue', 'VueRouter', 'lib/qs', 'lib/merge'],
    function (axios, cookie, Vue, router, qs, merge) {
        Vue.use(cookie)
        var  baseUrl = "http://localhost:900/js/mock/"
        var http = axios.create({
            timeout: 1000 * 30,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })

        /**
         * 请求拦截
         */
        http.interceptors.request.use(function (config) {
            config.headers['token'] = Vue.cookies['token'] // 请求头带上token
          //  console.info(Vue.cookies['token'])
            return config
        }, function (error) {
            return Promise.reject(error)
        })

        /**
         * 响应拦截
         */
        http.interceptors.response.use(function (response) {
            if (response.data && response.data.code === 401) { // 401, token失效
                Vue.cookies.cookie = undefined
               // router.options.isAddDynamicMenuRoutes = false
                router.push({
                    name: 'login'
                })
            }
            return response
        }, function (error) {
            return Promise.reject(error)
        })

        /**
         * 请求地址处理
         * @param {*} actionName action方法名称
         */
        http.addUrl = function (actionName) {
            // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
            return baseUrl + actionName
        }

        /**
         * get请求参数处理
         * @param {*} params 参数对象
         * @param {*} openDefultParams 是否开启默认参数?
         */
        http.adornParams = function (params, openDefultParams) {
            var defaults = {
                't': new Date().getTime()
            }
            return openDefultParams ? merge(defaults, params) : params
        }

        /**
         * post请求数据处理
         * @param {*} data 数据对象
         * @param {*} openDefultdata 是否开启默认数据?
         * @param {*} contentType 数据格式
         *  json: 'application/json; charset=utf-8'
         *  form: 'application/x-www-form-urlencoded; charset=utf-8'
         */
        http.adornData = function (data, openDefultdata, contentType) {
            var defaults = {
                't': new Date().getTime()
            }
            if (contentType == undefined) contentType = 'json';
            if (openDefultdata == undefined) openDefultdata = true
            data = openDefultdata ? merge(defaults, data) : data
            return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
        }


        return http
    })
