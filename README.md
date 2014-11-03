bricodata
=========

Leroy Merlin \o/

#API

## Install
- installer mongodb
- lancer mongodb
- cloner le repo
- `cd bricodata`
- `npm install`
- `node app.js` (lances l'api -> il manquera p-e des dependances mais en principe cest assez clair quand cest le cas et suffit de npm install -g ladependance)

## Utiliser l'API

On utilise un framework pour l'API, je vous invite à voir la doc officielle [https://github.com/florianholzapfel/express-restify-mongoose](https://github.com/florianholzapfel/express-restify-mongoose)

Pour la création de table via mongoose, pareillement: http://mongoosejs.com/docs/guide.html

Autrement il suffit d'ajouter vos fichiers dans https://github.com/ababol/bricodata/tree/master/app/models et en principe vous n'avez rien à modifier pour que votre nouvelle table soit accessible via l'url /api/v1/Manouvelletable

Exemple de requête CURL:
`curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Arnaud"}' http://localhost:3000/api/v1/Users`
