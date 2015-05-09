<smart-button>
    <a class={ className } disabled={ disabled } onClick={ handleClick }>{ label }</a>
    var dataStoreName = "_smartButton";
    var dataStore = window[dataStoreName] || [];
    var baseClasses = "btn btn-lg smartbutton";
    var successClass = " btn-success";
    var failClass = " btn-danger";
    this.done = false;
    this.retry = false;
    this.error = false;
    this.label = opts["label"];
    this.retry = opts["allow-retry"] !== null;
    this.className = baseClasses + successClass;
    this.disabled = false;
    handleClick(){
        if((this.error || this.done) && !this.retry){
            return;
        }
        var task = opts.trigger(opts.activate);//dataStore[opts["activate"]] || null;

        this.update({
            label: opts["active-label"] || opts["label"],
            disabled: true,
            error: false
        });

        var self = this;
        opts.on(opts.activate + ".success", function(){
            self.update({
                label: opts["complete-label"] || opts["label"],
                className: baseClasses + successClass,
                done: true
            });            
        });

        opts.on(opts.activate + ".error", function(){
            self.update({
                className: baseClasses + failClass,
                error: true,
                label: opts["failure-label"] || opts["label"],
                done: false
            });            
        });
        
        opts.on(opts.activate + ".done", function(){
            self.update({
                disabled: false
            });            
        });
    }
</smart-button>
