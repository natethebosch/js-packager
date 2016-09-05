/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 21:13:20
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 21:25:15
*/

var fs = require('fs');

/**
 * Reads a list of files at once.
 *
 * file_list => [file_name, file_name...]
 *
 * callback(results_list, error) .. 
 * 	results_list => [{file_name: "", file_contents: <data> }, ...]
 * 
 * @param  {[type]}   file_list [description]
 * @param  {[type]}   'utf8'    [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
var bulk_reader = function(file_list, callback){

	var todo = file_list.length;
	var results = []; // [{file_name: "", file_contents: <data> }, ...]
	var resErr;

	var read = function(file_name, done){
		fs.readFile(file_name, 'utf8', function(err, data){
			if(err){
				done(null, null, err);
				return;
			}

			done(file_name, data);
		});
	}

	var results_callback = function(fname, data, err){
		if(err){
			resErr = err;
		}else{
			results.push({
				file_name: fname,
				file_contents: data,
			});
		}

		todo--;

		// done!
		if(todo == 0){

			if(resErr)
				callback(null, resErr);
			else
				callback(results, null);
		}
	};

	for(var i = 0; i < file_list.length; i++)
		read(file_list[i], results_callback);
};

module.exports = bulk_reader;