/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 16:16:08
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-05 11:28:23
*/

var resolve_dir = require("./resolve-dir");
var walk = require("./dir-files");
var filter = require("./array-filter");
var reader = require("./bulk-read-files");
var compile = require("./compiler");

/**
 * run_options_spec = {
 * 		src_dir: "relative or abs path"
 * }
 * @return none
 */
var runner = function(run_options_spec, callback){

	if(!run_options_spec.src_dir || run_options_spec.src_dir.constructor != String){
		throw "invalid option for src_dir. should be string";
	}

	if(!run_options_spec.output_file){
		throw "Missing output_file"
	}

	if(!run_options_spec.package_name){
		throw "Missing package_name"
	}

	run_options_spec.output_file = resolve_dir(run_options_spec.output_file);

	var base_dir = resolve_dir(run_options_spec.src_dir);
	walk(base_dir, function(err, files){
		if(err){
			throw err;
		}

		files = filter(files, function(el){
			return el.match(/\.js$/);
		});

		reader(files, function(file_data_list, err){
			if(err){
				throw err;
			}

			compile({
				base_dir: base_dir,
				file_data_list: file_data_list,
				output_file: run_options_spec.output_file,
				package_name: run_options_spec.package_name
			});

			callback();
		});
	});
};

module.exports = runner;