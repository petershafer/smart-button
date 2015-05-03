<smart-button>
    <a class={ className } onClick={ handleClick }>{ label }</a>
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
        var task = dataStore[opts["activate"]] || null;
        if(task == null){
            return;
        }else{
            this.update({
                label: opts["active-label"] || opts["label"],
                disabled: true,
                error: false
            });
            var self = this;
            task().then(function(){ // Success
                self.update({
                    label: opts["complete-label"] || opts["label"],
                    className: baseClasses + successClass,
                    done: true
                });
            })
            .catch(function(){  // Error
                self.update({
                    className: baseClasses + failClass,
                    error: true,
                    label: opts["failure-label"] || opts["label"],
                    done: false
                });
            })
            .done(function(){ // Clean up
                self.update({
                    disabled: false
                });
            });
        }
    }
</smart-button>
