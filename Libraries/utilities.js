var appendjson = require('appendjson');

var utilities = function() {	
	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};   

	this.addDataToJSON = function (obj){
		var file = './target/data.json';		 
		appendjson(obj, file, function(){		
		});
	};
};
module.exports = new utilities();