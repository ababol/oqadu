from mongoModel import MongoModel

class Tag(MongoModel):
    def __init__(self, label):
        self.label = label

    def exportJson(self):
        return self.label
