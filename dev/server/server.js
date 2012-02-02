var http = require("http");
var cache = require("./cache.js");
var compile = require("./compile.js");
var globals = require("./globals.js");

http.createServer(function (req,res){
    cache.files["/game.js"] = new cache.File("text/plain","/game.js","",function(fi){
		fi.data = compile.getLib("./src/");
	});
	cache.getFile(req.url,function(file){
		res.writeHead(200, {'Content-Type':  file.type});
		res.end(file.data);
	});
}).listen(globals.port,"0.0.0.0");
