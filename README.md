Example of using jQuery and require.js with a shim config.
====

This example shows one way to load jQuery and jQuery plugins with require.js.  jQuery itself registers as an AMD module and can easily be loaded. Most plugins, however, does not register as AMD modules, and therefore, require.js doesn't know that the plugins need jQuery to be loaded. 

The most important part is the app.js file, which specifies the [shim configuration](http://requirejs.org/docs/api.html#config-shim) for the plugins. 

###File structure 

- tools/
    build.js
    r.js

- www/
    app.html
    js/
      app.js
      lib/
        jquery.js
        jquery.alpha.js
        jquery.beta.js
        require.js
      app/
        main.js

###How to see it in action

Just serve up the www/ folder using any web server you'd like. If you have python installed, an easy way is to navigate into the www/ directory and type `python -m SimpleHttpServer`

###How to optimize ut using r.js
To use the optimizer, you need [node.js](http://nodejs.org) or Java 6 installed. These instructions assume Node is being used. See the [Optimization page](http://requirejs.org/docs/optimization.html]for more information.
 
r.js and a build configuration is included in the tools/ folder. To build, navigate to tools/ and type `node r.js -o build.js`. You will find the built product in the www-build folder. If you serve that directory instead, you can see in the network panel of the web developer tools that the files aren't loaded separately any more.

