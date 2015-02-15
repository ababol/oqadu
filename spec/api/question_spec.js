var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');

// tests of the APIv2
var expectedQuestion = {
  "_id": "54de3713b7e9b0141917eaed",
  "text": "Quel rayon vous intéresse?",
  "__v": 0,
  "tags": [],
  "answers": [{
    "text": "Terrasse & Jardin",
    "_id": "54de3713b7e9b0141917eaf9",
    "tags": ["Terrasse", "Jardin"]
  }, {
    "text": "Salle de bains",
    "_id": "54de3713b7e9b0141917eaf8",
    "tags": ["Salledebains"]
  }, {
    "text": "Cuisine",
    "_id": "54de3713b7e9b0141917eaf7",
    "tags": ["Cuisine"]
  }, {
    "text": "Rangement & Dressing",
    "_id": "54de3713b7e9b0141917eaf6",
    "tags": ["Rangement", "Dressing"]
  }, {
    "text": "Matériaux & Menuiserie",
    "_id": "54de3713b7e9b0141917eaf5",
    "tags": ["Matériaux", "Menuiserie"]
  }, {
    "text": "Carrelage, parquet & sol souple",
    "_id": "54de3713b7e9b0141917eaf4",
    "tags": ["Carrelage", "parquet", "solsouple"]
  }, {
    "text": "Décoration & Eclairage",
    "_id": "54de3713b7e9b0141917eaf3",
    "tags": ["Décoration", "Eclairage"]
  }, {
    "text": "Peinture & Droguerie",
    "_id": "54de3713b7e9b0141917eaf2",
    "tags": ["Peinture", "Droguerie"]
  }, {
    "text": "Electricité & Domotique",
    "_id": "54de3713b7e9b0141917eaf1",
    "tags": ["Electricité", "Domotique"]
  }, {
    "text": "Chauffage & Plomberie",
    "_id": "54de3713b7e9b0141917eaf0",
    "tags": ["Chauffage", "Plomberie"]
  }, {
    "text": "Quincaillerie & Sécurité",
    "_id": "54de3713b7e9b0141917eaef",
    "tags": ["Quincaillerie", "Sécurité"]
  }, {
    "text": "Outillage",
    "_id": "54de3713b7e9b0141917eaee",
    "tags": ["Outillage"]
  }]
};

// test the integrity of the returned JSON by getting the products list
frisby.create('Check All Questions /Questions')
  .get(url + '/api/v2/Questions')
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(200)
  .expectJSONTypes('*', {
    text: String,
    answers: [{
      text: String,
      tags: [String]
    }],
    tags: [String]
  })
  .expectJSON('?', expectedQuestion)
.toss();

frisby.create('Check First Question /Questions/:productId')
  .get(url + '/api/v2/Questions/Tags/?tags=')
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(200)
  .expectJSON(expectedQuestion)
.toss();
