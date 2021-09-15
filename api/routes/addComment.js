  
const express = require('express')
const router=express.Router();
const mongoose=require('mongoose')
const comment=require('../model/comment')
const url=require("url");
const post=require('../model/story')

router.get("/:id",(req,res)=>{
  var pid=req.params.id;
  console.log(pid)

comment.find({parent:pid}).exec().then((docs)=>{
  if(docs.length>0)
  {
    res.status(200).json({
      status: "success",
      message: "comments Details",
      count: docs.length,
      data:docs,
    })
  }
  else{
    res.status(200).json({
      status: "success",
      message: "posts not found",
      count: 0,
      data: [],
    })
  }
})  
})

router.post("/",(req, res) => {
var maxid

    comment.findOne().sort({id:-1}).exec().then((data)=>{maxid=data.id;
    const newComment= new comment({
      _id: new mongoose.Types.ObjectId(),

      by: req.body.user,
      text:req.body.text,
      parent:req.body.parent,
      time:Date.now(),
      id:maxid+1
    });
    console.log("in")
    newComment
      .save()
      .then((result) => {
        post.update({id:req.body.parent},{$push:{kids:maxid+1}}).exec().then(doc=>console.log("GOT",doc)).catch(err=>console.log(err))
        console.log("Result: ", result);
        res.status(201).json([
          {
            status: "success",
            message: "Comment Added",
            data: [newComment],
          },
        ]);
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status=500
        res.json([
          {
            status: "failure",
            message: "unable to add Comment",
            error: err,
            data: [],
          },
        ]);
      })});
     
  });

  router.get("/", (req,res,err) => {
    console.log("in")
    comment.find()
      .exec()
      .then((docs) => {
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "Comment Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "Comment not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch comment detail",
            error: err,
            data: [],
          },
        );
      });
  });

  router.put("/", (req,res,err) => {
    console.log("in")
    cart.find()
      .exec()
      .then((docs) => {
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "Product Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "Product not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch product detail",
            error: err,
            data: [],
          },
        );
      });
  });
  
  module.exports=router;