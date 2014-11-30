/** @jsx React.DOM */
var React = require('react');

var SmartButton = React.createClass({
    propTypes: {
        activeLabel: React.PropTypes.string,    // (Optional) A string that’s used as the button’s label while the asynchronous task is being run.
        allowRetry: React.PropTypes.bool,       // (Optional) Adding this attribute to the element indicates that it can only be pressed once.
        completeLabel: React.PropTypes.string,  // (Optional) A string that’s used as the button’s label after the asynchronous task has completed successfully.
        failureLabel: React.PropTypes.string,   // (Optional) A string that’s used as the button’s label after the asynchronous task has failed.
        label: React.PropTypes.string,          // A string that’s used as the button’s label during an idle state.
        activate: React.PropTypes.func,         // This should specify a function or method that performs an asynchronous task and returns a promise that will be fulfilled on completion.
    },
    getInitialState: function() {
        // Define the initial state of the button
        return {
            error: false,
            activated: false,
            done: false,
            buttonLabel: this.props.label
        };
    },
    trigger: function() {
        // Define click behavior
        // Cancel subsequent clicks after the user is already done.
        if((this.state.error || this.state.done) && !this.props['allow-retry']){
            return;
        }
        // Set button status to active.
        this.setState({
            error: false,
            activated: true,
            done: false,
            buttonLabel: this.props['active-label'] || this.props['label']
        });
        // Trigger the task to complete.
        var promise = (this.props.activate)();
        // Handle the result of the task.
        var self = this;
        promise.then(function(){ // Success
            self.finished();
        })
        .catch(function(){  // Error
            self.problem();
        })
        .done(function(){ // Clean up
            self.completed();
        });
    },
    finished: function(){
        // Set button to completed state.
        this.setState({
            error: this.state.error,
            activated: this.state.activated,
            done: true,
            buttonLabel: this.props['complete-label'] || this.props['label']
        });
    },
    problem: function(){
        // Set button to error state.
        this.setState({
            error: true,
            buttonLabel: this.props['failure-label'] || this.props['label'],
            done: false,
            activated: this.state.activated
        });
    },
    completed: function(){
        // Set button as inactive.
        this.setState({
            error: this.state.error,
            buttonLabel: this.state.buttonLabel,
            done: this.state.done,
            activated: false
        });
    },
    componentDidMount: function() {
        // Adding to DOM
    },
    componentWillUnmount: function() {
        // Removing from DOM
    },
    render: function() {
        // Render to Page
        var classes = "btn btn-lg smartbutton";
        if(!this.state.error){
            classes += " btn-success";
        }else{
            classes += " btn-danger";
        }
        return (
            <a className={ classes } disabled={ this.state.activated } onClick={ this.trigger }>{ this.state.buttonLabel }</a>
        );
    }
});


module.exports = SmartButton;
