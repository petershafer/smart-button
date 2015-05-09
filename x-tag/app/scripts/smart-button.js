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

                var self = this;
                var a = this.firstElementChild;
                this.addEventListener(this.getAttribute("activate") + ".success", function(){
                    a.innerHTML = self.getAttribute("complete-label") || self.getAttribute("label");
                    a.className = baseClasses + successClass;
                    self.done = true;
                });

                this.addEventListener(this.getAttribute("activate") + ".error", function(){
                    a.className = baseClasses + failClass;
                    self.error = true;
                    a.innerHTML = self.getAttribute("failure-label") || self.getAttribute("label");
                    self.done = false;          
                });
                
                this.addEventListener(this.getAttribute("activate") + ".done", function(){
                    a.removeAttribute("disabled");        
                });

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