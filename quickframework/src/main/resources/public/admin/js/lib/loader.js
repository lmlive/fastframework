define([], function () {
    return   function (url) {
        return new  Promise(function (resolve,reject) {
            var com = 'v!' + url;
            console.log('-----load component ' + com)
            require([com], function (c) {
                resolve(c)
            })
        })
    }
})
