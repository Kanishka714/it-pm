# vehicle-management.py

from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["fleetmind"]
vehicle_collection = db["vehicles"]

# Utility: Validate vehicle input
def validate_vehicle(data):
    required = ['vin', 'make', 'model']
    for field in required:
        if field not in data or not data[field]:
            return False, f"{field} is required"
    return True, ""

# Route 1: Add a new vehicle
@app.route('/vehicles', methods=['POST'])
def add_vehicle():
    data = request.json
    is_valid, msg = validate_vehicle(data)
    if not is_valid:
        return jsonify({"error": msg}), 400

    if vehicle_collection.find_one({"vin": data['vin']}):
        return jsonify({"error": "VIN already exists"}), 400

    vehicle = {
        "vin": data['vin'],
        "make": data['make'],
        "model": data['model'],
        "status": "Pending"
    }
    result = vehicle_collection.insert_one(vehicle)
    return jsonify({"message": "Vehicle added", "id": str(result.inserted_id)}), 201

# Route 2: Get all vehicles
@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = list(vehicle_collection.find())
    for v in vehicles:
        v['_id'] = str(v['_id'])
    return jsonify(vehicles), 200

# Route 3: Update vehicle
@app.route('/vehicles/<vin>', methods=['PUT'])
def update_vehicle(vin):
    data = request.json
    result = vehicle_collection.update_one({"vin": vin}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Vehicle not found"}), 404
    return jsonify({"message": "Vehicle updated"}), 200

# Route 4: Delete vehicle
@app.route('/vehicles/<vin>', methods=['DELETE'])
def delete_vehicle(vin):
    result = vehicle_collection.delete_one({"vin": vin})
    if result.deleted_count == 0:
        return jsonify({"error": "Vehicle not found"}), 404
    return jsonify({"message": "Vehicle deleted"}), 200

# Route 5: Get single vehicle by VIN
@app.route('/vehicles/<vin>', methods=['GET'])
def get_vehicle_by_vin(vin):
    vehicle = vehicle_collection.find_one({"vin": vin})
    if not vehicle:
        return jsonify({"error": "Vehicle not found"}), 404
    vehicle['_id'] = str(vehicle['_id'])
    return jsonify(vehicle), 200

if __name__ == '__main__':
    app.run(debug=True)
