# coding: utf-8
from bs4 import BeautifulSoup

import sys
sys.path.insert(0, '../../');

from engine.pageManagment.pageManager import PageManager
from engine.pageManagment.productPageManager import ProductPageManager
from core.mongoModels.tag import Tag
from core.mongoModels.answer import Answer
from core.mongoModels.question import Question
from copy import deepcopy



# exemple : http://www.leroymerlin.fr/v3/p/produits/terrasse-jardin/abri-garage-rangement-et-etendage/abri-de-jardin-l1308217057
class ProductListPageManager(PageManager):

    def __init__(self, baseUrl, relativeUrl, mongoCollection, prevQuestion, prevAnswer, tags, products):
        super(ProductListPageManager, self).__init__(baseUrl, relativeUrl, mongoCollection)
        self.__prevQ = prevQuestion
        self.__prevA = prevAnswer
        self.__tags = tags
        self.__products = products

    def exctractDatas(self):
        dom = self.getDocument()

        productLinks = dom.select("#showcase > div > figure > a")
        productCount = len(productLinks)
        if productCount != 0:
            self.__prevQ.addAnswer(self.__prevA)

        for i in range(0, productCount, 2):
            productLink = productLinks[i]
            productUrl = productLink["href"].strip()
            imgPath = productLink.contents[1]["data-original"].strip()

            if productUrl in self.__products.keys():
                self.__products[productUrl].addTags(deepcopy(self.__tags))
            else:
                try:
                    ProductPageManager(self._baseUrl, productUrl, self._datas, self.__tags, self.__products, imgPath).exctractDatas()
                    print self._baseUrl + productUrl
                except Exception as e:
                    print "error: productListPage", self._baseUrl + productUrl
                    print e
                    return
