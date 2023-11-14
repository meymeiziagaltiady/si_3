from datetime import datetime
import json
from flask import (Flask, Response, jsonify)
from flask_pymongo import PyMongo
import pandas as pd

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
            return jsonify({'isValid':True, 'isInvalidPassword':False,'isInvalidEmail':False})
        else:
            return jsonify({'isValid':False, 'isInvalidPassword':True,'isInvalidEmail':False})
    else:
        return jsonify({'isValid':False, 'isInvalidPassword':False,'isInvalidEmail':True})

def get_all_popular(time_start, time_end):
    time_start = datetime.strptime(time_start, "%Y-%m-%dT%H:%M:%S.%fZ")
    time_end = datetime.strptime(time_end, "%Y-%m-%dT%H:%M:%S.%fZ")

    data = mongo.db.allBrandPopular.find({
        'AnalysisDate': {
            '$gte': time_start,
            '$lte': time_end
        }
    })

    # amount of document fetched
    num_docs = 0

    data_all_popular = []

    for item in data:
        num_docs += 1
        products = item['Products']
        for product in products:
            data_all_popular.append({
                'Brand': product['Brand'],
                'Category': product['Category'],
                'PositivePostCount': product['PositivePostCount'],
                'NegativePostCount': product['NegativePostCount']
            })

    if num_docs > 1:
        data_all_popular = json.loads(merge_allBrand_reports(data_all_popular))
    
    return data_all_popular

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

    # amount of document fetched
    num_docs = 0

    data_own_popular = []

    for item in data:
        num_docs += 1
        products = item['Products']
        for product in products:
            data_own_popular.append({
                'Brand': item['Brand'],
                'ProductName': product['Name'],
                'Category': product['Category'],
                'PositivePostCount': product['PositivePostCount'],
                'NegativePostCount': product['NegativePostCount']
            })
    
    if num_docs > 1:
        data_own_popular = json.loads(merge_own_reports(data_own_popular))
    
    return data_own_popular

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
    data_all_popular = get_all_popular(time_start, time_end)
    data_own_product = Response.get_json(get_own_product(brand_name))
    data_own_popular = get_own_popular(brand_name,time_start, time_end)

    data_own_product = data_own_product['data_own_product']

    product_to_produce = get_product_to_procude(data_all_popular, data_own_product)
    product_to_remove = get_product_to_remove(data_own_popular)

    return jsonify({"product_to_produce": product_to_produce, "product_to_remove": product_to_remove})

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

def get_sortByLowRank(product):
    sorted_data = product[::-1]

    return sorted_data

def get_sortByDifference(product):
    return sorted(product, key=lambda x: x["NegativePostCount"] - x["PositivePostCount"], reverse=True)

def get_sortByNegative(product):
    return sorted(product, key=lambda x: x["NegativePostCount"], reverse=True)

def get_product_to_remove(product):
    # get product that has the lowest rank_sum
    # rank_sum from index in sortByLowRank + sortByDifference sortByNegative

    # inisialize rank sum
    set_rank_zero(product)
    
    # summarize rank for each product
    get_rank_sum(product, get_sortByLowRank(product)) 
    get_rank_sum(product, get_sortByDifference(product))
    get_rank_sum(product, get_sortByNegative(product))

    # sort product by rank_sum ASC
    sorted_data = sorted(product, key=lambda x: x["rank_sum"])

    # return the top data
    return sorted_data[0]['ProductName']

def get_rank_sum(data_source, ranked_data):
    for item in data_source:
        for item2 in ranked_data:
            if item['ProductName'] == item2['ProductName']:
                item['rank_sum'] += ranked_data.index(item2)
                break
    return data_source

def set_rank_zero(data):
    for item in data:
        item['rank_sum']=0
    
    return data

def merge_own_reports(data):
    data_df = pd.DataFrame(data)
    merged_df = data_df.groupby('ProductName').agg({
        'Brand': 'first',
        'Category': 'first',
        'NegativePostCount': 'sum',
        'PositivePostCount': 'sum'
    }).reset_index()

    merged_df = merged_df.sort_values(by='PositivePostCount', ascending=False)

    merged_data = merged_df.to_json(orient='records')

    return merged_data

def merge_allBrand_reports(data):
    # combine field Brand and Category into Brand_Category
    for item in data:
        item['Brand_Category'] = item['Brand'] +' '+ item['Category']
    
    data_df = pd.DataFrame(data)
    merged_df = data_df.groupby('Brand_Category').agg({
        'Brand': 'first',
        'Category': 'first',
        'NegativePostCount': 'sum',
        'PositivePostCount': 'sum'
    }).reset_index()

    merged_df = merged_df.sort_values(by='PositivePostCount', ascending=False)

    merged_data = merged_df.to_json(orient='records')

    return merged_data