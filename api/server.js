const express = require("express")
var mongoClient = require("mongodb").MongoClient
var cors = require("cors")
const multer = require("multer")
const app = express()
app.use(cors())

var CONNECTION_STRING = "mongodb+srv://robo:ugqRPrjJ9nX7N52@clusternodetest.kzecatu.mongodb.net/?retryWrites=true&w=majority";
var DATABASE_NAME = "nodetest"
var database

app.listen(3001, ()=> {
  mongoClient.connect(CONNECTION_STRING,(error,client)=> {
    database = client.db(DATABASE_NAME)
    console.log("Connection to MongoDB is successful")
  });
})

app.get('/',(req, res)=>{
  res.send("API is running on this port")
})

app.get('/api/users',(req, res)=>{
  database.collection("userdata").find({}).toArray((error, result)=>{
    res.send(result)
  });
})

app.post('/api/adduser', multer().none(),(req, res)=>{
    database.collection("userdata").insertOne({
      name:req.body.name,
      age:req.body.age,
      sex:req.body.sex,
      country:req.body.country
    });
    res.json("Success")
})