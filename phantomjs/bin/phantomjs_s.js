var http = require('http');
var url  = require('url');
var querystring = require('querystring');
var fs = require('fs');

// creation du screenshot
function screenShoot(req, res, adress, name_img) {
	var phantom = require('phantom');
	phantom.create("--ignore-ssl-errors=yes", "--ssl-protocol=any", function (ph) {//mMAKE SURE WE CAN RENDER https
		ph.createPage(function (page) {
			page.open(adress, function(status) {
				//console.log('Rendering '+adress+' ....');
				if (status == "success")  {
					console.log('Rendering '+adress+' ....');
					//console.log('-----------> Parsing '+adress+' Done!');
					var img = document.querySelectorAll("img");
					var imp = [];
					for (var i = 0; i < img.length; i++) { 
						imp.push(img[i].src);
					}
					console.log(imp.length);
					console.log('-----------> Parsing '+adress+' Done!');
					for (var i = 0; i < imp.length; i++) {
						console.log('-----------> '+imp[i]+' Finished!');
					}
					console.log("img");
				} // fin if status == success
					
				ph.exit();					
			}); // end of open page
		}); // end of create page
	}); //end of phantom create
	return 1;
}

function affImages(request, response, img) {
	//var img  = name_img +'.jpeg';
	var smiley = fs.readFileSync(img);
	  if(request.url.indexOf(img)<0) {
	      response.writeHead(200, {"Content-Type": "image/jpeg"});
	      response.write('<center>Website in image : <br/> <img src="'+img+'" alt="image uploaded" > </center>');
	      response.end();
	  }
	  else
	  {
	     response.writeHead(200, {"Content-Type": "image/jpeg"});
	     response.write(smiley);
	     response.end();
	  }
}
// creation du server
var server = http.createServer(function(req, res) {  // req : requete du visiteur  ; res : réponse du serveur
	var params = querystring.parse(url.parse(req.url).query);
	if('adress' in params && 'nameimg' in params) {
		console.log("I am running!");
		screenShoot(req, res, params['adress'], params['nameimg']);
	}
	else {
		res.write('Erreur de paramètre !')
	}
	
});

console.log("Welcome to server dash ....");

// écoute du server sur le port
server.listen(8080);