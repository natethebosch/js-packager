/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 16:44:43
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 20:46:57
*/

var path = require("path");

var getStack = function(){
	var orig = Error.prepareStackTrace
	var err = new Error();

	// Override with function that just returns `stack`
	Error.prepareStackTrace = function (_, stack) {
		return stack;
	}

	var stk = err.stack;

	Error.prepareStackTrace = orig;

	return stk;
};

var getLibraryCallerFname = function(){
	var stk = getStack();

	// remove internal call items
	stk.shift(); // get_stack
	stk.shift(); // getCallerFname
	stk.shift(); // resolveDir
	stk.shift(); // index.js

	return stk.shift().getFileName();
}

// takes a directory and resolves it based
// on the file that called this library
var resolveDir = function(dir){

	// if it starts with a dot its a relative path
	if(dir[0] != ".") {
		return dir;
	}

	var caller_fname = getLibraryCallerFname();
	caller_dir = path.dirname(caller_fname);

	return path.resolve(caller_dir, dir);
};


module.exports = resolveDir;
