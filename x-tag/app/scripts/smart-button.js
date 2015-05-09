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
                this.initialize = function(){
                    this.done = false;
                    this.retry = false;
                    this.error = false;
                    var a = this.firstElementChild;
                    a.innerHTML = this.getAttribute("label");
                    this.retry = this.getAttribute("allow-retry") !== null;
                    a.className = baseClasses + successClass;

                    var self = this;
                    var a = this.firstElementChild;
                    this.endSuccess = function(){
                        a.innerHTML = self.getAttribute("complete-label") || self.getAttribute("label");
                        a.className = baseClasses + successClass;
                        self.done = true;
                    }
                    this.endError = function(){
                        a.className = baseClasses + failClass;
                        self.error = true;
                        a.innerHTML = self.getAttribute("failure-label") || self.getAttribute("label");
                        self.done = false;          
                    }
                    this.endDone = function(){
                        a.removeAttribute("disabled");        
                    }
                    this.addEventListener(this.getAttribute("activate") + ".success", this.endSuccess);
                    this.addEventListener(this.getAttribute("activate") + ".error", this.endError);
                    this.addEventListener(this.getAttribute("activate") + ".done", this.endDone);
                }
                this.initialize();
            },

            // Fires when an instance was inserted into the document
            inserted: function() {},

            // Fires when an instance was removed from the document
            removed: function() {
                this.removeEventListener(this.getAttribute("activate") + ".success", this.endSuccess);
                this.removeEventListener(this.getAttribute("activate") + ".error", this.endError);
                this.removeEventListener(this.getAttribute("activate") + ".done", this.endDone);
            },

            // Fires when an attribute was added, removed, or updated
            attributeChanged: function(attr, oldVal, newVal) {
                this.removeEventListener(this.getAttribute("activate") + ".success", this.endSuccess);
                this.removeEventListener(this.getAttribute("activate") + ".error", this.endError);
                this.removeEventListener(this.getAttribute("activate") + ".done", this.endDone);
                this.initialize();
            }
        },
        events: {
            'tap': function(){
                xtag.fireEvent(this, this.getAttribute("activate"));
                var a = this.firstElementChild;
                a.innerHTML = this.getAttribute("active-label") || this.getAttribute("label");
                a.setAttribute("disabled", true);
                this.error = false;
            }
        },
        accessors: {},
        methods: {}
    });
}());