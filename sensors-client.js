/**
 * main server script, register all controllers and connect to the database
 */
var express = require('express');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

var app = express();
app.listen(8081)


process.on('SIGINT', function () {
    process.exit(0);
});
process.on('uncaughtException', function (err) {
    console.error('Caught exception: ', err);
});

app.use(express.static(__dirname));

app.get("/api/*", function (req, res) {
    apiProxy.web(req, res, {target: "http://localhost:8082/"});
});

(function _beforeStart() {
    console.info("performing - after start handler");
})();