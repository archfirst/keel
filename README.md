# backbone-arch-demo

An example of a preferred Backbone.js architecture.

## Organization
The application is built in a single `index.html` located in the root directory. The application is further organized into two sub-directories:

* `/app`
* `/libs`

`/libs` contains third-party libraries and is further broken down into `/css` and `/js` directories.

`/app` contains all of the user-written application code. This includes the following files:

* `app.js` - The main application object/controller
* `main.js` - Require.js configuration and initialization
* `router.js` - Application routing. Separated out because this can eventually grow quite large
* `text.js` - Require.js plugin allowing import of files as text. Used for templating.

`/app` is further broken down into the following directories:

* `/css`
* `/img`
* `/pages`
* `/widgets`

`/css` and `/img` contain what you would expect: stylesheets and images used within the application. Where multiple CSS files are used, there is an `index.css` that `@import`s all needed stylesheets. These will be concatenated together at build time.

The contents of `/pages` and `/widgets` are, for all intents and purposes, constructed identically. Each subdirectory represents a complete page 'module' to be built with r.js and dynamically loaded by Require. The distinction is one of DOM hierarchy: `/pages` are the top-most level views, spawning child widgets from the `/widgets` directory.

In the current example, there is no need for a third level of hierarchy, but one could extend this to include a `/regions` directory that represent sub-sections of a page (e.g. sidebar, content, etc.), and themselves contain one or more widgets.

A typical module is organized in the following manner:

* `/templates`
* `main.js`
* `module.js`

The `/templates` directory contains all of the HTML templates needed by the page/widget. In this example, they are underscore.js templates, but could be any other templating solution.

`main.js` works as the module controller, creating the necessary models, collections, and views, and subscribing to app-level events.

`module.js` defines all models, collections, and views for the page/widget, and exports them all as properties of a single object. This is essentially straight Backbone.js.

In this example at most a single model and view are exported per module, but it is possible that multiples of each could be created. It is arguable whether this would be a use case in need of further refinement so that each module only requires a single model, view, and/or controller.

## Behavior
This is a loosely-coupled event-driven architecture. Backbone events are extended onto the app object, creating an application-level event/messaging bus. In the current example, this is only used to alert all page/widgets to a route change. Each page/widget is subscribed to this event in its `main.js` file, but this can be extended so that widgets can publish/subscribe to any number of namespaced events. See the following resources:

* [Backbone.js](http://backbonejs.org/#Events)
* [Rob Dodson](http://robdodson.me/blog/2012/05/25/backbone-events-framework-communication/)

## Outcome
This example architecture has a number of pages each loading a number of widgets:

* Home - This loads the mainnav as well as one each of three sample widgets. Note that widget loading order is NOT guaranteed. If widgets need to appear in a specific order, they should be given specific ID'd locations in which to render. These currently all render to the `section.content` element.
* One, Two, Three - These pages load three copies of each of the three sample widgets. This shows the capability of loading multiple instances of each widget on the same page.

Note that each of the non-mainnav sample widgets is labeled with its cid to show the individual instances. On route changes, these cid numbers continue to increase as each widget is destroyed and recreated on a page change. Investigating the performance impact of this is a TODO below.

## TODOS
* Look into whether page/widget models need to be explicitly destroyed or if they are GC'd when the view they are associated with is removed/destroyed.
* In this pattern, all widgets are destroyed and re-created on each new route. This has proven more reliable than having certain long-running widgets (such as a header or footer) across routes. Need to investigate performance gain/loss and/or whether long-running widgets can be made more reliable.
* Add grunt build
* Add unit testing framework
* Add SCSS/Compass
* Extract subscription to pageChange event to SuperView
* Ensure all sub-widget remove() methods are firing on a pageChange