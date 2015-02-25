var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');

// tests of the APIv2
var expectedProduct = {"_id":"54ec7ef37c366d4c77c1f00d","barcode":-1,"name":"Tout le bricolage, Marabout","price":24.9,"__v":0,"faq":[],"reviews":[{"title":"Je ne pouvais pas trouver mieux","reviewerName":"Sarah","score":3,"comment":"Le prix reste élevé pour ce produit mais la qualité est vraiment au rendez-vous ! J'ai hésité à l'acheter mais vous pouvez céder les yeux fermés !","_id":"54ec7ef37c366d4c77c1f00e"}],"features":[{"label":"Résumé du livre","value":"Neuf chapitres développent tous les aspects du bricolage dans la maison. Des séquences pratiques et des informations théoriques permettent de guider le bricoleur débutant ou confirmé à travers réalisations, techniques et conseils d'entretien ou de réparation.","_id":"54ec7ef37c366d4c77c1f016"},{"label":"Sous-titre","value":"Toutes les instructions en photos","_id":"54ec7ef37c366d4c77c1f015"},{"label":"Auteurs","value":"Julian Cassell, Peter Parham","_id":"54ec7ef37c366d4c77c1f014"},{"label":"Nom de l'éditeur","value":"Marabout","_id":"54ec7ef37c366d4c77c1f013"},{"label":"Collection","value":"Les grands guides brico","_id":"54ec7ef37c366d4c77c1f012"},{"label":"Nombre de pages","value":"544","_id":"54ec7ef37c366d4c77c1f011"},{"label":"Format du livre (en cm)","value":"28x22","_id":"54ec7ef37c366d4c77c1f010"},{"label":"ISBN","value":"978-2-50104-714-2","_id":"54ec7ef37c366d4c77c1f00f"}],"pictures":[{"label":"Tout le bricolage, Marabout","path":"http://s2.lmcdn.fr/multimedia/b34699133/873150c5ac28/produits/tout-le-bricolage-marabout.jpg","_id":"54ec7ef37c366d4c77c1f017"}],"tags":["Outillage","Livre outillage","Manuel de bricolage","Outillage","Livre outillage","Marabout","Outillage","Livre outillage","20 - 50"]};

// test the integrity of the returned JSON by getting the products list
frisby.create('Check the 50 first Products /Products?limit=50')
  .get(url + '/api/v2/Products?limit=50')
    .expectHeaderContains('Content-Type', 'json')
    .expectStatus(200)
    .expectJSONTypes('*', {
      barcode: Number,
      name: String,
      price: Number,
      tags: [String],
      pictures: [{
        label: String,
        path: String
      }],
      features: [{
        label: String,
        value: String
      }],
      reviews: [{
        title: String,
        reviewerName: String,
        score: Number,
        comment: String
      }]
    })
    .toss();

frisby.create('Check Product ID /Products/:productId')
  .get(url + '/api/v2/Products/54ec7ef37c366d4c77c1f00d')
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(200)
  .expectJSON(expectedProduct)
  .toss();
