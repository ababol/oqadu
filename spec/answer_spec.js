var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');


// test the integrity of the returned JSON by getting the answers list
frisby.create('Check answers endpoints')
.get(url + '/api/v2/answers')
.expectHeaderContains('Content-Type', 'json')
.expectStatus(200)
.expectJSONTypes('*', {
  text: String,
  question: {
    text: String,
    answers: Array,
    tags: Array
  },
  tags: Array
})
.toss();
