var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');

// tests of the APIv2

// test the integrity of the returned JSON by getting the products list
frisby.create('Check Products endpoints')
.get(url + '/api/v2/products')
.expectHeaderContains('Content-Type', 'json')
.expectStatus(200)
.expectJSONTypes('*', {
  name: String,
  dutyFreePrice: Number,
  tags: Array,
  pictures: Array,
  features: Array
})
.toss();

// test the data of the product with id 545fc3da946ea453ece17f22
var expectedProduct = {
  "_id":"545fc3da946ea453ece17f22",
  "name":"Tondeuse à essence STERWINS 460HSP140-3, 160 cm3",
  "dutyFreePrice":289,
  "tags":["outillage","gazon","tonte"],
  "pictures":["img/products/tondeuse-a-essence-sterwins-460hsp140-3-160-cm3.jpg"],
  "features":["Surface conseillé(m²):1500", "Type de propulsion:tractée", "Type d'éjection:2 en 1 : arrière et mulching"]
};

frisby.create('Check Product Tondeuse')
  .get(url + '/api/v2/products/545fc3da946ea453ece17f22')
    .expectHeaderContains('Content-Type', 'json')
    .expectStatus(200)
    .expectJSON(expectedProduct)
.toss();

// test example of a product from the APIv1
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
