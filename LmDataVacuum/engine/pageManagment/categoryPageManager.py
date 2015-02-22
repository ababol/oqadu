# coding: utf-8
from bs4 import BeautifulSoup

import sys
sys.path.insert(0, '../../');

from engine.pageManagment.pageManager import PageManager
from engine.pageManagment.subcategoryPageManager import SubcategoryPageManager
from core.mongoModels.tag import Tag
from core.mongoModels.answer import Answer
from core.mongoModels.question import Question
from copy import deepcopy

# exemple : http://www.leroymerlin.fr/v3/p/produits-l1308218734
class CategoryPageManager(PageManager):

    def __init__(self, baseUrl, relativeUrl, mongoCollection, maxProductCount):
        super(CategoryPageManager, self).__init__(baseUrl, relativeUrl, mongoCollection, maxProductCount)

    def exctractDatas(self):

        # QUESTION
        question = Question(u'Quel rayon vous intéresse?', [])
        self._datas.addQuestion(question)

        # ANSWERS
        dom = self.getDocument()
        answersHtml = dom.select('section.univers-box > h2 > a')

        length = len(answersHtml)
        for answerHtml in answersHtml:
            answerUrl = answerHtml["href"]
            answer = Answer(answerHtml.string.strip().replace('\"', "\\\""))

            # TAGS
            formatedStr = answer.text.replace(' ', '')
            subStr = formatedStr.split('&')
            for string in subStr:
                tagLabels = string.split(',')
                for tagLabel in tagLabels:
                    tag = Tag(tagLabel)
                    answer.addTag(tag)
                    self._datas.addTag(tag)
            self.addSubPage(SubcategoryPageManager(self._baseUrl, answerUrl, self._datas, question, answer, deepcopy(answer.getTags()), int(round(self._maxProductCount/length))))
