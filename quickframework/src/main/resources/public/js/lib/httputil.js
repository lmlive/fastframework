define(['axios','mock'], function (axios,m) {
    // 创建实例时设置配置的默认值
    var instance = axios.create({
       // baseURL: 'http://localhost'
    });
  

    // 在实例已创建后修改默认值
   // instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
   const mock=new m(instance,{ delayResponse: 2000 })
   mock.onGet('/list/SystemUser').reply(200,{
	   total:200,
	   list:[]
   })
   mock.onPost('/add/SystemUser').reply(200,{
   	code:0,
   	message:'successfull'
   })
   
   mock.onPost('/find/SystemUser/1').reply(200,{
	loginName:'admin',
	age:20
   })
   
   
   mock.onPost('/edit/SystemUser').reply(200,{
	   code:0,
	   message:'successfull'
   })
   
   mock.onGet('/delete/SystemUser/1').reply(200,{
	   code:0,
	   message:'successfull'
   })
   
   mock.onGet('/login').reply(200,{
   	code:0,
   	message:'successfull',
	token:'MLSIUFOUDOFU#$$$$$$$$$$$$'
   })
   
    return instance;

})
