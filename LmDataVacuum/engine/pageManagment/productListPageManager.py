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

    def __init__(self, baseUrl, relativeUrl, mongoCollection, tags, products):
        super(ProductListPageManager, self).__init__(baseUrl, relativeUrl, mongoCollection)
        self.__tags = tags
        self.__products = products

    def exctractDatas(self):
        dom = self.getDocument()

        productLinks = dom.select("#showcase > div > figure > a")
        productCount = len(productLinks)
        for i in range(0, productCount, 2):
            productLink = productLinks[i]
            productUrl = productLink["href"]
            imgPath = productLink.contents[1]["src"]

            if productUrl in self.__products.keys():
                self.__products[productUrl].addTags(deepcopy(self.__tags))
            else:
                try:
                    self.addSubPage(ProductPageManager(self._baseUrl, productUrl, self._datas, self.__tags, self.__products, imgPath))
                    return
                except:
                    print "error: ", self._baseUrl + productUrl
                    return