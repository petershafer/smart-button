(function(document) {
  'use strict';

  document.addEventListener('polymer-ready', function() {
    // Perform some behaviour
    console.log('Polymer is ready to rock!');

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
        	e.target.dispatchEvent(new Event('hello.success'));
        }).catch(function(){
        	e.target.dispatchEvent(new Event('hello.error'));
        }).done(function(){
        	e.target.dispatchEvent(new Event('hello.done'));
        });
    });

    document.getElementsByTagName("body")[0].addEventListener('world', function(e){
        fail(1000).then(function(){
        	e.target.dispatchEvent(new Event('world.success'));
        }).catch(function(){
        	e.target.dispatchEvent(new Event('world.error'));
        }).done(function(){
        	e.target.dispatchEvent(new Event('world.done'));
        });
    });


  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
