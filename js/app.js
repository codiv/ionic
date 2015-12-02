/* 
Created  by codiv on 15-11-14 
*/

/*
依赖说明：
ionic：ionic的;
myapp.controller：创建的myapp.controller，在controller.js里找到;
*/
var app=angular.module('myapp', ['ionic','myapp.controller','myapp.services']);

app.config(function($stateProvider,$urlRouterProvider){
	//获取本地localStorage的值，判断默认页面，启动画面
	// if (window.localStorage['first'] == 1) {
	// 	$urlRouterProvider.otherwise("/index");
	// }else{
	// 	$urlRouterProvider.otherwise("/welcome/w_page");
	// };
	$urlRouterProvider.otherwise("/welcome/w_page");
	$stateProvider
	.state("index",{
		url:"/index",
		templateUrl:"template/index.html",
		controller:"indexMain"
	})
	.state("item",{
		url:"/item",
		templateUrl:"template/item.html",
		controller:"itemTest"
	})
	.state("welcome.w_page",{
		url:"/w_page",
		views:{
			"welcome":{
				templateUrl:"template/welcome/w_page.html",
				controller:"welcome"//对应controller.js 里的名称
			}
		}
	})
	.state("welcome",{
		url:"/welcome",
		abstract:true,
		templateUrl:"template/welcome/index.html",
		controller:"welcome"
	})
})