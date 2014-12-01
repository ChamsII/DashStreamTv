var http = require('http');
var url  = require('url');
var querystring = require('querystring');
var fs = require('fs');

// creation du screenshot
function screenShoot(req, res, adress, width_, height_, name_img) {
	var phantom = require('phantom');
	phantom.create("--ignore-ssl-errors=yes", "--ssl-protocol=any", function (ph) {//mMAKE SURE WE CAN RENDER https
		ph.createPage(function (page) {
			//create page object
			page.set('viewportSize', {width:1280,height:900}, function(){
				page.set('clipRect', {top:0,left:0,width:1280,height:900}, function(){
					page.open(adress, function(status) {
						console.log('Rendering '+adress+' ....');
						page.render(name_img, function(finished){
							console.log('-----------> Rendering '+adress+' Done!');
							affImages(req, res, name_img);
							console.log('-----------> Finished!');
						});	
						ph.exit();					
					}); // end of open page
				}); // end of et cliprect
			}); // end of viewportSize
		}); // end of create page
	}); //end of phantom create
	return 1;
}

function affImages(request, response, img) {
	//var img  = name_img +'.jpeg';
	var smiley = fs.readFileSync(img);
	  if(request.url.indexOf(img)<0) {
	      response.writeHead(200, {"Content-Type": "image/jpeg"});
	      response.write('Website in image : <br/> <img src="'+img+'" alt="image uploaded" >');
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
	if('width' in params && 'height' in params &&  'adress' in params && 'nameimg' in params) {
		screenShoot(req, res, params['adress'], params['width'], params['height'], params['nameimg']);
	}
	else {
		res.write('Erreur de paramètre !')
	}
	
});

console.log("Welcome to server dash ....");
console.log("I am running in port : 4242!");

// écoute du server sur le port
server.listen(4242);  //8080
//server.close();
