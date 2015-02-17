# coding: utf-8
from bs4 import BeautifulSoup

import sys
sys.path.insert(0, '../../');

from engine.pageManagment.pageManager import PageManager
from engine.pageManagment.productListPageManager import ProductListPageManager
from core.mongoModels.tag import Tag
from core.mongoModels.answer import Answer
from core.mongoModels.question import Question
from copy import deepcopy

class Criteria(object):

    def  __init__(self, url, title, productCount):
        self.url = url
        self.title = title
        self.productCount = productCount


class Criterion(object):

    def __init__(self, title):
        self.title = title
        self.criterias = []

    ##
    # getPriority : return a float between 0(low priority) and 1(high priority)
    ##
    def getProductCount(self):
        if len(self.criterias) <= 1:
            return 0
        productCount = 0
        for criteria in self.criterias:
            productCount += criteria.productCount
        return productCount

    def addCriteria(self, url, title, productCount):
        self.addCriteria(Criteria(url, title, productCount))

    def addCriteria(self, criteria):
        self.criterias.append(criteria)


# exemple : http://www.leroymerlin.fr/v3/p/produits/terrasse-jardin/abri-garage-rangement-et-etendage/abri-de-jardin-l1308217057
class CriterionsPageManager(PageManager):

    def __init__(self, baseUrl, relativeUrl, mongoCollection, prevQuestion, prevAnswer, tags):
        super(CriterionsPageManager, self).__init__(baseUrl, relativeUrl, mongoCollection)
        self.__prevQ = prevQuestion
        self.__prevA = prevAnswer
        self.__tags = tags
        self.__criterions = []

    def exctractDatas(self):
        self.__prevQ.addAnswer(self.__prevA)

        dom = self.getDocument()

        # CRITERIONS (SMART QUESTION BUILDER)
        criterionFieldSets = dom.select("#criterions > fieldset")
        for criterionFieldSet in criterionFieldSets:
            # Criterion
            criterion = Criterion(criterionFieldSet.contents[1].contents[0].string.strip())
            self.__criterions.append(criterion)
            criteriasLi = criterionFieldSet.contents[3].contents
            criteriasCount = len(criteriasLi)
            for i in range(1, criteriasCount, 2):
                # Criteria
                criteriaLi = criteriasLi[i]
                if criteriaLi.contents[1].name == 'input':
                    productCount = int(criteriaLi.contents[3].contents[3].string.replace('(','').replace(')',''))
                    if productCount > 0 :
                        criteriaUrl = criteriaLi.contents[1]["value"]
                        criteriaTitle = criteriaLi.contents[3].contents[2].strip('\n').strip('\t').strip().replace('\"', "\\\"")
                        criteria = Criteria(criteriaUrl, criteriaTitle, productCount)
                        criterion.addCriteria(criteria)

        products = {}

        # QUESTIONS
        for criterion in self.__criterions:

            if criterion.getProductCount() >= 1:
                question = Question(criterion.title, deepcopy(self.__tags))
                question.addAnswer(Answer('Ne sais pas'))
                self._datas.addQuestion(question)

                # ANSWERS & TAGS
                for criteria in criterion.criterias:
                    answer = Answer(criteria.title)
                    tag = Tag(criteria.title)
                    answer.addTag(tag)
                    self._datas.addTag(tag)
                    question.addAnswer(answer)
                    try:
                        ProductListPageManager(self._baseUrl, criteria.url, self._datas, question, answer, deepcopy(self.__tags + answer.getTags()), products).exctractDatas()
                        print self._baseUrl + criteria.url
                    except Exception as e:
                        print "error: criterionPage", self._baseUrl + answerUrl
                        print e
                        return
