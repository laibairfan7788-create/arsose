import { z } from 'zod';
const cleanText=(min,max)=>z.string().trim().min(min).max(max).transform(v=>v.replace(/[<>]/g,''));
export const enquirySchema=z.object({name:cleanText(2,100),email:z.email().max(180).transform(v=>v.toLowerCase()),phone:z.string().trim().max(40).regex(/^[0-9+()\-\s.]*$/,'Invalid phone format').optional().default(''),company:cleanText(0,120).optional().default(''),sector:z.enum(['cleaning-items','chemical-business','it-services','hotel-supplies','general']),message:cleanText(20,2000),website:z.string().max(200).optional().default('')});
export const loginSchema=z.object({email:z.email().max(180).transform(v=>v.toLowerCase()),password:z.string().min(12).max(200)});
export const statusSchema=z.object({status:z.enum(['new','in-progress','resolved'])});
export function validate(schema){return(req,res,next)=>{const result=schema.safeParse(req.body);if(!result.success)return res.status(400).json({message:'Please check the highlighted information.',errors:result.error.issues.map(i=>({field:i.path.join('.'),message:i.message}))});req.validated=result.data;next()}}
