define([], function () {

    var uuid=null;
    return {

        /**
         * 获取uuid
         */
        getUUID() {
            if(uuid)return uuid;
              'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                uuid= (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
            })
            return uuid;
        },

        /**
         * 是否有权限
         * @param {*} key
         */
        isAuth(key) {
            return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
        },

        /**
         * 树形数据转换
         * @param {*} data
         * @param {*} id
         * @param {*} pid
         */
        treeDataTranslate(data, id = 'id', pid = 'parentId') {
            var res = []
            var temp = {}
            for (var i = 0; i < data.length; i++) {
                temp[data[i][id]] = data[i]
            }
            for (var k = 0; k < data.length; k++) {
                if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
                    if (!temp[data[k][pid]]['children']) {
                        temp[data[k][pid]]['children'] = []
                    }
                    if (!temp[data[k][pid]]['_level']) {
                        temp[data[k][pid]]['_level'] = 1
                    }
                    data[k]['_level'] = temp[data[k][pid]]._level + 1
                    temp[data[k][pid]]['children'].push(data[k])
                } else {
                    res.push(data[k])
                }
            }
            return res
        }
    }
})
