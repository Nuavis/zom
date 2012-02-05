var fs = require("fs");
var loadFile = exports.loadFile = function(name){
       return fs.readFileSync(name,"utf8");
}
var loadXML = exports.loadXML = function(name){
    var str = loadFile(name).replace(/\t/g,"");
    return loadXMLObject({},str);
}
var loadXMLObject = exports.loadXMLObject = function(ob,str){
    var i = str.search("<[^>/]*>");
    if (i!=-1) {
        loadXMLProps(ob,str.slice(0,i));
        var e = i;
        while(str.charAt(e) != ">"){
            e++;   
        }
        var name = str.slice(i+1,e);
        var ei = str.search("</" + name + ">");
        var ee = ei;
        while(str.charAt(ee) != ">"){
            ee++;   
        }
        ob[name] = loadXMLObject({},str.slice(e+1,ei));
        loadXMLObject(ob,str.slice(ee+1));
    }else{
        loadXMLProps(ob,str);
    }
    return ob;
}
var loadXMLProps = exports.loadXMLProps = function(ob,str){
    var i = str.search("[^<>=:\n]*[=:][^<>=:\n]*\n");
    var e = str.slice(i).search("\n");
    if (i!=-1){
        var exp = str.slice(i,e+1).replace("\n","");
        var sep = exp.search("[=:]");
        ob[exp.slice(0,sep).replace(" ","")] = exp.slice(sep+1);
        loadXMLProps(ob,str.slice(e+1));
    }
}