var colors = require('colors/safe');
var whoisAvailable = require('whois-available');
var Q = require('q');
var fs = require('fs');
var sleep = require('sleep');

function delay(ms) {
    var deferred = Q.defer();
    setTimeout(deferred.resolve, ms);
    return deferred.promise;
}

function searchDomain(lists,index,callback) {


	whoisAvailable(lists[index], function (err, whoisResponse, isAvailable) {
		if (err) {
			console.log(colors.red(err.toString()));
		}
		else
			if (isAvailable) {
				console.log(colors.green(lists[index] + " is available."));
			}
			else {
				// console.log(colors.gray(lists[index] + " is unavailable"));
			}

		if(index<lists.length-1)	
		{
			searchDomain(lists,++index,callback);
		}
		else
		{
			callback(null,"success");
		}
	});
	

};

// function searchDomain(domain,callback) {
// 	var deferred = Q.defer();
// 	whoisAvailable(domain, function (err, whoisResponse, isAvailable) {
// 		if (err) {
// 			console.log(colors.red(err.toString()));
// 		}
// 		else
// 			if (isAvailable) {
// 				console.log(colors.green(domain + " is available"));
// 			}
// 			else {
// 				console.log(colors.gray(domain + " is unavailable"));
// 			}
// 		deferred.resolve(domain);

// 	});
	
// 	return deferred.promise;

// };

function readWords(filename,callback) {
	fs.readFile(filename, "utf-8", function (error, result) {
		if (error) {

		callback(error,null);
		} else {
			var array = result.split("\n");
			var lists = [];
			for (var i = 0; i < array.length; i++) {
				var domain = array[i];

				if (domain.length>0) {
					lists.push(domain);
				}
			}			
			callback(null,lists);
		}
	});
}


readWords("Words",function(err,a)
	{
		var words = [];
		readWords("NextWords",function(err,b){
			for(var i=0;i<a.length;i++)			
			{
				for(var j=0;j<b.length;j++)
				{
					words.push(a[i]+b[j]+".com");
				}
			}
			
			searchDomain(words,0,function(){
				console.log("Finish");
			});
		});
	}
);

// readWords("WordLists", function (error, a) {
// 	var words = [];
// 	for (var i = 0; i < a.length; i++) {

// 		if (a[i].length <= 8 && a[i].length >6) {
// 			words.push(a[i] + ".com");
// 		}

// 	}

// 	searchDomain(words, 0, function () {
// 		console.log("Finish");
// 	});
// });

	
// var p = readWords("");
// p.then(function (result) {


// 	return lists;
// }).then(function (lists) {
// 	// var start = searchDomain(lists[0]);



// 	// for(var j=1;j<lists.length;j++)
// 	// {
// 	// 	start = start.then(delay(5000));
// 	// 	start = start.then(searchDomain(lists[j]));
// 	// }

// }).done();
