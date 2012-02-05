var to = exports.to = function(x,len){
    var str = x.toString(16);
    if (len){
        while(str.length < len){
            str = "0" + str;
        }
    }
    return str;
};
var fr = exports.fr = function(x,len){
    return parseInt(x,16);
};