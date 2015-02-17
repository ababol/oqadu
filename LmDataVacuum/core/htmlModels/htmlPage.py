# coding: utf-8
from bs4 import BeautifulSoup
##
# HtmlPage : represent an html page
#
# @extends : TagContainer
#
# @attribute name : a string representing the name of the page (used for file creation)
# @attribute ospath : a string representing the local path to the file
# @attribute url : a string representing the url of the page
# @attribute document : a Document object representing the html DOM
##

class HtmlPage(object):

    def __init__(self, url, document):
        self.setUrl(url)
        self.setDocument(document)


    ##
    # getUrl : returns the url of the self page
    #
    # @return : a string representing the url of the self html page
    ##
    def getUrl(self):
        return self.__url


    ##
    # getDocument : returns the DOM of the self page
    #
    # @return : a DOM object representing the DOM of the self html page
    ##
    def getDocument(self):
        return self.__dom
    ##
    # setUrl : set the url of the self page
    #
    # @attribute url : a string representing the url of the self html page
    ##
    def setUrl(self, url):
        if not isinstance(url, basestring):
            raise TypeError('url must be a string or unicode object')
        self.__url = url



    ##
    # setDocument : set the DOM of the self page
    #
    # @attribute document : a xml.dom.Document Object representing the dom of the self html page
    ##
    def setDocument(self, document):
        if not isinstance(document, BeautifulSoup):
            raise TypeError('document must be a BeautifulSoup Object')

        self.__dom = document

    ##
    # toString : build the xml representation of the html page using unicode encoding
    #
    # @return : a unicode object representing the html code of the self page.
    ##
    def toString(self):
        return self.__document.toxml()
