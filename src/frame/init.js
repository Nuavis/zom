var can,con,frames;
function initFrame(){
    lg("Initializing Canvas");
	document.body.innerHTML = "";
	document.body.style.borderSpacing = "0px";
	document.body.style.margin = "0px";
	document.body.style.padding = "0px";
	document.body.style.overflow = "hidden";
	
    frames = {};
    
	can = document.createElement("canvas");
	can.width = window.innerWidth;
	can.height = window.innerHeight;
	document.body.appendChild(can);
	
	con = can.getContext('2d');
	lg("Finished Initializing Canvas");
}
