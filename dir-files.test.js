/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 20:53:01
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 20:59:52
*/

var walk = require("./dir-files");

var resolveDir = function(dir){ // wrap because it's a mock for being called from index.js
	return require("./resolve-dir")(dir);
};

describe("Testing list dir files recursively", function(){


	it("should have a list of more than 3 files", function(done){
		var dir = resolveDir("./test/sample-data");

		walk(dir, function(err, res){
			expect(res.length >= 3).toBe(true);
			done();
		});

	});
});
