const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb://localhost:27017'; // Local MongoDB instance
const dbName = 'Station';
const collectionName = 'Station'; 

const xlsx = require('xlsx');
const fs = require('fs');

const data = require('./find_station.json'); // Assuming the file is named 'data.json' in the same directory
const e = require('cors');


// Read the Excel file
const workbook = xlsx.readFile('Gaspy_Sample_Data.xlsx');

// Assuming the first sheet contains the data
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// Define an empty array to store the results
const resultArray = [];
let count = 0;

async function insertDocuments(array) {
    const client = new MongoClient(uri);

    try {

        console.log(array);
        // Connect to the MongoDB cluster
        await client.connect();

        // Select the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert many documents
        const result = await collection.insertMany(array);

        console.log(`${result.insertedCount} documents were inserted.`);
        console.log('Inserted documents IDs:', result.insertedIds);
    } catch (error) {
        console.error('Error inserting documents:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}


for (let i = 0; i < jsonData.length; i++) {
    // const { name, fuel } = jsonData[i];
    let exists = resultArray.find(store => store.storeId === jsonData[i]["Station ID"]);

    if(jsonData[i]["Station ID"]!==889){
        //continue;
        //console.log(jsonData[i][`Station ID`], jsonData[i][`Datetime last seen`])
    }
    // console.log(exists)
    if (exists) {
      // If name already exists, push the fuel value to the fuel array
        exists.fuel.push({type: jsonData[i]["Fuel type_name"], price: jsonData[i]["Fuel Price"], dateTime: jsonData[i]["Datetime last seen"]});
    } else {
      // If name does not exist, create a new object and add it to the array

    const existArr = data.stations.find(store => store.name === jsonData[i]["Station Name"]);

    //const postcode = existArr?.postcode || '';
        
    if(typeof(existArr)!=='undefined'){

        resultArray.push({
            storeId:jsonData[i]["Station ID"],
            name: jsonData[i]["Station Name"], 
            address: jsonData[i]["Station Street"],
            suburb: jsonData[i]["Station Suburb"],
            city: jsonData[i]["Station City"],
            region: jsonData[i]["Station Region"],
            postcode: existArr.postcode,
            latitude: existArr.latitude,
            longitude: existArr.longitude,
            type: existArr.type,
            openingHours: existArr.openingHours,
            services: existArr.services,
            fuel: [{type: jsonData[i]["Fuel type_name"], price: jsonData[i]["Fuel Price"]}]
        });

    }  
}

    // Increment the count
    count++;
    // Break the loop once the count reaches 5
    // if (count === 100) {
    //     break;
    // }
}

// Function to get the latest entry for each type
const getLatestEntries = (array) => {
    const latestMap = new Map();

    // biome-ignore lint/complexity/noForEach: <explanation>
    array.forEach(entry => {

        if (entry.dateTime) {
            const currentEntry = latestMap.get(entry.type);
            if (!currentEntry || entry.dateTime > currentEntry.dateTime) {
                latestMap.set(entry.type, entry);
            }
        }
    });

    return Array.from(latestMap.values());
};

    // Get the latest entries
    for (let i = 0; i < resultArray.length; i++) {

        const latestEntries = getLatestEntries(resultArray[i].fuel);
        resultArray[i].fuel = latestEntries;
    }

// Log the result array to verify
//console.log(resultArray);
insertDocuments(resultArray)