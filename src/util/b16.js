var b16 = {};
b16.to = function(x,len){
    var str = x.toString(16);
    if (len){
        while(str.length < len){
            str = "0" + str;
        }
    }
    return str;
};
b16.fr = function(x,len){
    return parseInt(x,16);
};