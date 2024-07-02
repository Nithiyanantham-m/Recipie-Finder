const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5001;

const uri = 'mongodb://localhost:27017';
const dbName = 'ipLab';

app.use(cors());
app.use(bodyParser.json());

let db;

async function connect() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect();

app.post('/addFav', async (req, res) => {
  const { favs } = req.body;

  try {
    const usersCollection = db.collection('recipe');
    const existingFav = await usersCollection.findOne({ 'favs.label': favs.label });

    if (existingFav) {
      res.status(201).json({ message: 'Already added' });
    } else {
      await usersCollection.insertOne({ favs });
      res.status(201).json({ message: 'Added successfully' });
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
