import mongoose from "mongoose";



const GroupSchema = mongoose.Schema({
    GroupName: String,
    createdBy: { type: mongoose.Schema.ObjectId, ref: "user" },
    members: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
    mealPlanId: { type: mongoose.Schema.ObjectId, ref: "mealPlan" },
    joinCode: {type:Math.floor(Math.random()*100000), unique:true},






}
)



export default mongoose.models.group || mongoose.model("group", GroupSchema);

