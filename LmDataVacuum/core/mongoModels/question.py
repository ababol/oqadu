from mongoModel import MongoModel
from tag import Tag
from answer import Answer

class Question(MongoModel):

    def __init__(self, text, tags):
        self.text = text
        self.__answers = []
        self.__tags = tags

    def addTag(self, tag):
        self.__tag.append(tag)

    def addAnswer(self, answer):
        self.__answers.append(answer)

    def exportJson(self):
        json = "{"
        json += "text:\"" +self.text+"\","

        json += "answers:["
        length = len(self.__answers)
        for i in range(0, length):
            answer = self.__answers[i]
            json += answer.exportJson()
            if i != length - 1:
                json+=","
        json += "],"

        json += "tags:["
        length = len(self.__tags)
        for i in range(0, length):
            tag = self.__tags[i]
            json += tag.exportJson()
            if i != length - 1:
                json+=","
        json += "]"

        json +="}"
        return json
