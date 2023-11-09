from datetime import datetime
from flask import (Flask, Response, jsonify)
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/db_beautyBrand"
mongo = PyMongo(app)

def get_profile(email):
    data = mongo.db.account.find_one({'email': email})

    if data:
        _id = str(data['_id'])
        email = data['email']
        password = data['password']
        brand_name = data['brand_name']
        
        return jsonify({
            'isFound': True,
            'data': {
                '_id': _id,
                'email': email,
                'password': password,
                'brand_name': brand_name
            }
        })
    else:
        return jsonify({'isFound': False})
    
def validate_account(email, password):
    data = mongo.db.account.find_one({'email': email})

    if data:
        if data['password'] == password:
            return jsonify({'isValidate':True, 'isInvalidPassword':False,'isInvalidEmail':False})
        else:
            return jsonify({'isValidate':False, 'isInvalidPassword':True,'isInvalidEmail':False})
    else:
        return jsonify({'isValidate':False, 'isInvalidPassword':False,'isInvalidEmail':True})

def get_all_popular(time_start, time_end):
    time_start = datetime.strptime(time_start, "%Y-%m-%dT%H:%M:%S.%fZ")
    time_end = datetime.strptime(time_end, "%Y-%m-%dT%H:%M:%S.%fZ")

    data = mongo.db.allBrandPopular.find({
        'AnalysisDate': {
            '$gte': time_start,
            '$lte': time_end
        }
    })

    data_all_popular = []

    for item in data:
        products = item['Products']
        for product in products:
            data_all_popular.append({
                'Brand': product['Brand'],
                'Category': product['Category'],
                'PositivePostCount': product['PositivePostCount'],
                'NegativePostCount': product['NegativePostCount']
            })
    
    return jsonify({'data_all_popular': data_all_popular})

def get_own_popular(brand_name, time_start, time_end):
    time_start = datetime.strptime(time_start, "%Y-%m-%dT%H:%M:%S.%fZ")
    time_end = datetime.strptime(time_end, "%Y-%m-%dT%H:%M:%S.%fZ")

    data = mongo.db.ownBrandPopular.find({
        'Brand': brand_name,
        'AnalysisDate': {
            '$gte': time_start,
            '$lte': time_end
        }
    })

    data_own_popular = []

    for item in data:
        products = item['Products']
        for product in products:
            data_own_popular.append({
                'Brand': item['Brand'],
                'ProductName': product['Name'],
                'Category': product['Category'],
                'PositivePostCount': product['PositivePostCount'],
                'NegativePostCount': product['NegativePostCount']
            })
    
    return jsonify({'data_own_popular': data_own_popular})

def get_own_product(brand_name):
    data = mongo.db.ownBrandProduct.find({'Brand':brand_name})
    data_own_product = []

    for item in data:
        data_own_product.append({
            'Brand':item['Brand'],
            'Name':item['Name'],
            'Category':item['Category'],
            'Ingredients':item['Ingredients']
        })

    return jsonify({'data_own_product': data_own_product})

def get_recommendation(brand_name, time_start, time_end):
    data_all_popular = Response.get_json(get_all_popular(time_start, time_end))
    data_own_product = Response.get_json(get_own_product(brand_name))
    data_own_popular = Response.get_json(get_own_popular(brand_name,time_start, time_end))

    data_all_popular = data_all_popular['data_all_popular']
    data_own_product = data_own_product['data_own_product']
    data_own_popular = data_own_popular['data_own_popular']

    product_to_produce = get_product_to_procude(data_all_popular, data_own_product)
    # product_to_remove = get_sortByDifference(data_own_popular)

    return product_to_produce

def get_product_to_procude(allBrand, ownBrand):
    for item in allBrand:
        for own_product in ownBrand:
            # recommend product if the brand and category is different
            if (item['Brand'].lower() != own_product['Brand']) and (item['Category'] != own_product['Category']):
                product_to_produce = item['Brand'] +' '+ item['Category']
                break
        
        if product_to_produce:
            break

    return product_to_produce

def get_lowest_rank_product(product):
    sorted_data = sorted(product, key=lambda x: x["NegativePostCount"], reverse=True)

    lowest_rank_product = sorted_data[0]

    return lowest_rank_product

def get_sortByDifference(product):
    return sorted(product, key=lambda x: x["NegativePostCount"] - x["PositivePostCount"], reverse=True)