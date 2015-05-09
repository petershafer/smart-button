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

    var taskHandler = riot.observable()

    taskHandler.on('hello', function(){
        delay(1000).then(function(){
            taskHandler.trigger('hello.success');
        }).catch(function(){
            taskHandler.trigger('hello.error');
        }).done(function(){
            taskHandler.trigger('hello.done');
        });
    });

    taskHandler.on('world', function(){
        fail(1000).then(function(){
            taskHandler.trigger('world.success');
        }).catch(function(){
            taskHandler.trigger('world.error');
        }).done(function(){
            taskHandler.trigger('world.done');
        });
    });

    riot.mount('smart-button', taskHandler);
}());