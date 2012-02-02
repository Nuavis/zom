var fs = require("fs");
var File = exports.File = function(type,path,data,func){
    this.type = type;
	this.data = data;
	this.path = path
	this.func = func || reloadSelf;
};
function reloadSelf(self){
	 loadFile(self.path,function(file){
	 	files[self.path] = file;
	 });
};
var files = exports.files = {'404':new File("text/plain","/404.txt","Not found")};
exports.getFile = function(path,callback){
	if (files[path]){
		files[path].func(files[path]);
		callback(files[path]);
	}else{
		loadFile(path,function(file){
			files[path] = file;
			callback(file);
		});
	}
};
var typeMap = {
	"png":"image/png",
	"jpg":"image/jpg",
	"jpeg":"image/jpeg",
	"txt":"text/plain",
	"js":"text/plain",
	"html":"text/html"
};
var loadFile = exports.loadFile = function(path,callback){
	fs.readFile("."+path,function(err,data){
		if (!err){
			callback(new File(typeMap[path.split(".")[1]] || "text/plain",path,data));
		}else{
			callback(files['404']);
		}
	});
};
