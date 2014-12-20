var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');

var expectedTondeuse = {
  "_id":"545fc3da946ea453ece17f22",
  "name":"Tondeuse à essence STERWINS 460HSP140-3, 160 cm3",
  "img":["img/products/tondeuse-a-essence-sterwins-460hsp140-3-160-cm3.jpg"],
  "info_label":["Surface conseillé(m²)","Type de propulsion","Type d'éjection"],
  "info_text":["1500","Tractée","2 en 1 : arrière et mulching"],
  "price":289,
  "tags":["outillage","gazon","tonte"]
};

frisby.create('Check Products endpoints')
  .get(url + '/api/v1/Products')
    .expectHeaderContains('Content-Type', 'json')
    .expectStatus(200)
    .expectJSONTypes('*', {
      name: String,
      img: Array,
      tags: Array
    })
    .expectJSON('?', expectedTondeuse)
.toss();


frisby.create('Check Product Tondeuse')
  .get(url + '/api/v1/Products/545fc3da946ea453ece17f22')
    .expectHeaderContains('Content-Type', 'json')
    .expectStatus(200)
    .expectJSON(expectedTondeuse)
.toss();
