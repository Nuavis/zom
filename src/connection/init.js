var socket,serverCache = [];
function getConnection(){
	var serverSocketConnection = {}
	socket = io.connect();
	serverSocketConnection.addListener = function(event,func){
		socket.on(event,function(data){
			serverCache.push([func,data]);
		});
	};
	serverSocketConnection.getMessages = function(){
		for (var i = 0,len = serverCache.length;i<len;i++){
			serverCache[i][0](serverCache[i][1]);
		}
		serverCache = [];
	};
	return serverSocketConnection;
}