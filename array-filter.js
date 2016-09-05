/*
* @Author: Nate Bosscher (c) 2015
* @Date:   2016-09-03 21:04:00
* @Last Modified by:   Nate Bosscher
* @Last Modified time: 2016-09-03 21:07:14
*/

/**
 * takes an array and filters it by calling filter_fx 
 * and only keeping items that return a true.
 *
 * filter_fx(array_element, index);
 *
 * returns array of filtered items
 */
var filter = function(array, filter_fx){
	var filtered = [];

	for(var i = 0; i < array.length; i++)
		if(filter_fx(array[i], i)){
			filtered.push(array[i])
		}

	return filtered;
};

module.exports = filter;
