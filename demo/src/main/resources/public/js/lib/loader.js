define([], function () {
    return   function (url) {
        return new  Promise(function (app,error) {
            var com = 'v!' + url;
            console.log('-----load component ' + com)
            require([com], function (c) {
                app(c)
            })
        })
    }
})
