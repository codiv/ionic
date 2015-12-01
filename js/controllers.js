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
.controller('itemTest', function($scope,$ionicSlideBoxDelegate,$ionicBackdrop,$ionicPopover,$timeout,$compile){
	// angular.element(".box>ul>li").click(function(){
	// 	console.log(112)
	// });

	$scope.num=1;
	$scope.total=6;
	$scope.txtGo="goNext()"
	$scope.txt="下一题"
	// $scope.total=$ionicSlideBoxDelegate.slidesCount(); //取得幻灯的总数

	//pager-click="go(index)" 点击圆点跳转对应幻灯
	$scope.go=function(index){
		$ionicSlideBoxDelegate.slide(index);
	};
	$scope.goTo=function(a){
		$ionicSlideBoxDelegate.slide(a)
	}
	//当前页数
	$scope.go_changed=function(index){
		$scope.num=index+1;
	}
	//上一页
	$scope.goPrev=function(){
		$ionicSlideBoxDelegate.previous();
	}
	//下一页
	$scope.goNext=function(){
		$ionicSlideBoxDelegate.next();
		//如果是最后一题则弹出答题卡
		
		console.log(angular.element(".codiv"))
		if ($scope.num == $ionicSlideBoxDelegate.slidesCount() ) {
			// $scope.openPopover();

			// var name = data.list[k].name;
			// var html = '<a class="item dwitem" ng-click=selectDanWei("' + name.toString() + '")>' + data.list[k].name + '</a>';
			// var template = angular.element(html);
			// var mobileDialogElement = $compile(template)($scope);
			// angular.element(".danweilist").append(mobileDialogElement);
			// angular.element(".codiv").remove();
			// $scope.txtGo=$compile("openPopover($event)")($scope)
			// $scope.txt="提交1"
		};
	}
	//有时，比如当容器尺寸发生变化时，需要调用update()方法重绘幻灯片。
	$ionicSlideBoxDelegate.update();

	// 弹窗答题卡

	$ionicPopover.fromTemplateUrl('template/card.html', {
		scope: $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});
	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};
	$scope.goTod = function(a) {
		$scope.popover.hide();
		$scope.goTo(a);
	};

})



















