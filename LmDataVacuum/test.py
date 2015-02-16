import sys
sys.path.insert(0, '../');
#from engine.pageManagment.categoryPageManager import CategoryPageManager
from engine.pageManagment.subcategoryPageManager import SubcategoryPageManager
from engine.pageManagment.productPageManager import ProductPageManager
from engine.pageManagment.productListPageManager import ProductListPageManager
from core.mongoModels.mongoCollection import MongoCollection
from engine.fileManagment.fileFactory import FileFactory

baseUrl = "http://www.leroymerlin.fr"
relativeRoot = "/v3/p/produits/terrasse-jardin/abri-garage-rangement-et-etendage/abri-de-jardin-l1308217057"


mongoCollection = MongoCollection()
rootPage = ProductListPageManager(baseUrl, relativeRoot, mongoCollection, [], {})
rootPage.exctractDatas()
