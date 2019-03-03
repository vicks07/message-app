const express = require('express');
const router = express.Router();
const {MongoClient,ObjectId} = require('mongodb');

const mongoURI = process.env.MONGODB_URI;

router.post('/create/conversation',()=>{
    MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
        if(err){
            return res.json({
                data:err,   
                status:'Error'
            });
        }
        let db = client.db('message-app');
        let part = [];
        req.body.participants.forEach((doc)=>{
            part.push(ObjectId(doc));
            //console.log(ObjectId(doc))
        });
        let currentDateTime = new Date();
        req.body.conversation.from = ObjectId(req.body.conversation.from);
        req.body.conversation.time = currentDateTime
        req.body.status = 'New';
        //console.log(req.body.conversation);
        db.collection('messages').insertOne({messages:[req.body.conversation],participants:part,lastUpdate:currentDateTime}).then((result)=>{
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

router.patch('/update/conversation',()=>{
    MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
        if(err){
            return res.json({
                data:err,   
                status:'Error'
            });
        }
        let db = client.db('message-app');
        let part = [];    
        let currentDateTime = new Date();   
        req.body.conversation.from = ObjectId(req.body.conversation.from);
        req.body.conversation.time = currentDateTime;
        req.body.status = 'New';
        //console.log(req.body.conversation);
        let addToSet = db.collection('messages').updateOne({_id:ObjectId(req.body.conversationId)},{"$addToSet":{"messages":req.body.conversation}});
        let set = db.collection('messages').updateOne({_id:ObjectId(req.body.conversationId)},{"$set":{"lastUpdate":currentDateTime}});

        Promise.all([set,addToSet]).then((result)=>{
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
        let db = client.db('message-app');
        db.collection('messages').find({participants:ObjectId(req.body.userId)}).sort({lastUpdate:-1}).toArray().then((result)=>{

            let newMessage = result.map((doc,index)=>{
                    return ({conversationId:doc._id,lastMessage:doc.messages[doc.messages.length-1],participants:doc.participants});
            })
            return res.status(200).json({
                data:newMessage,
                status:'OK'
            });
        }).catch(err=> res.json({
            data:err,
            status:'Error'
        }));
    });
});

router.get('/read/conversation/:conversationId',()=>{
    MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
        if(err){
            return res.json({
                data:err,   
                status:'Error'
            });
        }
        let db = client.db('message-app');
        db.collection('messages').find({_id:ObjectId(req.params.conversationId)}).toArray().then((result)=>{
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

router.patch('/update/status/conversation',()=>{
    MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
        if(err){
            return res.json({
                data:err,   
                status:'Error'
            });
        }
        let db = client.db('message-app'); 
        db.collection('messages').updateOne({_id:ObjectId(req.body.conversationId),"messages.time":new Date(req.body.date)},{$set:{"messages.$.status":"Read"}}).then((result)=>{

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