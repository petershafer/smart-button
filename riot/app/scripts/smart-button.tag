<smart-button>
    <a class={ className } disabled={ disabled } onClick={ handleClick }>{ label }</a>
    // Declare some component variables
    var baseClasses, successClass, failClass;
    this.compile = function(){
        this.completeLabel = opts["complete-label"] || opts["label"];
        this.activeLabel = opts["active-label"] || opts["label"];
        this.failureLabel = opts["failure-label"] || opts["label"];
        this.retry = opts["allow-retry"] !== null;
    }
    baseClasses = "btn btn-lg smartbutton";
    successClass = " btn-success";
    failClass = " btn-danger";
    this.done = false;
    this.retry = false;
    this.error = false;
    this.label = opts["label"];
    this.retry = opts["allow-retry"] !== null;
    this.className = baseClasses + successClass;
    this.disabled = false;
    // Setup listener functions
    this.endSuccess = function(){
        self.update({
            label: self.completeLabel,
            className: baseClasses + successClass,
            done: true
        });
    };
    this.endError = function(){
        self.update({
            className: baseClasses + failClass,
            error: true,
            label: self.failureLabel,
            done: false
        });            
    };
    this.endDone = function(){
        self.update({
            disabled: false
        });            
    };
    // Manage listeners and lifecycle events
    var self = this;
    opts.on(opts.activate + ".success", this.endSuccess);
    opts.on(opts.activate + ".error", this.endError);
    opts.on(opts.activate + ".done", this.endDone);
    this.on('update', this.compile);
    this.on('unmount', function(){
        this.off(opts.activate + ".success", this.endSuccess);
        this.off(opts.activate + ".error", this.endError);
        this.off(opts.activate + ".done", this.endDone);
    });
    // Handle component events
    handleClick(){
        if((this.error || this.done) && !this.retry){
            return;
        }
        var task = opts.trigger(opts.activate);

        this.update({
            label: this.activeLabel,
            disabled: true,
            error: false
        });
    }
</smart-button>
