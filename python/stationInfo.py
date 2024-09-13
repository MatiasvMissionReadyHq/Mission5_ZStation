import json
import pandas as pd
from pymongo import MongoClient


""" Database """
mongo_uri = 'mongodb://localhost:27017/'
db_name = 'Station'
collection_name = 'Station'
client = MongoClient(mongo_uri)
db = client[db_name]
collection = db[collection_name ]


""" Read xlsx file """
file_path_xlsx = './Gaspy_Sample_Data.xlsx'

df = pd.read_excel(file_path_xlsx)

data_from_xlsx = df.to_dict(orient='records')


""" Read json file """
file_path = "./find_station.json"

with open(file_path, 'r') as file:
    data = json.load(file)

stations_array = data.get('stations', [])


fuel_price_mapping = {record['Station Name']: record['Fuel Price'] for record in data_from_xlsx}
array_to_mongodb = []

for station in stations_array:
    name = station.get('name')

    data_to_mongodb = {
        "name": name,
        "address": station.get('address'),
        "suburb": station.get('suburb'),
        "city": station.get('city'),
        "region": station.get('region'),
        "postcode": station.get('postcode'),
        "latitude": station.get('latitude'),
        "longitude": station.get('longitude'),
        "type": station.get('type'),
        "openingHours": station.get('openingHours'),
        "special_fuel_Type": station.get('fuels'),
        "services": station.get('services'),
        "fuelPrice": fuel_price_mapping.get(name, [])
    }
    
    array_to_mongodb.append(data_to_mongodb)

collection.insert_many(array_to_mongodb)
client.close()