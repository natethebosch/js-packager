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
    if(objs[name] == undefined){
        var out = {};
        for(var i in objs){
            if(i.match(new RegExp(name + "\.[^\.]+$"))){
                out[i.substring(i.lastIndexOf(".")+1)] = objs[i];
            }
        }

        return out;
    }

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