var system = require("system");
	
if (system.args.length < 2) {
	console.log('You need an adress !');
	phantom.exit();
}
else {
	console.log('I am running!');
	var page = require('webpage').create();
	var adresse = system.args[1];
	page.open(adresse, function(status) {
		if (status == "success")  {
			img = page.evaluate(function() {
				//var img = document.querySelector('img');
				///return img.src + ' ' + img.width + ' x ' +  img.height;
				console.log('I am running again!'); 
				var img = document.querySelectorAll("img");
				var imp = [];
				for (var i = 0; i < img.length; i++) { 
					imp.push(img[i].src)
				}
				return imp;	
			}); //img 
			console.log(img.length);
			for (var i = 0; i < img.length; i++) { 
				console.log(img[i]);
			}
	 	  } /// if
		 phantom.exit(); 
		});
}