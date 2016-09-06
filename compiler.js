/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 21:27:41
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-05 11:31:11
*/
var fs = require('fs');
var path = require("path");

var objNameFromFileName = require("./compiler/obj-name-from-file-name");
var ObjMapManager = require("./compiler/obj-map");

var CompilerFile = require("./compiler/compiler-file");
var CompilerDir = require("./compiler/compiler-dir");

var indent = function(str){
	return "\t" + str.replace(/\n/g, "\n\t");
}

/**
 *
 * compiler_spec = {
 * 		file_data_list: [{file_name: "", file_contents: "<data>"}],
 * 		base_dir: "base_name",
 * 		output_file: "file.js"
 * 		package_name: "string" output package name
 * }
 * 
 */
var compiler = function(compiler_spec){

	var files = compiler_spec.file_data_list;
	for(var i = 0; i < files.length; i++){
		files[i] = new CompilerFile(files[i], compiler_spec.base_dir);
	}

	var objMap = new ObjMapManager(files);
	for(var i = 0; i < files.length; i++){
		files[i].setObjMap(objMap);
	}

	for(var i = 0; i < files.length; i++){
		files[i].checkForCircularRefs({ map: objMap, max_depth: objMap.length, path: [] }); // will throw if exists
	}

	// sort by requires (less at beginning)
	// pre-sort to actual dependancy sort to reduce
	// computation time
//	files.sort(function(a, b){
//		if(a.requires.length != b.requires.length)
//			return a.requires.length - b.requires.length;
//
//		// use alpha sort to ensure same result every time (async file loading introduces some randomness)
//		if(a.obj_name > b.obj_name)
//			return 1;
//		else if(b.obj_name > a.obj_name)
//			return -1;
//	});


	// sort so that dependancies are at nearer to the front
	files = (function(file_list){

        var lst = [];
        for(var i = 0; i < file_list.length; i++){
            var add = file_list[i];
            var j = 0;

            while(j < lst.length && !lst[j].dependsOn(add)){
                j++;
            }

            lst.splice(j, 0, add);
        }

        return lst;
    })(files);


	var build = [];
	/* build => array of =>
		register('obj.name', (function(obj_234193, obj2_232342){
			var module = {};

			return module.exports;
		})( getDependancy('require.obj'), getDependancy('require.obj2') )));;
	*/

	for(var i = 0; i < files.length; i++){

		var fx_param_names = files[i].getUniqueDependacyNameMap() // obj_name_unique-id => obj_name
		var fx_param_values = (function(fx_param_names){
			var l = [];
			for(var i in fx_param_names)
				l.push("getDependancy('" + fx_param_names[i] + "')");

			return l;
		})(fx_param_names);

		build.push("register('" + files[i].obj_name + "', (function(" + Object.keys(fx_param_names).join(", ") + "){" + "\n"
			+ "\tvar module = {};" + "\n"
			+ indent(files[i].getContentsWithRequiresReplaced(fx_param_names)) + "\n"
			+ "\treturn module.exports;" + "\n"
			+ "})(" + fx_param_values.join(", ") + ") )");
	}

    var file = __dirname + "/compiler/framework-methods.js";
	var frameworkMethods = fs.readFileSync(file).toString();

	var out = "var " + compiler_spec.package_name + " = (function(){" + "\n"
		+ indent(frameworkMethods) + "\n\n"
		+ indent(build.join("\n\n")) + "\n\n"
		+ indent("return getObject()") + "\n"
	+ "})()";

	fs.writeFileSync(compiler_spec.output_file, out);
};

module.exports = compiler;