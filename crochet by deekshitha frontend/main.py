from fastapi import FastAPI
from data import Products
from schemas import Product,Product_response
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
app = FastAPI(
    title="handmade crochet products",
    description="all the crochet products that are made by deekshitha are sold",
)

BASE_DIR = Path(__file__).resolve().parent
app.mount("/images", StaticFiles(directory=BASE_DIR / "images"), name="images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175", "http://127.0.0.1:5175", "https://crochet-frontend-ggwj.onrender.com/"],
    allow_methods=["GET"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "Welcome to the crochet products API!"}

@app.get("/products/id/{product_id}",response_model=Product)
def get_product(product_id: int):
    for product in Products:
        if product["id"] == product_id:
            return product
    return {"error": "Product not found"}

@app.get("/products/name/{product_name}",response_model=Product)
def get_product1(product_name:str):
    for product in Products:
        if product["name"].lower() == product_name.lower():
            return product
    return {"error":"Product not found"}

@app.get("/products",response_model=Product_response)
def get_products():
    return {
        "total": len(Products),
        "items": Products
    }