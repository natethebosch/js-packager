/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 16:16:08
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-06 08:25:51
*/

var resolve_dir = require("./resolve-dir");
var walk = require("./dir-files");
var filter = require("./array-filter");
var reader = require("./bulk-read-files");
var compile = require("./compiler");

/**
 * run_options_spec = {
 * 		src_dir: "relative or abs path",
 * 		output_file: "relative or abs file path",
 * 		package_name: "string",
 * 		skip_files_matching: "RegExp (optional)"
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

	if(run_options_spec.skip_files_matching && !(run_options_spec.skip_files_matching instanceof RegExp)){
		throw "skip_files_matching property should be an instance of RegExp";
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

		if(run_options_spec.skip_files_matching){
			files = filter(files, function(el){
				return !el.match(run_options_spec.skip_files_matching);
			});
		}

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