/** @jsx React.DOM */

'use strict';

var React = require('react'),
    ExampleApp;
var SmartButton = require('./components/SmartButton')

function delay(ms) {
    var deferred = Q.defer();
    setTimeout(deferred.resolve, ms);
    return deferred.promise;
}

function fail(ms) {
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

ExampleApp = React.createClass({
    render: function() {
        return (
        	/*jshint ignore:start */
            <div>
                <p><SmartButton 
                    activate="hello"
                    label="Successful Button" 
                    active-label="Processing..." 
                    allow-retry 
                    complete-label="All Set!" 
                    failure-label="Oh No!" /></p>
                <p><SmartButton 
                    activate="world"
                    label="Failing Button" 
                    active-label="Processing..." 
                    allow-retry 
                    complete-label="All Set!" 
                    failure-label="Oh No! Try Again." /></p>
            </div>
            /*jshint ignore:end */
        );
    }
});

React.render(
    /*jshint ignore:start */
    <ExampleApp />,
    /*jshint ignore:end */
    document.getElementById('app')
);
