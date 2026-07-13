import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    
    name : String,
    email : String,
    password:String,
    groupId: {type:mongoose.Schema.ObjectId, ref:'group'},




})



export default mongoose.models.user || mongoose.model("user", UserSchema);