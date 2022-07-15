const { ObjectID } = require('bson');
const express = require('express');
const debug = require('debug')('app:productsRouter');// debug instead of using console.log but the only diff it will print if we run only in debug mode 
const { MongoClient } = require('mongodb');

const productsRoute = express.Router();




productsRoute.route('/')
.get((req,res)=>{

    const url='mongodb+srv://Globomantics_user:o6VixuWWQ3odTlwt@globomantics.utgrsto.mongodb.net/?retryWrites=true&w=majority'

    const dbName = 'globomantics';
  
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
  
        const db = client.db(dbName);
  
        const Pords_response = await db.collection('products').find().toArray();
        
        res.render('products',{products:Pords_response });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();

    
})


productsRoute.route('/:id')
.get((req,res)=>{
    const prodID= req.params.id
    const url='mongodb+srv://Globomantics_user:o6VixuWWQ3odTlwt@globomantics.utgrsto.mongodb.net/?retryWrites=true&w=majority'

    const dbName = 'globomantics';
 

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
  
        const db = client.db(dbName);
  
        const product = await db.collection('products').findOne( {_id:new ObjectID(prodID)});
        
        res.render('product',{product:
            product
             })
                  } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();


    
    
})


module.exports = productsRoute;