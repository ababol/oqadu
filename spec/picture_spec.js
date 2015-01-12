var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');


// test the integrity of the returned JSON by getting the pictures list
frisby.create('Check pictures endpoints')
.get(url + '/api/v2/pictures')
.expectHeaderContains('Content-Type', 'json')
.expectStatus(200)
.expectJSONTypes('*', {
  label: String,
  url: String
})
.toss();


