var TestPackage (function(){
	/*
	* @Author: Nate Bosscher (c) 2015
	* @Date:   2016-09-05 11:09:53
	* @Last Modified by:   Nate Bosscher
	* @Last Modified time: 2016-09-05 11:21:01
	*/
	
	var objs = {}; // obj.name => object
	
	var register = function(name, object){
		objs[name] = object;
	};
	
	var getDependancy = function(name){
		return objs[name];
	};
	
	var getObject = function(){
		var out = {};
	
		for(var i in objs){
	
			var path = i.split(".");
			var pos = out;
			for(var j = 0; j < path.length; j++){
				if(j == path.length - 1){
					pos[path[j]] = objs[i];
				}else{
					if(!pos[path[j]])
						pos[path[j]] = {};
	
					pos = pos[path[j]];
				}
			}		
		}
	
		return out;
	};

	register('util.Convert', (function(){
		var module = {};
		/*
		* @Author: Nate Bosscher (c) 2015
		* @Date:   2016-09-03 16:26:01
		* @Last Modified by:   Nate Bosscher
		* @Last Modified time: 2016-09-03 16:26:32
		*/
		
		'use strict';
		
		module.exports = {
			Time2UTC : function(){
				
			}
		};
		return module.exports;
	})() )
	
	register('util.validation.IsValid', (function(){
		var module = {};
		/*
		* @Author: Nate Bosscher (c) 2015
		* @Date:   2016-09-03 16:24:49
		* @Last Modified by:   Nate Bosscher
		* @Last Modified time: 2016-09-05 11:19:47
		*/
		
		
		var IsValid = function(){
			console.log("HI");
		};
		
		module.exports = IsValid;
		return module.exports;
	})() )
	
	register('Root', (function(util_validation_uid_0, util_uid_0){
		var module = {};
		/*
		* @Author: Nate Bosscher (c) 2015
		* @Date:   2016-09-03 16:22:35
		* @Last Modified by:   Nate Bosscher
		* @Last Modified time: 2016-09-03 16:24:16
		*/
		
		var v = util_validation_uid_0;
		var u = util_uid_0;
		
		var Root = function(){
			v.IsValidNumber(1234);
		
			u.Convert.Time2UTC();
		};
		
		module.exports = Root;
		return module.exports;
	})(getDependancy('util.validation'), getDependancy('util')) )

	return getObject()
})()