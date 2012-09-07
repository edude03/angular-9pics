var myApp = angular.module('myApp', []);

myApp.filter('fromNow', function() {
	return function(input) {
		return moment.unix(input).fromNow();
	}
});

myApp.filter('imgur', function(){
	return function(input) {
		//imgur.com + 5 letter image code
		if (input.length == 22) {
			return input += '.jpg';
		}
		return input;
	}
});

myApp.filter('comments', function() {
	return function(input) {
		return "http://reddit.com" + input;
	}
});

function PicsCtrl($scope, $http) {
	$scope.reload = function() {
		var subreddit = $('#subreddit').val().length > 0 ? $('#subreddit').val() : 'pics';
		var url = 'http://api.reddit.com/r/' + subreddit + '.json?jsonp=JSON_CALLBACK';
		$scope.loadContent(url);
	};

	$scope.nextPage = function() {
		var url = 'http://api.reddit.com/r/pics.json?jsonp=JSON_CALLBACK&count=25&after=' . $scope.after;
		alert(url);
	};

	$scope.loadContent = function(url) {
		$http.jsonp(url).success(function(data){
			$scope.$root.pics = data.data.children;
			$scope.after = data.after;
		});	
	};		

	$scope.loadContent('http://api.reddit.com/r/pics.json?jsonp=JSON_CALLBACK');	
}