Example of using jQuery and require.js with a shim config.
====

This example shows one way to load jQuery and jQuery plugins with require.js.  jQuery itself registers as an AMD module and can easily be loaded. Most plugins, however, do not register as AMD modules, and therefore, require.js doesn't know that the plugins need jQuery to be loaded.

If the plugins you use all call [define()](http://requirejs.org/docs/api.html#define) to declare their dependencies, then you may want to use the [example that uses jQuery from a CDN](https://github.com/requirejs/example-jquery-cdn) instead.

The most important part of this example is the app.js file, which specifies the [shim configuration](http://requirejs.org/docs/api.html#config-shim) for the plugins.

**If you want IE6-8 support**, clone this repo, but replace the jQuery file with the latest jQuery 1.x release. The jQuery 2 file used in this project does not work with those browsers.

###Project structure

tools/

- build.js
- r.js

www/app.html

www/js/

- app.js
- lib/
    - jquery.js
    - jquery.alpha.js
    - jquery.beta.js
    - require.js
- app/
    - main.js

###How it's set up
The main file of this setup is www/js/app.js. It is loaded from app.html by this line:
```html
<script data-main="js/app" src="js/lib/require.js"></script>
```

app.js is mainly about configuration. The shim configuration specifies jQuery as a dependency for jQuery.alpha and jQuery.beta. Finally, our main code is loaded at the bottom of the file:

```javascript
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app"
    },
    "shim": {
        "jquery.alpha": ["jquery"],
        "jquery.beta": ["jquery"]
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
```

App/main.js is where the app logic is:

```javascript
define(["jquery", "jquery.alpha", "jquery.beta"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta();
    });
});
```

###How to see it in action

Just serve up the www/ folder using any web server you'd like. To get you set up quickly, we've included a node.js static file server in tools/. Start the server by typing `node tools/server.js` from the command line, and then go to [localhost:8888/www/app.html](http://localhost:8888/www/app.html) in your browser.

###How to optimize it using r.js
To use the optimizer, you need [node.js](http://nodejs.org) or Java 6 installed. These instructions assume Node is being used. See the [Optimization page](http://requirejs.org/docs/optimization.html) for more information.

r.js and a build configuration is included in the tools/ folder. To build, navigate to tools/ and type `node r.js -o build.js`. You will find the built product in the www-build folder. If you serve that directory instead, you can see in the network panel of the web developer tools that the files aren't loaded separately any more.

