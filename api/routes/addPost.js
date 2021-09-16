  
const express = require('express')
const router=express.Router();
const mongoose=require('mongoose');
const posts=require('../model/story')
const url1=require("url");

router.get("/:id",(req,res)=>{
  var pid=req.params.id;
  console.log("in")
  console.log(pid)

posts.find({id:pid}).exec().then((docs)=>{
  if(docs.length>0)
  {
    res.status(200).json({
      status: "success",
      message: "posts Details",
      count: docs.length,
      data:docs,
    })
  }
  else{
    res.status(200).json([{
      status: "success",
      message: "posts not found",
      count: 0,
      data: [],
    }])
  }
})  
})

router.post("/",(req, res) => {
    var maxid;
    posts.findOne().sort({id:-1}).exec().then((data)=>{maxid=data.id
    console.log(maxid)
    const newposts= new posts({
      _id: new mongoose.Types.ObjectId(),
      by:req.body.user,
      kids:[],
      score:0,
      title:req.body.title,
      time:Date.now(),
      url:req.body.url,
      id:maxid+1
    });
    console.log("in")
    newposts
      .save()
      .then((result) => {
        console.log("Result: ", result);
        res.status(201).json(
          {
            status: "success",
            message: "posts Added",
            data: [newposts],
          },
        );
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status=500
        res.json([
          {
            status: "failure",
            message: "unable to add posts",
            error: err,
            data: [],
          },
        ]);
      }) });
  });

  router.get("/", (req,res,err) => {
    console.log("in")
    posts.find()
      .sort({score:-1})
      .exec()
      .then((docs) => {
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "posts Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "posts not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch posts detail",
            error: err,
            data: [],
          },
        );
      });
  });

  router.put("/", (req,res,err) => {
    console.log(req.body.score)
    var id1=req.body.id;
    var user=req.body.user
    var score=req.body.score
    //vote length is enough for count
    posts.updateOne({id:id1},{$push:{vote:user}})
      .exec()
      .then((docs) => {
        posts.updateOne({id:id1},{score:score}).exec().then((docs)=>{
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "posts Details",
            count: docs.length,
            data:docs
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "posts not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch posts detail",
            error: err,
            data: [],
          },
        );
      });
  }).catch(err=>{
    res.status(500).json(
      {
        status: "failure",
        message: "unable to fetch posts detail",
        error: err,
        data: [],
      })
  });
})

router.patch("/", (req,res,err) => {
  console.log(req.body.score)
  var id1=req.body.id;
  var user=req.body.user
  var score=req.body.score
  //vote length is enough for count
  posts.updateOne({id:id1},{$pull:{vote:user}})
    .exec()
    .then((docs) => {
      posts.updateOne({id:id1},{score:score}).exec().then((docs)=>{
      console.log(docs);
      if (docs.length > 0) {
        res.status(200).json({
          status: "success",
          message: "posts Details",
          count: docs.length,
          data:docs
          
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "posts not found",
          count: 0,
          data: [],
        });
      }
    })
    .catch((err) => {
      res.status(500).json(
        {
          status: "failure",
          message: "unable to fetch posts detail",
          error: err,
          data: [],
        },
      );
    });
}).catch(err=>{
  res.status(500).json(
    {
      status: "failure",
      message: "unable to fetch posts detail",
      error: err,
      data: [],
    })
});
})
  
 
  module.exports=router;