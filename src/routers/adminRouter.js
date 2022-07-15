
const express = require('express');
const debug = require('debug')('app:productsRouter');// debug instead of using console.log but the only diff it will print if we run only in debug mode 
const { MongoClient } = require('mongodb');
const adminRoute = express.Router();


const products=[
    {ID:1, Name:"Prod#1", Image:"images/Bitmap(1).png", Description:"Product#1 description."},
    {ID:2, Name:"Prod#2", Image:"images/Bitmap.png", Description:"Product#2 description."},
    {ID:3, Name:"Prod#3", Image:"images/Bitmap(1).png", Description:"Product#3 description."},
    {ID:4, Name:"Prod#4", Image:"images/Bitmap(1).png", Description:"Product#4 description."},
    {ID:5, Name:"Prod#5", Image:"images/Bitmap(1).png", Description:"Product#5 description."}
]

const users=[
    {ID:1,Name:"Sarah",Email:"sarah@gmail.com",Password:"$$$$"},
    {ID:2,Name:"Nour",Email:"Nour@gmail.com",Password:"$$$$"}
   
]
adminRoute.route('/').get((req, res) => {
    const url='mongodb+srv://Globomantics_user:o6VixuWWQ3odTlwt@globomantics.utgrsto.mongodb.net/?retryWrites=true&w=majority'

    const dbName = 'globomantics';
  
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
  
        const db = client.db(dbName);
  
        const Pord_response = await db.collection('products').insertMany(products);
        const User_response = await db.collection('users').insertMany(users);
        res.json({Pord_response,User_response});
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();
  });



module.exports = adminRoute;