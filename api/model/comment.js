
const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    by:String,
    kids:[Number],
    parent:Number,
    text:String,
    time:Number,
    id:Number
});

module.exports=mongoose.model("comments",commentSchema);

