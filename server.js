const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient,ObjectID} = require('mongodb');
const app = express();

const config = require('./config/config.js');

app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI;

MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
    console.log('Connected to MongoDB');
})



app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}`);
});


app.patch('/modify/user',(req,res)=>{    
    MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
        if(err){
            return res.json({
                data:err,   
                status:'Error'
            });
        }
        let db = client.db('message-app');
        db.collection('user').updateOne({_id:ObjectID(req.body.userId)},{$set:{name:req.body.name,email:req.body.email}}).then((result)=>{
            return res.status(200).json({
                data:result,
                status:'OK'
            });
        }).catch(err=> res.json({
            data:err,
            status:'Error'
        }));
    })
});



app.post('/create/user',(req,res)=>{    
    MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
        if(err){
            return res.json({
                data:err,   
                status:'Error'
            });
        }
        let db = client.db('message-app');
        db.collection('user').insertOne({name:req.body.name,email:req.body.email}).then((result)=>{
            return res.status(200).json({
                data:result,
                status:'OK'
            });
        }).catch(err=> res.json({
            data:err,
            status:'Error'
        }));
    })
});




app.get('/read/user:id',(req,res)=>{

});