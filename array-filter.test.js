/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 21:07:36
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 21:12:29
*/

var filter = require("./array-filter");

describe("Test filtering arrays", function(){

	it("Should only return words containing an A", function(){
		var list = ["alpha", "beta", "not", "this", "one"];

		var res = filter(list, function(el){
			return el.indexOf("a") == -1;
		});

		expect(res).toEqual(["not", "this", "one"]);
	});

	it("Should only return ever other one", function(){
		var list = ["alpha", "beta", "gamma", "delta", "epsom"];

		var res = filter(list, function(el, i){
			return i % 2 == 1
		});

		expect(res).toEqual(["beta", "delta"]);
	});
})