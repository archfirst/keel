YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BaseView",
        "ExceptionUtil",
        "FrameworkException"
    ],
    "modules": [
        "BaseView",
        "ExceptionUtil"
    ],
    "allModules": [
        {
            "displayName": "BaseView",
            "name": "BaseView",
            "description": "framework/BaseView\n\nThis is a view base class built on top of the default Backbone.View; it\nprovides a set of rendering, binding, and lifecycle methods that tend to\nbe useful in Backbone applications. As part lifecycle methods, it provides\nthe facility to maintain a set of child views, especially to avoid zombies.\n\nThis view has been further extended to specialize the render method.\nTo use this view, you should call the 'extend' method of the appropriate\nsub-class just like you would extend the normal 'Backbone.View'."
        },
        {
            "displayName": "ExceptionUtil",
            "name": "ExceptionUtil",
            "description": "framework/ExceptionUtil\nThis is an Exception Utility intended to be used within the framework\nfor alerting implementors about errors such as bad arguments passed to\nframework methods.\n\nIt includes a general FrameworkException constructor. This could be extended\nif necessary to present more specific exceptions if necessary."
        }
    ]
} };
});