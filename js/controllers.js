/*
 Created  by codiv on 15-11-14
  */
//自定义创建的myapp.controller名字，要跟app.js里的依赖注入参数一致;
var app=angular.module("myapp.controller",[]);

//欢迎页面的控制器, welcome与app.js里的controller:"welcome"参数一致
app.controller("welcome",function($scope,$ionicModal,$state,$timeout){
	$scope.guideFlag = 'a';
	$scope.guideSure = function(){
		$state.go("index");//跳转index页面
		window.localStorage['first'] = '1'; //localStorage H5本地储存
	}
	$scope.onLeft=function(){
		var obj = document.getElementById("guide-wrapper");
		var ulObj = document.getElementById("guide-arrow");
		var w = obj.children[0].offsetWidth;//取得可视窗口的宽度
		var totalW = w * (obj.children.length - 1); //取得被隐藏的总宽度
		var totalWe = w * (obj.children.length - 2); 
		//Math.abs 取绝对值，dataset是H5的特性，以下dataset.codiv则是取得codiv属性的值
		if (Math.abs(obj.dataset.codiv) >= totalW) return; 
		if (Math.abs(obj.dataset.codiv) >=totalWe)  $scope.guideFlag='b';
		var g = obj.dataset.codiv - w;
		//transform(x,y,z)元素位移，以下是移动X轴（负值向左编移）
		obj.style.webkitTransform = 'translateX(' + g +'px) translateZ(0)'; //兼容 webkit 内核浏览器
		obj.style.transform = 'translateX(' + g + 'px) translateZ(0)';
		ulObj.children[Math.abs( g / w ) - 1].className = ''; 
		ulObj.children[Math.abs(g / w )].className = 'active';
		obj.dataset.codiv = g; 
	};
	$scope.onRight=function(){
		$scope.guideFlag='a';
		var obj=document.getElementById("guide-wrapper");
		var w=obj.children[0].offsetWidth;
		var totalW = w * (obj.children.length - 1);
		if (Math.abs(obj.dataset.codiv) == 0) return;
		var g = parseInt(obj.dataset.codiv) + parseInt(w);// parseInt 取整
		obj.style.webkitTransform = 'translateX(' + g +'px) translateZ(0)'; 
		obj.style.transform = 'translateX(' + g + 'px) translateZ(0)';
		$timeout(function(){
			var ulObj=document.getElementById("guide-arrow");
			ulObj.children[Math.abs( g / w ) + 1].className = '';
			ulObj.children[Math.abs( g / w )].className = 'active';
			if (Math.abs(g / w) == ulObj.children.length - 2) {
				ulObj.children[0].className = "";
			};
		});
		obj.dataset.codiv=g;
	}
})
.controller("indexMain",function($scope,$http,$state,$ionicSlideBoxDelegate,userInfo){
	$scope.banner=[];
	$http({
		method:"GET",
		url:"data/GetIndexSlides.json"
	}).success(function(data){
		if (data.error==0) {
			//JSON.stringify()用来将对象序列化为JSON字符串
			//JSON.parse() 用来将JSON数据解析为js对象
			userInfo.addLong('bannerImg', JSON.stringify(data.list));
			$scope.banner = JSON.parse(userInfo.wl.bannerImg);
			$ionicSlideBoxDelegate.update();//update()重新调整参数
		};
	}).error(function(){
		console.log(data);
	});	
})
.controller('itemTest', function($scope,$ionicSlideBoxDelegate,$ionicBackdrop,$ionicPopover,$timeout,$compile,$ionicModal,userInfo){
	$scope.num=1;
	$scope.total=6;//$ionicSlideBoxDelegate.slidesCount(); //取得题目的总数
	//当前题数
	$scope.goChanged=function(index){
		$scope.num=index+1; 
	}
	//上一题
	$scope.goPrev=function(){
		$ionicSlideBoxDelegate.previous();
		//注意：如要用angular.element 则要导入angular与jq核心库，
		if ($scope.num !== $ionicSlideBoxDelegate.slidesCount()) {
			var html = '<button class="button" ng-click="goNext()">下一题</button>';
			$scope.operation(html);
		}
	}
	//下一题
	$scope.goNext=function(){
		$ionicSlideBoxDelegate.next();
		if ($scope.num == $ionicSlideBoxDelegate.slidesCount() ) {
			var html = '<button class="button" ng-click="openPopover($event)">交试卷</button>';
			$scope.operation(html);
		}
	}
	$ionicSlideBoxDelegate.update();//有时，比如当容器尺寸发生变化时，需要调用update()方法重绘幻灯片。

	//注意：如要用angular.element 则要导入angular与jq核心库，
	$scope.operation=function(html){
		angular.element(".operation .button").remove();
		//如动态添加元素带有事件，则用$compile()重新编译，否则点击事件无效
		var template = angular.element(html);
		var mobileDialogElement = $compile(template)($scope);
		angular.element(".operation").append(mobileDialogElement);
	}

	// 弹窗答题卡
	$ionicPopover.fromTemplateUrl('template/card.html', {
		scope: $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});
	$scope.openPopover = function($event) {
		$scope.popover.show($event);
		angular.element('.main>span').removeClass('active01');
		$scope.sid=JSON.parse(userInfo.wl.getItem("info"))
		for (var i = 0; i < $scope.sid.length; i++) {
			angular.element('.main>span[data-id='+$scope.sid[i].id+']').addClass('active01');
		};
	};
	console.log(angular.element(".issue").html())
		console.log(1111)
	angular.element(".codiv>dd").bind('click', function() {
	});
	//题目跳转
	$scope.goTod = function(a) {
		$scope.popover.hide();
		$scope.goTo(a);
	};
	$scope.goTo=function(a){
		$ionicSlideBoxDelegate.slide(a)
		if ($scope.num !== $ionicSlideBoxDelegate.slidesCount()) {
			var html = '<button class="button" ng-click="goNext()">下一题</button>';
			$scope.operation(html);
		};
	}
	//选中答案
	$scope.theAnswer=function(uid,n){
		// window.localStorage.clear()
		$scope.selectedRow = n;
		if (userInfo.wl.getItem("info") == null) {
			$scope.tasks = [{
				id:uid,
				as:n				
			}];
			userInfo.add("info",JSON.stringify($scope.tasks));
		}else{
			$scope.tasks = JSON.parse(userInfo.wl.getItem("info"))
			for (var i = 0; i < $scope.tasks.length; i++) {
				//查找数组$scope.tasks里对像id的值是否存在传进来的uid，如果存在替换对像里的值
				if ($scope.tasks[i].id == uid) {
					//splice(0,1,{A})：替换一个下标为0的数组为{A}
					//splice(1,2)：从下标为1起，删除两个元素
					$scope.tasks.splice(i,1,{id:uid,as:n})
					return;
				}
			};
			$scope.tasks.push({
				id:uid,
				as:n
			});
			userInfo.add("info",JSON.stringify($scope.tasks));
		};
		console.log(userInfo.wl)
	}
})



















