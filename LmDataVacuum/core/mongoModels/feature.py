# coding: utf-8
from mongoModel import MongoModel

class Feature(MongoModel):

    def __init__(self, label, value):
        self.label = label
        self.value = value


    def exportJson(self):
        json = "{"
        json += "\"label\": \""+self.label+"\","
        json += "\"value\": \""+self.value+"\""
        json +="}"
        return json
