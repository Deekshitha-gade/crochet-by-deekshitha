from pydantic import BaseModel
class Product(BaseModel):
    id:int
    name:str
    price:int
    description:str
    image_url:str
class Product_response(BaseModel):
    status:str="success"
    total:int
    items:list[Product]