import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,lowercase:true,trim:true},phone:{type:String,default:''},company:{type:String,default:''},sector:{type:String,required:true,enum:['cleaning-items','chemical-business','it-services','hotel-supplies','general']},message:{type:String,required:true},status:{type:String,enum:['new','in-progress','resolved'],default:'new'}},{timestamps:true});
export const Enquiry=mongoose.models.Enquiry||mongoose.model('Enquiry',schema);
