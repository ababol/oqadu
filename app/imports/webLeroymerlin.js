var phantomjs = require('phantomjs');
var mongoose = require('node-restful').mongoose;
var models = require('../models/index');

// main ###########
var datas = {
  tags : [],
  questions : [],
  products : []
}
var rootUrl = "http://www.leroymerlin.fr/v3/p/produits-l1308218734";

var currentTags = [];

pahntomjs.create(categoryPage);
// ################



/**
* categoryPage : Traversal category page to exctract datas.
**/
var categoryPage = function(error, ph){
  ph.createPage(function(error, page){
    page.open(function(rootUrl, err, status){
      page.includeJS("./jquery-1.11.2.min.js", function(){

        // QUESTION
        var question = new models.question({
          text:'Quel rayon vous interesse?',
          answers:[],
          tags:[]
        });
        datas.questions.push(question);
        // ANSWERS
        var subCategoriesHtml = $('#contend.univers-box');
        subCategoriesHtml.foreach(function(category){
          var subCategoryUrl = category.children('a').attr('href');
          var answer = new models.answer(){
            text : category.children('h2').text(),
            tags:[]
          });
          question.answers.push(answer);
          // TAGS
          var aswerLabelFormated = aswer.text.replace(' ','');
          var answerLabelSplited = aswerLabelFormated.split('&');
          for(var i = 0; i<answerLabelSplited.length, i++){
            aswerLabelSplited[i] = aswerLabelSplited[i].split(',');
          }
          answerLabelSplited.foreach(function(tagLabel){
            var tag = new models.tag({
              label : tagLabel
            });
            answer.tags.push(tag._id);
            datas.tags.push(tag);
          });
          subCategoryPage(error, ph, subCategoryUrl, $.extend(true, {}, answer.tags));
        });
      }
    });
  });
}


/**
* categoryPage : Traversal sub-category pages to exctract datas.
**/
var subCategoryPage = function(error, ph, url, tagsId){
  ph.createPage(function(error, page){
    page.open(function(url, err, status){
      page.includeJS("./jquery-1.11.2.min.js", function(){
        
      });
    });
  });
}


/**
* categoryPage : Traversal product pages to exctract datas.
**/
var productPage = function(error, ph, url, tags){
  ph.createPage(function(error, page){
    page.open(function(url, err, status){
      page.includeJS(url, function(){

      });
    });
  });
}
