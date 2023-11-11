from datetime import datetime
from functools import update_wrapper, wraps
from flask import (Flask, jsonify, make_response, request)
import fetch_db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def nocache(view):
    @wraps(view)
    def no_cache(*args, **kwargs):
        response = make_response(view(*args, **kwargs))
        response.headers["Last-Modified"] = datetime.now()
        response.headers[
            "Cache-Control"
        ] = "no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "-1"
        return response

    return update_wrapper(no_cache, view)

@app.route("/get_profile_account", methods=["POST"])
def get_profile():
    param = request.get_json()
    email = param['email']
    return fetch_db.get_profile(email)

@app.route("/get_own_product", methods=["POST"])
def get_own_product():
    param = request.get_json()
    brand_name = param['brand_name']
    
    return fetch_db.get_own_product(brand_name)

@app.route("/get_own_popular", methods=["POST"])
def get_own_popular():
    param = request.get_json()
    brand_name = param['brand_name']
    time_start = param['time_start']
    time_end = param['time_end']

    data_own_popular = fetch_db.get_own_popular(brand_name, time_start, time_end)
    data_own_popular = data_own_popular[:10]

    return jsonify({'data_own_popular': data_own_popular})

@app.route("/get_all_popular", methods=["POST"])
def get_all_popular():
    param = request.get_json()
    time_start = param['time_start']
    time_end = param['time_end']

    data_all_popular = fetch_db.get_all_popular(time_start, time_end)
    data_all_popular = data_all_popular[:10]
    
    return jsonify({'data_all_popular': data_all_popular})

@app.route("/get_recommendation", methods=["POST"])
@nocache
def get_recommendation():
    param = request.get_json()
    brand_name = param['brand_name']
    time_start = param['time_start']
    time_end = param['time_end']

    recommendation = fetch_db.get_recommendation(brand_name, time_start, time_end)

    return recommendation

@app.route("/login_validation", methods=["POST"])
def validate_account():
    param = request.get_json()
    email = param['email']
    password = param['password']
    
    validation_status = fetch_db.validate_account(email, password)

    return validation_status