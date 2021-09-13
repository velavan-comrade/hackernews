  
const express = require('express')
const router=express.Router();
const mongoose=require('mongoose');
const user=require('../model/user')
const url1=require("url");

router.post("/",(req, res) => {

    console.log(req)
    const newuser= new user({
      _id: new mongoose.Types.ObjectId(),
      user: req.body.user,
      items:req.body.id,
      price:req.body.price,
      quantity:req.body.quantity,
      status:"cart"
    });
    console.log("in")
    newCart
      .save()
      .then((result) => {
        console.log("Result: ", result);
        res.status(201).json([
          {
            status: "success",
            message: "User Added",
            data: [newuser],
          },
        ]);
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status=500
        res.json([
          {
            status: "failure",
            message: "unable to add User",
            error: err,
            data: [],
          },
        ]);
      });
  });

  router.get("/", (req,res,err) => {
    console.log("in")
    user.find()
      .exec()
      .then((docs) => {
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "user Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "user not found",
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

  router.put("/", (req,res,err) => {
    console.log("in")
    cart.find()
      .exec()
      .then((docs) => {
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "User Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "user not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch user detail",
            error: err,
            data: [],
          },
        );
      });
  });
  
  module.exports=router;