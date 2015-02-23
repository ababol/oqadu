# coding: utf-8
import sys
import winsound

sys.path.insert(0, '../');
from engine.pageManagment.categoryPageManager import CategoryPageManager
from core.mongoModels.mongoCollection import MongoCollection
from engine.fileManagment.fileFactory import FileFactory

baseUrl = "http://www.leroymerlin.fr"
relativeRoot = "/v3/p/produits-l1308218734"

maxProductCount = 5000
mongoCollection = MongoCollection()
rootPage = CategoryPageManager(baseUrl, relativeRoot, mongoCollection, maxProductCount)
rootPage.exctractDatas()
print baseUrl+relativeRoot
pages = rootPage.getSubPages();

while len(pages) > 0 and mongoCollection.getProductCount() < maxProductCount:

    page = pages.pop();
    page.exctractDatas()
    print page.getUrl()
    subPages = page.getSubPages();
    for subPage in subPages:
        pages.append(subPage)


mongoCollection.exportJson("./exctractedDatas.json")
# Play Windows exit sound.
winsound.PlaySound("SystemExit", winsound.SND_ALIAS)
