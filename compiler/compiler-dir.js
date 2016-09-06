/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-05 08:47:11
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-05 10:21:40
*/

var arrayContainsUniqueValues = require("./array-unique");

/**
 * 
 * compile_dir_spec => { dir => obj.name}
 * 
 */
var CompilerDir = function(compile_dir_spec){

	this.children = [];
	this.dir = compile_dir_spec.dir;
	this.obj_map = null;
	this.obj_name = this.dir;

	this.setObjMap = function(obj){
		this.obj_map = obj;
		this.children = this.obj_map.getDirectChildrenOf(this.dir);
	};

	/**
	 * circular_spec => { max_depth: int, path: [obj.name], map: ObjMapManager }
	 *
	 * basically the same as compiler-file except uses children as dependancies
	 * 
	 * @param  {[type]} circular_spec [description]
	 * @return {[type]}               [description]
	 */
	this.checkForCircularRefs = function(circular_spec){
		if(circular_spec.max_depth == 0)
			throw "Circular reference check failed to resolve (max-depth reached) for path " + circular_spec.path.join("\n\t-> ");

		for(var i = 0; i < this.children.length; i++){

			var fileOrDir = circular_spec.map.lookup(this.children[i]);
			if(fileOrDir.constructor == CompilerDir){
			    // skip b/c require directory will only give access
			    // to files in that directory, not sub-dirs
			}else{
			    circular_spec.path.push(this.children[i]);

                if(!arrayContainsUniqueValues(circular_spec.path)){
                    throw "Circular reference for path \n\t-> " + circular_spec.path.join("\n\t-> ");
                }

                fileOrDir.checkForCircularRefs({
                    max_depth: circular_spec.max_depth -1,
                    path: circular_spec.path,
                    map: circular_spec.map
                });

                circular_spec.path.pop(); // remove sub-item from path
			}
		}
	};

	// obj => CompilerDir | CompilerFile
	// same as compiler-file except uses children as dependancies
	this.dependsOn = function(obj){

		for(var i = 0; i < this.children.length; i++){
		    var fileOrDir = this.obj_map.lookup(this.children[i]);
            if(fileOrDir.constructor == CompilerDir){
                // skip b/c require directory will only give access
                // to files in that directory, not sub-dirs
            }else{
                if(fileOrDir.obj_name == obj.obj_name || fileOrDir.dependsOn(obj)){
                    return true;
                }
			}
		}

		return false;
	};
};

module.exports = CompilerDir;