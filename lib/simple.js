(function(root, $, Mustache) {

    // The top-level namespace. All public Simple classes and modules will be
    // attached to this.
    var Simple = root.Simple = {};

    // Create a new view
    var View = Simple.View = function() {
        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }
    };

    // Create a new model
    var Model = Simple.Model = function() {
        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }
    };

    // Set up inheritance for the model and view.
    View.extend = Model.extend = function(properties) {
        var obj = $.extend.call({}, this.prototype, properties);
        return obj.constructor;
    };

    // Attach all inheritable methods to the View prototype.
    $.extend(View.prototype, {

        // Render template with the given input and change the view's element
        renderTemplate: function(data) {
            var template = this.template;
            var html = Mustache.to_html(template, data);
            this.el = $(html);
            return html;
        },

        // `render` is the core function that a view should override in order to
        // populate it's element. Should always return `this`.
        render: function() {
            return this;
        },

        // jQuery delegate for element lookup, scoped to DOM elements within
        // the current view.
        DOM: function(selector) {
            return this.el.find(selector);
        }

    });

})(this, jQuery, Mustache);