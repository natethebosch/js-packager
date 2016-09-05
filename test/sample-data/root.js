/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 16:22:35
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 16:24:16
*/

var v = require("./util/validation");
var u = require("./util");

var Root = function(){
	v.IsValidNumber(1234);

	u.Convert.Time2UTC();
};

module.exports = Root;