import sys
sys.path.insert(0, '../');
from engine.pageManagment.categoryPageManager import CategoryPageManager
from core.mongoModels.mongoCollection import MongoCollection
from engine.fileManagment.fileFactory import FileFactory

baseUrl = "http://www.leroymerlin.fr"
relativeRoot = "/v3/p/produits-l1308218734"


mongoCollection = MongoCollection()
rootPage = CategoryPageManager(baseUrl, relativeRoot, mongoCollection)
rootPage.exctractDatas()
print baseUrl+relativeRoot
pages = rootPage.getSubPages();

while len(pages) > 0 :
    page = pages.pop(0);
    page.exctractDatas()
    print page.getUrl()
    subPages = page.getSubPages();
    for subPage in subPages:
        pages.append(subPage)

datasJson = mongoCollection.exportJson().encode("utf-8")
FileFactory.write('../datas.json', datasJson)
