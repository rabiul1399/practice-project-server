const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

//Middelwere
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.799dk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        await client.connect();

        const productcollection = client.db("project_data").collection("product");


        app.get('/product',async(req, res) =>{
            const result = await productcollection.find().toArray()
            res.send(result)        
        });

   

    } 
    finally{
    
    }
}

run().catch(console.dir);;

app.get('/',(req,res) =>{
    res.send('Hello World!')
});


  
  app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
  })