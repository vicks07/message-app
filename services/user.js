const express = require('express');
const router = express.Router();
const {MongoClient,ObjectId} = require('mongodb');


const mongoURI = process.env.MONGODB_URI;
// /user/modify -> Modify User Details
router.patch('/modify/',()=>{
    console.log('Here');
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
    });
});

// /user/create -> Create a New User
router.post('/create',()=>{
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
    });
});

router.post('/read',()=>{
    MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
        if(err){
            return res.json({
                data:err,   
                status:'Error'
            });
        }
        let part = [];
        req.body.userId.forEach((doc)=>{
            part.push(ObjectId(doc));            
        });        
        let db = client.db('message-app');
        db.collection('user').find({_id:{$in:part}}).toArray().then((result)=>{            
            return res.status(200).json({
                data:result,
                status:'OK'
            });
        }).catch(err=> res.json({
            data:err,
            status:'Error'
        }));
    });
});



module.exports = router;