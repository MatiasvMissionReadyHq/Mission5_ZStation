import json
from pymongo import MongoClient


""" Database """
client = MongoClient('mongodb://localhost:27017/')
db = client['Station']
collection = db['Station']


""" Read json file """
file_path = "./find_station.json"

with open(file_path, 'r') as file:
    data = json.load(file)

stations_array = data.get('stations', [])
array_to_mongodb = []

for station in stations_array:

    data_to_mongodb = {
        "name": station['name'],
        "address": station['address'],
        "suburb": station['suburb'],
        "city": station['city'],
        "postcode": station['postcode'],
        "latitude": station['latitude'],
        "longitude": station['longitude'],
        "type": station['type'],
        "openingHours": station['openingHours'],
        "special_fuel_Type": station['fuels'],
        "services": station['services']
    }
    
    array_to_mongodb.append(data_to_mongodb)

collection.insert_many(array_to_mongodb)
client.close()