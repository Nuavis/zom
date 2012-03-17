var GameData = {
	types:(function(){
		var t = function(name,len){
			var a = function(a,b){
				this.name = a;
				this.len = b;
			};
			return new a(name,len);
		};
		return [t("int",2),//0
				t("color",4)]
	})(),
	property:function(no){
		return this.types[no];
	}
};