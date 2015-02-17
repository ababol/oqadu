# coding: utf-8
from bs4 import BeautifulSoup

import sys
sys.path.insert(0, '../../');

from engine.fileManagment.fileFactory import FileFactory
from engine.pageManagment.pageManager import PageManager
from core.mongoModels.tag import Tag
from core.mongoModels.answer import Answer
from core.mongoModels.question import Question
from core.mongoModels.product import Product
from core.mongoModels.feature import Feature
from core.mongoModels.picture import Picture
from copy import deepcopy



# exemple :
class ProductPageManager(PageManager):

    def __init__(self, baseUrl, relativeUrl, mongoCollection, tags, products, imgPath):
        super(ProductPageManager, self).__init__(baseUrl, relativeUrl, mongoCollection)
        self.__tags = tags
        self.__products = products
        self.__imgPath = imgPath

    def exctractDatas(self):
        dom = self.getDocument()

        # PRODUCT NAME
        name = dom.select("h1")[0].string.strip()

        # PRODUCT PRICE
        priceHtml = dom.select(".price > strong")[0].contents
        length = len(priceHtml[0])
        price = []
        for i in range(0, length-1):
            price.append(priceHtml[0][i])
        price = float("".join(price))
        product = Product(name, price)

        #PRODUCT TAGS
        product.addTags(self.__tags)

        #PRODUCT FEATURES
        productFeatures = dom.select("#description-technique > .tech-desc > tbody > tr")
        for productFeature in productFeatures:
            fLabel = productFeature.contents[1].string
            fValue = productFeature.contents[3].string
            if fValue != None and fLabel != None:
                product.addFeature(Feature(fLabel.strip('\n').strip('\t').strip(), fValue.strip('\n').strip('\t').strip()))

        # PRODUCT PICTURES
        product.addPicture(Picture(product.name, self.__imgPath))

        self.__products[self._relativeUrl] = product
        self._datas.addProduct(product)
