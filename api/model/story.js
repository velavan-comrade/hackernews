
const mongoose=require('mongoose');

const storySchema=mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    by:String,
    kids:[Number],
    score:Number,
    title:String,
    time:Number,
    url:String,
    id:Number,
    vote:[String]
});

module.exports=mongoose.model("story",storySchema);



