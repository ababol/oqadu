# coding: utf-8
from bs4 import BeautifulSoup

import sys
sys.path.insert(0, '../../');

from engine.pageManagment.pageManager import PageManager
from engine.pageManagment.criterionsPageManager import CriterionsPageManager
from core.mongoModels.tag import Tag
from core.mongoModels.answer import Answer
from core.mongoModels.question import Question
from core.mongoModels.mongoCollection import MongoCollection
from copy import deepcopy

# exemple: http://www.leroymerlin.fr/v3/p/produits/terrasse-jardin-l1308216920
class SubcategoryPageManager(PageManager):


    def __init__(self, baseUrl, relativeUrl, mongoCollection, prevQuestion, prevAnswer, tags, maxProductCount):
        super(SubcategoryPageManager, self).__init__(baseUrl, relativeUrl, mongoCollection, maxProductCount)
        self.__prevQ = prevQuestion
        self.__prevA = prevAnswer
        self.__tags = tags

    def exctractDatas(self):

        dom = self.getDocument()
        if len(dom.select('#criteria')) > 0 :
            try:
                self.addSubPage(CriterionsPageManager(self._baseUrl, self._relativeUrl, self._datas, self.__prevQ, self.__prevA, self.__tags, self._maxProductCount))
                return
            except Exception as e:
                print "error: subcategoryPage->criterion", self._baseUrl + self._relativeUrl
                print e
                return
        else:
            self.__prevQ.addAnswer(self.__prevA)

            # QUESTION
            question = Question(u'A quoi correspond votre besoin?', self.__tags)
            self._datas.addQuestion(question)

            # ANSWERS
            answersHtml = dom.select('section.product-entry > ul > li > h3 > a')
            length = len(answersHtml)
            for answerHtml in answersHtml:
                answerUrl = answerHtml["href"]
                answerText = answerHtml.string.strip().replace('\"', "\\\"")
                if answerText.find("...") > 0:
                    answerText = answerHtml["title"]
                answer = Answer(answerText)

                # TAGS
                subStr = answer.text.split(' et ')
                for string in subStr:
                    tagLabels = string.split(',')
                    for tagLabel in tagLabels:
                        tag = Tag(tagLabel.strip())
                        answer.addTag(tag)
                        self._datas.addTag(tag)
                try:
                    self.addSubPage(SubcategoryPageManager(self._baseUrl, answerUrl, self._datas, question, answer, self.__tags + deepcopy(answer.getTags()), int(round(self._maxProductCount/length))))
                except Exception as e:
                    print "error: subcategoryPage", self._baseUrl + answerUrl
                    print e
                    return
