var http = require("http");
var cache = require("./cache.js");
var compile = require("./compile.js");
var globals = require("./globals.js");
var gdata = require("./gdata.js");
require("./gdata.js").loadData();
var getUID = globals.getUID();


var app = http.createServer(function (req,res){
    cache.files["/game.js"] = new cache.File("text/plain","/game.js","",function(fi){
		fi.data = compile.getLib("./src/");
	});
	cache.getFile(req.url,function(file){
		res.writeHead(200, {'Content-Type':  file.type});
		res.end(file.data);
	});
});


var io = require("socket.io").listen(app);
app.listen(globals.port,"0.0.0.0");

var clients = {};

io.sockets.on('connection', function (socket) {
    socket.uid = getUID();
    clients[socket.uid] = socket;
    socket.emit('data', gdata.getData());
    socket.on('my other event', function (data) {
    	console.log(data);
    });
});