var b64 = {};
var list64 = b64.list = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "/", "+"];
var map64 = b64.map =  {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"a":10,"b":11,"c":12,"d":13,"e":14,"f":15,"g":16,"h":17,"i":18,"j":19,"k":20,"l":21,"m":22,"n":23,"o":24,"p":25,"q":26,"r":27, "s":28,"t":29,"u":30,"v":31,"w":32,"x":33,"y":34,"z":35,"A":36,"B":37,"C":38,"D":39,"E":40,"F":41,"G":42,"H":43,"I":44,"J":45,"K":46,"L":47,"M":48,"N":49,"O":50,"P":51,"Q":52, "R":53,"S":54,"T":55,"U":56,"V":57,"W":58,"X":59,"Y":60,"Z":61,"/":62,"+":63};
b64.to=function(x,len){
    var str = "";
    if (x==0){
    	str = "0";
    }
	while (x != 0){
		str = list64[x%64] + str;
		x = x >> 6;
	}
    while (str.length<len || 0){
    	str = "0" + str;
	}
	return str;
};
b64.mto = function(ar,len){
    var str = "";
    for (var i in ar){
        str += to(ar[i],len);
    }
    return str;
};
b64.tobin = function(ar){
    var x = 0;
    var n = 1;
    for (var i in ar){
        x += ar[i]?n:0;
        n*=2;
    }
    return b64.to(63-x);
};
b64.frbin = function(str){
    var x = fr(str);
    var n = 32;
    var ar = [];
    while(x>0){
        if (x>=n){
            x -= n;
            ar.unshift(0);
        }else{
            ar.unshift(1);   
        }
        n/=2;
    }
    while(ar.length<6){
    	ar.unshift(1);
    }
    return ar;
};
var fr = b64.fr=function(str){
	var x=0,cb = 6 * str.length - 6;
	for (var i = 0,len = str.length;i<len;i++){
		x += map64[str[i]] << cb;
		cb -= 6;
	}
	return x;
};
b64.d18=function(x,y){
	return to(x + y*512);
};
b64.f18=function(str){
	var v = fr(str);
	return [v%512,v>>9];
};