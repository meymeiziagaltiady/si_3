from flask import (Flask, jsonify, request)
import fetch_db

app = Flask(__name__)

@app.route("/get_profile_account", methods=["GET"])
def get_profile():
    param = request.get_json()
    email = param['email']
    return fetch_db.get_profile(email)

@app.route("/get_own_product", methods=["GET"])
def get_own_product():
    param = request.get_json()
    brand_name = param['brand_name']
    
    return fetch_db.get_own_product(brand_name)

@app.route("/get_own_popular", methods=["GET"])
def get_own_popular():
    param = request.get_json()
    brand_name = param['brand_name']
    time_start = param['time_start']
    time_end = param['time_end']

    return fetch_db.get_own_popular(brand_name, time_start, time_end)

@app.route("/get_all_popular", methods=["GET"])
def get_all_popular():
    param = request.get_json()
    time_start = param['time_start']
    time_end = param['time_end']

    return fetch_db.get_all_popular(time_start, time_end)

@app.route("/get_recommendation", methods=["GET"])
def get_recommendation():
    param = request.get_json()
    brand_name = param['brand_name']
    time_start = param['time_start']
    time_end = param['time_end']

    recommendation = fetch_db.get_recommendation(brand_name, time_start, time_end)

    # baru jd yg disarankan untuk diproduksi
    return recommendation

@app.route("/login_validation", methods=["GET"])
def validate_account():
    param = request.get_json()
    email = param['email']
    password = param['password']
    
    validation_status = fetch_db.validate_account(email, password)

    return validation_status