var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');


// test the integrity of the returned JSON by getting the questions list
frisby.create('Check questions endpoints')
.get(url + '/api/v2/questions')
.expectHeaderContains('Content-Type', 'json')
.expectStatus(200)
.expectJSONTypes('*', {
  text: String,
  answers: Array,
  tags: Array
})
.toss();
