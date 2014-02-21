/*
 * node static file server:
 * modified from https://gist.github.com/rpflorence/701407
 */
/*jslint evil: true, nomen: true, sloppy: true */

var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    port = process.argv[2] || 8888,
    types = {
        'html': 'text/html',
        'js': 'application/javascript'
    };

http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname,
        filename = path.join(__dirname, '..', uri);

    if(!fs.lstatSync(filename).isDirectory()) {
        fs.exists(filename, function (exists) {
            if (!exists) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write('404 Not Found\n');
                response.end();
                return;
            }

            var type = filename.split('.');
            type = type[type.length - 1];

            response.writeHead(200, { 'Content-Type': types[type] + '; charset=utf-8' });
            fs.createReadStream(filename).pipe(response);
        });
    } else {
        /**
         * if users visit the site such as http://localhost:8888
         * then lead them to http://localhost:8888/www/app.html
         *
         */
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Please visit <a href="www/app.html">here</a>\n');
        response.end();
    }
}).listen(parseInt(port, 10));

console.log('Static file server running at\n  => http://localhost:' + port + '/\nCTRL + C to shutdown');
