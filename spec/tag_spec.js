var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');


// test the integrity of the returned JSON by getting the tags list
frisby.create('Check tags endpoints')
.get(url + '/api/v2/tags')
.expectHeaderContains('Content-Type', 'json')
.expectStatus(200)
.expectJSONTypes('*', {
  label: String
})
.toss();


