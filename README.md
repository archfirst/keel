[![Build Status](https://travis-ci.org/bobholt/trombone.png)](https://travis-ci.org/bobholt/trombone)

# Trombone.js: Music for your Backbone

Trombone.js adds warm notes to your Backbone.js application through the use of specific, reproducible conventions.

Trombone.js provides a light framework around Backbone.js, allowing the developer to craft a stable domain-driven web application.

## Philosophy

* Domain-Driven Design
* Single Responsibility Principle

## Requirements

* Node
* Grunt
* Ruby (if using SCSS/Compass)

## Installation

Installation should be pretty straightforward:

1. Clone this project into the directory of your choosing.
2. On the command line, `cd` into this directory.
3. Run `npm install`. This will install all node dependencies.
4. Run `grunt`. This will run a build and create a `/dist` directory.

Development should be done within the `/src` directory. `/dist` is your production directory and can be deployed in whatever way you choose.

The term 'root' when used below will refer to either `/src` or `/dist`

## Organization
The application is built in a single `index.html` located in the root directory. The application is further organized into a sub-directories:

* `/app` - Our user-written application code.
* `/framework` - The base application framework, including a Router, Message Bus, and a BaseView all of our Backbone views will inherit.
* `/vendor` - Third-party libraries
* `main.js` - Require.js configuration and initialization
* `app.js` - The application initialization code. Starts the router and attaches a useful event handler
* `text.js` - Require.js plugin allowing import of files as text. Used for templating.

### /app
`/app` is further broken down into the following directories:

* `/css`
* `/domain`
* `/img`
* `/pages`
* `/sass`
* `/widgets`

`/css`, `sass`, and `/img` contain what you would expect: stylesheets and images used within the application. This example application shows how to use and build Compass with the rest of the application.

`/domain` contains our DDD-conformant Domain Models. These models can be manipulated or massaged as needed and the output assigned to widgets as ViewModels. This keeps a single canonical location for our data in the Domain models. Changes are propagated to the ViewModels.

The contents of `/pages` and `/widgets` are, for all intents and purposes, constructed identically. Each subdirectory represents a complete 'module' to be built with r.js and dynamically loaded by Require. The distinction is one of DOM hierarchy: `/pages` are the top-most level views, spawning child widgets from the `/widgets` directory. Widgets can themselves spawn other child widgets.

In the current example, there is no need for an intermediate level of hierarchy, but one could extend this to include a `/regions` directory that represent sub-sections of a page (e.g. sidebar, content, etc.). These would be modules that are children of pages, but parents of yet more widgets.

A typical module is organized in the following manner:

* `ModulenameTemplate.html`
* `ModulenamePage.js` / `ModulenameWidget.js` (required)
* `ModulenameViewModel.js`

In this example, the template is an underscore.js template, but could be any other templating solution. In theory, there could be multiple templates per view, but it should at least cause you to consider splitting out yet another child widget.

The Page/Widget is the entry point for the module. The only way to include this page/widget would be to require the Widget. This, in practice, is the Backbone View.

The ViewModel is a Backbone Model. In many cases, the Domain model is not organized in a way that makes sense on the presentation layer, and needs to be manipulated. The ViewModel is this manipulation of our canonical Domain model that is better suited for displaying the widget in question.

In this example, a single template, view, and view model exist in each page/widget, but it is possible that multiples of each could be created. It is arguable whether this would be a signal for further refinement so that each module only requires a single view, view model, and/or template.

### /framework

`/framework` currently includes the following files:

* `BaseView.js`
* `MessageBus.js`
* `Repository.js`
* `Router.js`

BaseView.js is an extension of the Backbone.View object, and is itself extended by our application views. This allows our application's views to inherit what we consider to be useful functionality.

MessageBus.js extends Backbone.Events. It currently serves as a very thin facade, but could be enhanced to add additional functionality to the Backbone events.

Repository.js serves as a data controller of sorts, controlling the fetching and caching of our model data from the server. All requests for data go through here.

Router.js is our application router. It controls the the Page views invoked based on the URL.

## Behavior
This is a loosely-coupled event-driven architecture. Backbone events are extended onto the MessageBus object, creating an application-level event/messaging bus.

In the current example, this is only used to alert all pages to a route change. The page is responsible for keeping track and removing each of its children on this event.

This can be extended so that pages and widgets can publish/subscribe to any number of namespaced events. See the following resources:

* [Backbone.js](http://backbonejs.org/#Events)
* [Rob Dodson](http://robdodson.me/blog/2012/05/25/backbone-events-framework-communication/)

## Outcome
This example architecture has a number of pages each loading a number of widgets:

* Home - This loads the mainnav as well as one each of three sample widgets. Note that widget loading order is NOT guaranteed. If widgets need to appear in a specific order, they should be given specific ID'd locations in which to render. These currently all render to the `section.content` element.
* One, Two, Three - These pages load three copies of each of the three sample widgets. This shows the capability of loading multiple instances of each widget on the same page.

Note that each of the non-mainnav sample widgets is labeled with its cid to show the individual instances. On route changes, these cid numbers continue to increase as each widget is destroyed and recreated on a page change.