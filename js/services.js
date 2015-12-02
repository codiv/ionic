var app=angular.module("myapp.services",[]);

app.factory("userInfo",function(){
	var userInfo={};
	return {
		//封装window.localStorage别名，方便调用
		wl : window.localStorage,
		//创建缓存
		addLong:function(k, v){
			window.localStorage[k] = v;
		},
		add:function(k, v){
			window.localStorage[k] = v
		},
		//删除缓存，constructor 属性返回对创建此对象的数组函数的引用。
		removeLong:function(a){
			//多个格式：userInfo.removeLong(['b1', 'b2'])
			if (a.constructor == Array) { 
				for (var i = 0; i < a.length; i++) {
					window.localStorage.removeItem(a[i])
				};
			};
			//单个格式：userInfo.removeLong("b1")
			window.localStorage.removeItem(a);
		},
		//。。。。。。
		save:function(a){
			for(var k in a){
				window.localStorage[k] = userInfo[k] = a[k];
			};
			return userInfo;
		}
	}
})