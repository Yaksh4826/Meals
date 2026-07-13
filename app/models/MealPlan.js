import mongoose from "mongoose";

export function getWeekStartDate(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  // Convert Sunday (0) to 7 to make Monday the start
  const diff = d.getDate() - (day === 0 ? 7 : day) + 1;

  return new Date(d.setDate(diff));
}



const MealPlanSchema = mongoose.Schema({

    weekStartDate : {type:Date, default: getWeekStartDate()},
    days: {type:[{
        meal:{type:String},
        date:{type:Date, required:true}

    }], validate:{
        validator:function(val){
         return val.length<=7
        },
        message:"Meals are only limited to 7"
    }}
    ,groupId: {type:mongoose.Schema.ObjectId, ref:"group"}





});


export default mongoose.models.mealPlan || mongoose.model('mealPlan', MealPlanSchema);




