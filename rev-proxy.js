var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ target: 'http://localhost:3000', ws: true });


let paths = [
    {path: 'path1', backend: 'http://localhost:3000'},
    {path: 'path2', backend: 'http://localhost:3000/path2'}
]

let proxies = [];
for (let path of conf) {
    path.proxy = httpProxy.createProxyServer({ target: path.backend, ws: true });
    proxies.push(path);
}

function breakUrl(req) {
    let parts = ewq.path.split('/');
    return { path1:parts[0], path2:parts[1]}
}


function findProxy(req) {
    let urlParts = breakUrl(req.url)
    if (urlParts.path1 && urlParts.path1.length > 0) {
        return proxies.filter(p => p.path == urlParts.path1);
    }
    return undefined;

}

function proxy(req, res, socket, head) {
    let p = findProxy(req);
    if (p == undefined) {
        console.log("No path match: " , req.url);
        //return 401
        return;
    }
    let reqNew = req;
    
    reqNew.path =  p.path2;
    if (socket) {
        p.proxy.web(req, res, {});
    }
    p.proxy.web(req, res, {});
}
var server = require('http').createServer(app);

// proxy HTTP GET / POST
app.get('/*', function(req, res) {
  console.log("proxying GET request", req.url);
  proxy(req, res, {});
});
app.post('/*/*', function(req, res) {
  console.log("proxying POST request", req.url);
  proxy(req, res)

});

// Proxy websockets
server.on('upgrade', function (req, socket, head) {
  console.log("proxying upgrade request", req.url);
  proxy(req, socket, head);
});

server.listen(3001);