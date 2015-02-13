from mongoModel import MongoModel
from tag import Tag
from review import Review
from feature import Feature
from picture import Picture

class Product(MongoModel):

    def __init__(self, name, price, barcode = -1):
        self.barcode = barcode
        self.name = name
        self.price = price
        self.__tags = []
        self.__pictures = []
        self.__features = []
        self.__reviews = []

    def addTag(self, tag):
        self.__tags.append(tag)

    def addTags(self, tags):
        for tag in tags:
            self.addTag(tag)

    def getTags(self):
        return self.__tags

    def addFeature(self, feature):
        self.__features.append(feature)

    def addPicture(self, picture):
        self.__pictures.append(picture)

    def addReview(self, review):
        self.__reviews.append(review)


    def exportJson(self):
        json = "{"
        json += "barcode:"+str(self.barcode)+","
        json += "name:\""+self.name+"\","
        json += "price:"+str(self.price)+","

        json += "tags:["
        length = len(self.__tags)
        for i in range(0, length):
            tag = self.__tags[i]
            json += tag.exportJson()
            if i != length - 1:
                json+=","
        json += "],"

        json += "pictures:["
        length = len(self.__pictures)
        for i in range(0, length):
            picture = self.__pictures[i]
            json += picture.exportJson()
            if i != length - 1:
                json+=","
        json += "],"

        json += "features:["
        length = len(self.__features)
        for i in range(0, length):
            feature = self.__features[i]
            json += feature.exportJson()
            if i != length - 1:
                json+=","
        json += "],"

        json += "reviews:["
        length = len(self.__reviews)
        for i in range(0, length):
            review = self.__reviews[i]
            json += review.exportJson()
            if i != length - 1:
                json+=","
        json += "]"

        json +="}"
        return json
