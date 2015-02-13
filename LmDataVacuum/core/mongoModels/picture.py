from mongoModel import MongoModel

class Picture(MongoModel):

    def __init__(self, label, path):
        self.label = label
        self.path = path


    def exportJson(self):
        json = "{"
        json += "label:\"" +self.label+"\","
        json += "path:\"" + self.path+"\""
        json +="}"
        return json
