define([
    'require',
     
], function(require) {
    'use strict';
    return 	 {
        "code": 0,
        "msg": "操作成功",
        "data": {
          "menus": [
            {
              "obj": {
                "id": 2,
                "menuId": null,
                "parentId": null,
                "name": "系统设置",
                "url": null,
                "perms": "sys:config:all",
                "type": "FOLDER",
                "icon": null,
                "orderNum": 0
              },
              "list": [
                {
                  "obj": {
                    "id": 3,
                    "menuId": null,
                    "parentId": 2,
                    "name": "应用配置",
                    "url": "/system/entity/Application/list",
                    "perms": "sys:application:all",
                    "type": null,
                    "icon": null,
                    "orderNum": null
                  },
                  "list": []
                },
                {
                  "obj": {
                    "id": 4,
                    "menuId": null,
                    "parentId": 2,
                    "name": "用户管理",
                    "url": "/system/entity/SystemUser/list",
                    "perms": "sys:user:all",
                    "type": null,
                    "icon": null,
                    "orderNum": null
                  },
                  "list": []
                },
                {
                  "obj": {
                    "id": 5,
                    "menuId": null,
                    "parentId": 2,
                    "name": "角色管理",
                    "url": "/system/entity/Role/list",
                    "perms": "sys:role:all",
                    "type": null,
                    "icon": null,
                    "orderNum": null
                  },
                  "list": []
                },
                {
                  "obj": {
                    "id": 6,
                    "menuId": null,
                    "parentId": 2,
                    "name": "菜单管理",
                    "url": "/system/entity/SysMenu/list",
                    "perms": "sys:menu:all",
                    "type": null,
                    "icon": null,
                    "orderNum": null
                  },
                  "list": []
                },
                {
                  "obj": {
                    "id": 7,
                    "menuId": null,
                    "parentId": 2,
                    "name": "字典管理",
                    "url": "/system/entity/Dictionary/list",
                    "perms": "sys:dictionary:all",
                    "type": null,
                    "icon": null,
                    "orderNum": null
                  },
                  "list": []
                }
              ]
            }
          ],
          "user": {
            "id": 8,
            "loginName": "admin",
            "disName": null,
            "password": "123456",
            "roles": [],
            "recordInfo": {
              "createDate": "2018-08-16 03:48:10",
              "updateDate": null
            },
            "age": null,
            "introduce": "system user",
            "regDate": "2018-08-16 03:48:10",
            "photo": null,
            "file": null,
            "upFiles": null,
            "sex": null
          }
        }
      }
});