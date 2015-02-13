import sys
sys.path.insert(0, '../');
from engine.pageManagment.categoryPageManager import CategoryPageManager
from engine.pageManagment.subcategoryPageManager import SubcategoryPageManager
from engine.pageManagment.criterionsPageManager import CriterionsPageManager
from engine.pageManagment.productListPageManager import ProductListPageManager
from engine.pageManagment.productPageManager import ProductPageManager
from core.mongoModels.mongoCollection import MongoCollection
from core.mongoModels.answer import Answer
from core.mongoModels.tag import Tag

answer = Answer("textValue")
answer.addTag(Tag("toto"))
answer.addTag(Tag("tata"))
answer.addTag(Tag("titi"))

datasJson = print answer.exportJson()
