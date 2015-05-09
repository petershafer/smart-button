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

    document.getElementsByTagName("body")[0].addEventListener('hello', function(e){
        delay(1000).then(function(){
            xtag.fireEvent(e.target, 'hello.success');
        }).catch(function(){
            xtag.fireEvent(e.target, 'hello.error');
        }).done(function(){
            xtag.fireEvent(e.target, 'hello.done');
        });
    });

    document.getElementsByTagName("body")[0].addEventListener('world', function(e){
        fail(1000).then(function(){
            xtag.fireEvent(e.target, 'world.success');
        }).catch(function(){
            xtag.fireEvent(e.target, 'world.error');
        }).done(function(){
            xtag.fireEvent(e.target, 'world.done');
        });
    });

}());