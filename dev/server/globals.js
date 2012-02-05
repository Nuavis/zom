var b64 = require("./b64.js");
exports.port = process.env.PORT;
exports.gdata_path = "./dev/data.xml";
var lastUID = 0;
exports.getUID = function(){
    return b64.to(lastUID = lastUID + 1);   
}