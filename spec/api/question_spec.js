var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');

// tests of the APIv2
var expectedQuestion = {"_id":"54ec7d5b7c366d4c77c1c5b7","text":"Quel rayon vous intéresse?","__v":0,"tags":[],"answers":[{"text":"Outillage","_id":"54ec7d5b7c366d4c77c1c5be","tags":["Outillage"]},{"text":"Quincaillerie & Sécurité","_id":"54ec7d5b7c366d4c77c1c5bd","tags":["Quincaillerie","Sécurité"]},{"text":"Chauffage & Plomberie","_id":"54ec7d5b7c366d4c77c1c5bc","tags":["Chauffage","Plomberie"]},{"text":"Electricité & Domotique","_id":"54ec7d5b7c366d4c77c1c5bb","tags":["Electricité","Domotique"]},{"text":"Peinture & Droguerie","_id":"54ec7d5b7c366d4c77c1c5ba","tags":["Peinture","Droguerie"]},{"text":"Décoration & Eclairage","_id":"54ec7d5b7c366d4c77c1c5b9","tags":["Décoration","Eclairage"]},{"text":"Carrelage, parquet & sol souple","_id":"54ec7d5b7c366d4c77c1c5b8","tags":["Carrelage","parquet","solsouple"]}]};

// test the integrity of the returned JSON by getting the products list
frisby.create('Check the 50 first Questions /Questions?limit=50')
  .get(url + '/api/v2/Questions?limit=50')
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
  /**.afterJSON(function(json) {
    // You can use any normal jasmine-style assertions here
    var isMoreThan1Answer = true;
      for (var i = 0; i < json.length; i++) {
        var answerNb = json[i].answers.length;
        if (answerNb < 2) {
          isMoreThan1Answer = false;
        };
      };
    describe("Check each question has more than one answer", function() {
      it("(answers > 1)", function() {
        expect(isMoreThan1Answer).toEqual(true);
      });
    });
  })**/
.toss();

frisby.create('Check First Question /Questions/:questionId')
  .get(url + '/api/v2/Questions/54ec7d5b7c366d4c77c1c5b7')
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(200)
  .expectJSON(expectedQuestion)
.toss();
