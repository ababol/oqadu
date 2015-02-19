# coding: utf-8
from tag import Tag
from question import Question
from product import Product
from engine.fileManagment.fileFactory import FileFactory

class MongoCollection(object):

    def __init__(self):
        self.__tags = {}
        self.__questions = []
        self.__products = []

    def getProductCount(self):
        return len(self.__products)

    def addTag(self, tag):
        if not isinstance(tag, Tag) :
            raise TypeError('tag must be a instance of Tag')
        self.__tags[tag.label] = tag

    def addTags(self, tags):
        if(tags != null):
            for tag in tags:
                self.addTag(tag)

    def getProducts(self):
        return self.__products

    def addQuestion(self, question):
        if not isinstance(question, Question) :
            raise TypeError('question must be a instance of Question')
        self.__questions.append(question)

    def addQuestions(self, questions):
        if(questions != null):
            for question in questions:
                self.addQuestion(question)

    def addProduct(self, product):
        if not isinstance(product, Product) :
            raise TypeError('product must be a instance of Product')
        self.__products.append(product)

    def exportJson(self, path):
        file = open(path,'w')
        file.write("{")
        FileFactory.write(path, "TOTO")

        file.write("\"questions\": [")
        length = len(self.__questions)
        for i in range(0, length):
            question = self.__questions[i]
            if(question.getAnswersCount()>0):
                file.write(question.exportJson().encode("utf-8",  errors='xmlcharrefreplace').strip())
                if i != length - 1:
                    file.write(", ")
        file.write("],")

        file.write("\"products\": [")
        length = len(self.__products)
        for i in range(0, length):
            product = self.__products[i]
            file.write(product.exportJson().encode("utf-8",  errors='xmlcharrefreplace').strip())
            if i != length - 1:
                file.write(", ")
        file.write("]")

        file.write("}")
        file.close()

        print "\n\nDatas successfully exctracted:\n"
        print len(self.__questions), "questions generated!"
        print len(self.__products), "products generated!"
