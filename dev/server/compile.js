var fs = require("fs");
var globals = require("./globals.js");
exports.getLib = function(root){
    return importAll(root,"import.txt");
};
function importAll(path,file){
	var all = "";
	var data = fs.readFileSync(path + file,"utf8");
	if (data!=null){
		var ar = data.split("\n");
		for (var u in ar){
			var i = ar[u];
			if (i.length>1){
				var ext = i.split(".");
				if (ext.length==1){
					all += importAll(path+ext[0] + "/","import.txt");
				}else{
					var js = fs.readFileSync(path + i,"utf8");
					all += jsdebugparse(jsparse(js),path+i);
				}
			}
		}
	}
	return all;
}
function jsparse(data){
	var ar = data.split("<js>");
	for (var i = 1;i<ar.length;i+=2){
		var ret = "";
		eval(ar[i]);
		ar[i] = ret;
	}
	return ar.join("");
}
function jsdebugparse(data,path){
	var ar = data.split("\n");
	var par = path.split("/");
	par.shift();par.shift();
	var small_path = par.join("/"); 
	for (var i = 0;i<ar.length;i++){
		if (ar[i].indexOf("lg(")!=-1){
			ar[i] = ar[i].replace("lg(","console.log( {file:\""+ small_path +"\",line:"+(i+1)+"},",ar[i].split("lg(")[1].split(")")[0]);
		}
	}
	return ar.join("\n");
}