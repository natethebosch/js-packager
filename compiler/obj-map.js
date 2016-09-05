/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-05 08:49:04
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-05 10:21:13
*/

var CompilerDir = require("./compiler-dir");

/**
 * takes array of files and builds
 * an object of { package.packageName => CompilerFile or CompilerDir }
 * 
 * files => [CompilerFile]
 */
var ObjMapManager = function(files){

	var self = this;
	var objMap = {}; // "a.b" => CompilerFile or CompilerDir
	this.length = 0;

	this.getChildrenOf = function(dir){
		var lst = [];

		var regexp = new RegExp("^" + dir + "\.[^\.]+");
		for(var i in objMap){
			if(regexp.test(i)){
				lst.push(i);
			}
		}

		return lst;
	};

	this.lookup = function(el){
		return objMap[el];
	};


	
	(function(){
		var dirLst = [];

		for(var i = 0; i < files.length; i++){
			objMap[files[i].obj_name] = files[i];

			var dirs = files[i].parentDirectories();
			for(var j = 0; j < dirs.length; j++){
				objMap[dirs[j]] = new CompilerDir({ 
					dir : dirs[j]
				});

				dirLst.push(objMap[dirs[j]]);
			}
		}

		// wait till all dirs are registered
		// to call setObjMap since
		// setObjMap may call this.lookup
		for(var i = 0; i < dirLst.length; i++)
			dirLst[i].setObjMap(self);

	})();

	this.length = Object.keys(objMap).length
};

module.exports = ObjMapManager;