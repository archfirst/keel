YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BaseView"
    ],
    "modules": [
        "BaseView"
    ],
    "allModules": [
        {
            "displayName": "BaseView",
            "name": "BaseView",
            "description": "framework/BaseView\n\nThis is a view base class built on top of the default Backbone.View; it\nprovides a set of rendering, binding, and lifecycle methods that tend to\nbe useful in Backbone applications. As part lifecycle methods, it provides\nthe facility to maintain a set of child views, especially to avoid zombies.\n\nThis view has been further extended to specialize the render method.\nTo use this view, you should call the 'extend' method of the appropriate\nsub-class just like you would extend the normal 'Backbone.View'."
        }
    ]
} };
});