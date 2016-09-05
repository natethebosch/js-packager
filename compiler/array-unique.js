/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-05 09:11:08
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-05 09:53:03
*/

var checker = function(array){

	for(var i = 0; i < array.length; i++){
		for(var j = i + 1; j < array.length; j++){
			if(array[i] == array[j])
				return false;
		}
	}

	return true;
};

module.exports = checker;