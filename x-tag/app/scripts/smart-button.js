(function() {
    // Component Globals
    var dataStoreName = "_smartButton";
    var dataStore = window[dataStoreName] || [];
    var baseClasses = "btn btn-lg smartbutton";
    var successClass = " btn-success";
    var failClass = " btn-danger";
    // Define component
    xtag.register('smart-button', {
        content: '<a class=""></a>',
        lifecycle: {
            // Fires when an instance of the element is created
            created: function() {
                this.done = false;
                this.retry = false;
                this.error = false;
                var a = this.firstElementChild;
                a.innerHTML = this.getAttribute("label");
                this.retry = this.getAttribute("allow-retry") !== null;
                a.className = baseClasses + successClass;
            },

            // Fires when an instance was inserted into the document
            inserted: function() {},

            // Fires when an instance was removed from the document
            removed: function() {},

            // Fires when an attribute was added, removed, or updated
            attributeChanged: function(attr, oldVal, newVal) {}
        },
        events: {
            'tap': function(){
                if((this.error || this.done) && !this.retry){
                    return;
                }
                var a = this.firstElementChild;
                var task = dataStore[this.getAttribute("activate")] || null;
                if(task == null){
                    return;
                }else{
                    a.innerHTML = this.getAttribute("active-label") || this.getAttribute("label");
                    a.setAttribute("disabled", true);
                    console.log(a);
                    this.error = false;
                    var self = this;
                    task().then(function(){ // Success
                        a.innerHTML = self.getAttribute("complete-label") || self.getAttribute("label");
                        a.className = baseClasses + successClass;
                        self.done = true;
                    })
                    .catch(function(){  // Error
                        a.className = baseClasses + failClass;
                        self.error = true;
                        a.innerHTML = self.getAttribute("failure-label") || self.getAttribute("label");
                        self.done = false;
                    })
                    .done(function(){ // Clean up
                        a.removeAttribute("disabled");
                        console.log(a);
                    });
                }
            }
        },
        accessors: {},
        methods: {}
    });
}());