const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());







// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.fkw47.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fkw47.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const ShopCardCollection = client.db('Star_Sport').collection('cards');
    const selectedTutorCollection = client.db('Learn_Langauge').collection('selected_Tutor');



    // post show cart data

    app.post('/cards', async (req, res) => {
        const cards = req.body;
        const result = await ShopCardCollection.insertOne(cards)
        res.send(result);
      })

    //   get sop product

    app.get('/cards', async (req, res) => {
        const email = req.query.email;
        let query = {};
        if (email) {
          query = { email: email };
        }
        

        const result = await ShopCardCollection.find(query).toArray();
        res.send(result);
      });


  
  
  
  



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Star Sport is sitting')
  })
  
  app.listen(port, () => {
    console.log(`Star Sport is sitting on port ${port}`);
  })

