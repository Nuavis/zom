var fs = require("fs");
var xml = require("./xml.js");
var b64 = require("./b64.js");
var b16 = require("./b16.js");

var data = exports.data = {};
var rdata = exports.rdata = "";
var classes = exports.classes = {};
exports.loadData = function loadData(world){//return gdata
      var rg = xml.loadXML("./dev/data.xml");
      
      data = rg.data;
      
      var gobs = rg.data.gobs;
      
      for (var i in gobs){
          var cls = classes[i] = {};
          for (var u in gobs[i]){
          	if (u!="children"){
          		cls[u] = {};
          		for (var k in gobs[i][u]){
          			cls[u][k] = gobs[i][u][k];
          		}
          	}
          }
          var obs = gobs[i].children;
          for (var q in obs){
              var ob = obs[q];
              for (var u in cls){
                  var prop = cls[u];//node or info
                  var oprop = ob[u];
                  //reformat oprop to prop format
                  for (var k in prop){
                      oprop[k] = parse[prop[k]](oprop[k]);
                  }
              }
          }
      }
      
      makeRData();
};
var types = {
	"int":0,
	"color":1
};
var makeRData = exports.makeRData = function(){
	var class_length = count(data.gobs);
	rdata = b64.to(class_length,4);//CLASS LENGTH
	
	for (var i in data.gobs){
		var cls = data.gobs[i];
		rdata += i; // CLASS UID
		var no_props = count(cls.fields);
		var ar = [];
		for (var i = 0;i<no_props&&i<6;i++){
			ar.push(1);
		}
		rdata += b64.tobin(ar);//CLASS BINARY BOOLEANS
		
		for (var p in cls.fields){
			var props_length = count(cls[p]);
			rdata += b64.to(props_length);//PROPERTY LENGTH
			for (var t in cls[p]){
				rdata += b64.to(types[cls[p][t]]); //PROPERTY TYPE
			}
		}
		
		var children = cls[p];
		rdata += b64.to(count(children),4);//CHILDREN LENGTH
		
		for (var uid in children){
			var child = children[uid];
			var clength = count(child);
			ar = [];
			while(ar.length<clength){
				ar.push()
			}
			rdata += uid + b64.tobin(ar);
		}
	}
};
function rAddData(type,data){
	
}
function count(ob){
	var i = 0;
	for (var u in ob){
		i++;
	}
	return i;
}
exports.getData = function(){
	return rdata;
};
var parse = exports.parse = {
    int:function(num){
        return b64.fr(num);
    },
    color:function(col){
        return b16.to(b64.fr(col),6);
    }
}