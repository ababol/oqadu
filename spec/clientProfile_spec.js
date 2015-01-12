var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');


// test the integrity of the returned JSON by getting the clientProfiles list
frisby.create('Check clientProfiles endpoints')
.get(url + '/api/v2/clientProfiles')
.expectHeaderContains('Content-Type', 'json')
.expectStatus(200)
.expectJSONTypes('*', {
  currentTags: Array
})
.toss();
