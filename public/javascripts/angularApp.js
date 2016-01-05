var myapp=angular.module('angApp',['ui.router']);

myapp.factory('postsFac',function(){
	var o={
		posts:[]
	};
	return o;
});

myapp.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('home',{
		url:'/home',
		templateUrl:'views/home.ejs',
		controller:'Mainctrl'
	})
	.state('posts',{
		url:'/posts/{id}',
		templateUrl:'views/posts.ejs',
		controller:'postCtrl'
	});

	$urlRouterProvider.otherwise('home');
});

myapp.controller('Mainctrl',function($scope, postsFac){
	$scope.postslist=postsFac.posts;

	$scope.plus=function(d){
		++d.vote;
	};
	$scope.minus=function(d){
		if(d.vote==0)
			d.vote=0;
		else
			--d.vote;
	};
	$scope.addPost=function(){
		if(!$scope.title || $scope.title=='')
			return;

		$scope.postslist.push({
			title: $scope.title,
			link: $scope.link,
			comment: [{
				author: 'test',
				body: 'test',
				vote: 2
			}],
			vote: 0
		});
		$scope.title='';
		$scope.link='';
		$scope.comment='';
	}
});

myapp.controller('postCtrl', function($scope, $stateParams, postsFac){
	$scope.postslist=postsFac.posts[$stateParams.id];
	$scope.plus=function(d){
		++d.vote;
	};
	$scope.minus=function(d){
		if(d.vote==0)
			d.vote=0;
		else
			--d.vote;
	};
	$scope.addComment=function(){
		$scope.postslist.comment.push({
			author: $scope.author,
			body: $scope.body,
			vote: 0
		});
		$scope.author='';
		$scope.body='';
	};
});