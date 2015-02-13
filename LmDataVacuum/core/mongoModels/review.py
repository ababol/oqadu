from mongoModel import MongoModel

class Review(MongoModel):

    def __init__(self, title, reviewerName, score, comment):
        self.title = title
        self.reviewerName = reviewerName
        self.score = score
        self.comment = comment


    def exportJson(self):
        json = "{"
        json += "\"title\": \"" +self.title+"\","
        json += "\"reviewerName\": \"" +self.reviewerName+"\","
        json += "\"score\": " +self.score+","
        json += "\"comment\": \"" + self.comment+"\""
        json +="}"
        return json
