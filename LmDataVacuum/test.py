import sys
sys.path.insert(0, '../');
#from engine.pageManagment.categoryPageManager import CategoryPageManager
from engine.pageManagment.subcategoryPageManager import SubcategoryPageManager
from core.mongoModels.mongoCollection import MongoCollection
from engine.fileManagment.fileFactory import FileFactory

baseUrl = "http://www.leroymerlin.fr"
relativeRoot = "/v3/p/produits/terrasse-jardin-l1308216920"


mongoCollection = MongoCollection()
rootPage = SubcategoryPageManager(baseUrl, relativeRoot, mongoCollection, [])
rootPage.exctractDatas()
