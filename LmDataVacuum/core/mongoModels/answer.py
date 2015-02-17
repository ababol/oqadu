# coding: utf-8
from mongoModel import MongoModel
from tag import Tag

class Answer(MongoModel):

    def __init__(self, text):
        self.text = text
        self.__tags = []

    def addTag(self, tag):
        self.__tags.append(tag)

    def getTags(self):
        return self.__tags

    def exportJson(self):
        json = "{"
        json += "\"text\": \""+self.text+"\","
        json += "\"tags\": ["
        tagCount = len(self.__tags)
        for i in range(0, tagCount):
            tag = self.__tags[i]
            json += tag.exportJson()
            if i != tagCount - 1:
                json+=", "
        json += "]"
        json +="}"
        return json
