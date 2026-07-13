import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";









const GroupSchema = mongoose.Schema({
    name: String,
    createdBy: { type: mongoose.Schema.ObjectId, ref: "user" },
    members: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
    mealPlanId: { type: mongoose.Schema.ObjectId, ref: "mealPlan" },
    joinCode: {type:Math.floor(Math.random()*100000), unique:true},






})



export default mongoose.models.group || mongoose.model("group", GroupSchema);

