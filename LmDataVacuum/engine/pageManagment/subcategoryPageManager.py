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


    def __init__(self, baseUrl, relativeUrl, mongoCollection, tags):
        super(SubcategoryPageManager, self).__init__(baseUrl, relativeUrl, mongoCollection)
        self.__tags = tags

    def exctractDatas(self):

        dom = self.getDocument()
        if len(dom.select('#criteria')) > 0 :
            try:
                self.addSubPage(CriterionsPageManager(self._baseUrl, self._relativeUrl, self._datas, self.__tags))
                return
            except:
                print "error: ", self._baseUrl + self._relativeUrl
                return

        # QUESTION
        question = Question('A quoi correspond votre besoin?', self.__tags)
        self._datas.addQuestion(question)

        # ANSWERS
        answersHtml = dom.select('section.product-entry > ul > li > h3 > a')
        for answerHtml in answersHtml:
            answerUrl = answerHtml["href"]
            answerText = answerHtml.string.strip()
            if answerText.find("...") > 0:
                answerText = answerHtml["title"]
            answer = Answer(answerText)
            question.addAnswer(answer)

            # TAGS
            subStr = answer.text.split(' et ')
            for string in subStr:
                tagLabels = string.split(',')
                for tagLabel in tagLabels:
                    tag = Tag(tagLabel.strip())
                    answer.addTag(tag)
                    self._datas.addTag(tag)
            try:
                self.addSubPage(SubcategoryPageManager(self._baseUrl, answerUrl, self._datas, deepcopy(self.__tags + answer.getTags())))
                break
            except:
                print "error: ", self._baseUrl + answerUrl
                return
