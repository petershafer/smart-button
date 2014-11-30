(function() {
	var delay = function(ms) {
        var deferred = Q.defer();
        setTimeout(deferred.resolve, ms);
        return deferred.promise;
    }

    var fail = function(ms) {
        var deferred = Q.defer();
        setTimeout(deferred.reject, ms);
        return deferred.promise;
    }
	window._smartButton = window._smartButton || [];
	_smartButton["hello"] = function(){
		return delay(1000);
	}
	_smartButton["world"] = function(){
		return fail(1000);
	}
	// _smartButton["hello"]().then(function(){
	// 	alert("hello");
	// });
}());