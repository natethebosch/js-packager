/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 16:30:02
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-05 11:28:11
*/

var fs = require("fs");
var packager = require("../index.js");

packager({
	"src_dir" : "./sample-data",
	"output_file": "./test-package.js",
	"package_name": "TestPackage",
}, function(){
	var expected = fs.readFileSync("./test/expected.test-package.js").toString();
	var got = fs.readFileSync("./test/test-package.js").toString();

	if(expected != got){
		throw "didn't get expected output. see test/test-package.js compared to test/expected.test-package.js";
	}	
});


