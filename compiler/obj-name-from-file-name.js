/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 21:35:55
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 21:49:14
*/

// 
// converts /asdf/my-dir/my-js-file.js => asdf.myDir.MyJsFile
// directories have lowercase first char
// hyphens are camel cased.
// 
var transform = function(fname){

	fname = fname.replace(/(^\/|\.js$)/g, "");

	if(fname.indexOf(".") != -1)
		throw "can't have a dot in the middle of compiled js file name";

	fname = fname.replace(/\//g, ".");

	var path = fname.split(".");
	for(var i = 0; i < path.length; i++){
		if(i != path.length - 1){ // format packageName
			path[i] = camelcase(path[i]);
			path[i] = path[i].substring(0,1).toLowerCase() + path[i].substring(1);
		}else{ // format PackageName
			path[i] = camelcase(path[i]);
		}
	}

	return path.join(".");
}

var camelcase = function(value){
	var l = value.split("-");

	for(var i = 0; i < l.length; i++)
		l[i] = l[i].substring(0,1).toUpperCase() + l[i].substring(1);

	return l.join("");
}

module.exports = transform;