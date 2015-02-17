# coding: utf-8
import sys
sys.path.insert(0, '../../');

from core.htmlModels.htmlPage import HtmlPage
from engine.pageManagment.htmlTools import HtmlParser
from engine.pageManagment.htmlTools import HtmlReader


class PageManager(object):


    def __init__(self, baseUrl, relativeUrl, mongoCollection):
        self._baseUrl = baseUrl
        self._relativeUrl = relativeUrl
        url = baseUrl + relativeUrl
        document = HtmlParser.getDom(HtmlReader.getHtmlContent(url))
        self.__htmlPage = HtmlPage(url, document)
        self._datas = mongoCollection
        self.__subPages = []

    def getDocument(self):
        return self.__htmlPage.getDocument()

    def addSubPage(self, subPage):
        if not isinstance(subPage, PageManager):
            raise TypeError('subPage must be a PageManager object')
        self.__subPages.append(subPage)

    def getMongoCollection(self):
        return self.__mongoCollection

    def getSubPages(self):
        return self.__subPages

    def getUrl(self):
        return self._baseUrl + self._relativeUrl

    def exctractDatas(self):
        raise Exception("abstract method from base class PageManager: must be overrited to be called.")
