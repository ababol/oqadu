import sys
sys.path.insert(0, '../');
#from engine.pageManagment.categoryPageManager import CategoryPageManager
from engine.pageManagment.subcategoryPageManager import SubcategoryPageManager
from engine.pageManagment.productPageManager import ProductPageManager
from engine.pageManagment.productListPageManager import ProductListPageManager
from core.mongoModels.mongoCollection import MongoCollection
from engine.fileManagment.fileFactory import FileFactory

baseUrl = "http://www.leroymerlin.fr"
relativeRoot = "/v3/p/produits/salle-de-bains/robinet-de-salle-de-bains-l1308217039"


mongoCollection = MongoCollection()
rootPage = SubcategoryPageManager(baseUrl, relativeRoot, mongoCollection, [])
for i in range(0,100):
    rootPage.exctractDatas()
    print rootPage.getUrl()
