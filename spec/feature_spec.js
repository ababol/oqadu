var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');


// test the integrity of the returned JSON by getting the features list
frisby.create('Check Products endpoints')
.get(url + '/api/v2/features')
.expectHeaderContains('Content-Type', 'json')
.expectStatus(200)
.expectJSONTypes('*', {
  label: String,
  value: String
})
.toss();


