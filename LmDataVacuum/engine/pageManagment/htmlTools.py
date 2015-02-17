# coding: utf-8
from bs4 import BeautifulSoup
from urllib2 import urlopen

class HtmlParser:

    @staticmethod
    def getDom(htmlText):
        return BeautifulSoup(htmlText)


class HtmlReader:

    @staticmethod
    def getHtmlContent(url):
        content = urlopen(url)
        return content.read()
