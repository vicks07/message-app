const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient,ObjectId} = require('mongodb');
const moment = require('moment');
const app = express();
const path = require('path');

//console.log(new Date());

const config = require('./config/config.js');
const user = require('./services/user.js');
const message = require('./services/message.js');

app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI;

MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
    if(err){
    console.log('Could Not Connect to MongoDB',err);

    }
    else{
        console.log('Connected to MongoDB');
    }
});



app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}`);
});

app.use('/user',user);
app.use('/message',message);
//console.log(path.join(__dirname, "./public"));
app.use(express.static(path.join(__dirname, "public")));

// app.patch('/modify/user',(req,res)=>{    
//     MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
//         if(err){
//             return res.json({
//                 data:err,   
//                 status:'Error'
//             });
//         }
//         let db = client.db('message-app');
//         db.collection('user').updateOne({_id:ObjectID(req.body.userId)},{$set:{name:req.body.name,email:req.body.email}}).then((result)=>{
//             return res.status(200).json({
//                 data:result,
//                 status:'OK'
//             });
//         }).catch(err=> res.json({
//             data:err,
//             status:'Error'
//         }));
//     });
// });



// app.post('/create/user',(req,res)=>{    
//     MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
//         if(err){
//             return res.json({
//                 data:err,   
//                 status:'Error'
//             });
//         }
//         let db = client.db('message-app');
//         db.collection('user').insertOne({name:req.body.name,email:req.body.email}).then((result)=>{
//             return res.status(200).json({
//                 data:result,
//                 status:'OK'
//             });
//         }).catch(err=> res.json({
//             data:err,
//             status:'Error'
//         }));
//     });
// });


// app.post('/create/conversation',(req,res)=>{
//     MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
//         if(err){
//             return res.json({
//                 data:err,   
//                 status:'Error'
//             });
//         }
//         let db = client.db('message-app');
//         let part = [];
//         req.body.participants.forEach((doc)=>{
//             part.push(ObjectId(doc));
//             //console.log(ObjectId(doc))
//         });
//         let currentDateTime = new Date();
//         req.body.conversation.from = ObjectId(req.body.conversation.from);
//         req.body.conversation.time = currentDateTime
//         req.body.status = 'New';
//         //console.log(req.body.conversation);
//         db.collection('messages').insertOne({messages:[req.body.conversation],participants:part,lastUpdate:currentDateTime}).then((result)=>{
//             return res.status(200).json({
//                 data:result,
//                 status:'OK'
//             });
//         }).catch(err=> res.json({
//             data:err,
//             status:'Error'
//         }));
//     });
// });

// app.patch('/update/conversation',(req,res)=>{
//     MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
//         if(err){
//             return res.json({
//                 data:err,   
//                 status:'Error'
//             });
//         }
//         let db = client.db('message-app');
//         let part = [];    
//         let currentDateTime = new Date();   
//         req.body.conversation.from = ObjectId(req.body.conversation.from);
//         req.body.conversation.time = currentDateTime;
//         req.body.status = 'New';
//         //console.log(req.body.conversation);
//         let addToSet = db.collection('messages').updateOne({_id:ObjectId(req.body.conversationId)},{"$addToSet":{"messages":req.body.conversation}});
//         let set = db.collection('messages').updateOne({_id:ObjectId(req.body.conversationId)},{"$set":{"lastUpdate":currentDateTime}});

//         Promise.all([set,addToSet]).then((result)=>{
//             return res.status(200).json({
//                         data:result,
//                         status:'OK'
//                     });
//                 }).catch(err=> res.json({
//                     data:err,
//                     status:'Error'
//                 }));
//     });
// });

// app.post('/read/message/',(req,res)=>{
//     MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
//         if(err){
//             return res.json({
//                 data:err,   
//                 status:'Error'
//             });
//         }
//         let db = client.db('message-app');
//         db.collection('messages').find({participants:ObjectId(req.body.userId)}).sort({lastUpdate:-1}).toArray().then((result)=>{

//             let newMessage = result.map((doc,index)=>{
//                     return ({conversationId:doc._id,lastMessage:doc.messages[doc.messages.length-1],participants:doc.participants});
//             })
//             return res.status(200).json({
//                 data:newMessage,
//                 status:'OK'
//             });
//         }).catch(err=> res.json({
//             data:err,
//             status:'Error'
//         }));
//     });
// });

// app.get('/read/conversation/:conversationId',(req,res)=>{
//     //console.log(req.params.conversationId);
//     MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
//         if(err){
//             return res.json({
//                 data:err,   
//                 status:'Error'
//             });
//         }
//         let db = client.db('message-app');
//         db.collection('messages').find({_id:ObjectId(req.params.conversationId)}).toArray().then((result)=>{
//             return res.status(200).json({
//                 data:result,
//                 status:'OK'
//             });
//         }).catch(err=> res.json({
//             data:err,
//             status:'Error'
//         }));
//     });
// });

// app.patch('/update/status',(req,res)=>{
//     MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
//         if(err){
//             return res.json({
//                 data:err,   
//                 status:'Error'
//             });
//         }
//         let db = client.db('message-app'); 
//         db.collection('messages').updateOne({_id:ObjectId(req.body.conversationId),"messages.time":new Date(req.body.date)},{$set:{"messages.$.status":"Read"}}).then((result)=>{

//             return res.status(200).json({
//                     data:result,
//                     status:'OK'
//                 });
//             }).catch(err=> res.json({
//                 data:err,
//                 status:'Error'
//         }));         
//     });
// });

// app.post('/read/user',(req,res)=>{
//     MongoClient.connect(mongoURI,{useNewUrlParser:true},(err,client)=>{
//         if(err){
//             return res.json({
//                 data:err,   
//                 status:'Error'
//             });
//         }
//         let part = [];
//         req.body.userId.forEach((doc)=>{
//             part.push(ObjectId(doc));            
//         });        
//         let db = client.db('message-app');
//         db.collection('user').find({_id:{$in:part}}).toArray().then((result)=>{            
//             return res.status(200).json({
//                 data:result,
//                 status:'OK'
//             });
//         }).catch(err=> res.json({
//             data:err,
//             status:'Error'
//         }));
//     });
// });