DashStreamTv
============

Le but est d'afficher une page web contenant du javascript sur 
un périphérique ne gérant pas ou mal le javascript comme une 
TV connectée ou une Chromecast.


USAGE :

create screenshot :

ALler dans phantomjs/bin :
executer la commande " node phantomjs_s.js  " pour lancer le serveur 
puis dans un navigateur dans la bare d'adresse donneée le liens du site à faire le screenShot. 
Usage : 
[adresse du serveur] [port]/page? [width] & [height] & [adress] & [nameimg]
Exemple d'usage
localhost:4242/page?width=1200&height=600&adress=http://google.fr&nameimg=le269.jpeg


Lancer le serveur dashkiosk :
Aller dans dashkiosk-2.4.0/dist
executer la commande : 
 node server.js --environment production --chromecast.enabled --chromecast.receiver http://[adresse du serveur]:9500/receiver
Pour lancer le serveur js du dashkisok

Puis dans le navigateur :
Ouvrir la page d'administration : [adresse du serveur]:9500/admin
Ouvrir la page d'affichage de l'écran " le receveur"  : [adresse du serveur]:9500/receiver
Vous pouvez aussi ouvrir la page de connexion de chromecast : [adresse du serveur]:9500/chromecast

Dans la page d'administration vous pouvez afficher le screenshot via son lien ou afficher des vidéo du web.
