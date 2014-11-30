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

function hello(){
    return delay(1000);
}

function world(){
    return fail(1000);
}

ExampleApp = React.createClass({
    render: function() {
        return (
        	/*jshint ignore:start */
            <div>
                <p><SmartButton 
                    activate={ hello }
                    label="Successful Button" 
                    active-label="Processing..." 
                    allow-retry 
                    complete-label="All Set!" 
                    failure-label="Oh No!" /></p>
                <p><SmartButton 
                    activate={ world } 
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
