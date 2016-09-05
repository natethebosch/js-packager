/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 17:46:48
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 20:49:28
*/


var r = require("./resolve-dir");

describe("Testing resolving directories", function(){

	var expected = __dirname + "/my-dir"

	it("Should resolve to " + expected, function(){


		var index_js_mock = function(){
			return r("./my-dir");
		}
		var res = index_js_mock();

		expect(res).toBe(expected);
	});

	it("Should resolve to /my-dir", function(){
		var expected = "/my-dir";

		var index_js_mock = function(){
			return r("/my-dir");
		}
		var res = index_js_mock();

		expect(res).toBe(expected);
	});
});