
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    about:String,
    submit:[mongoose.Schema.ObjectId],
    karma:Number,
    created:Number,
  
});

module.exports=mongoose.model("user",userSchema);