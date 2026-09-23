import jwt from 'jsonwebtoken';import { config,isProduction } from './config.js';
export const COOKIE_NAME='arsos_admin';
export function issueToken(){return jwt.sign({role:'admin'},config.jwtSecret,{expiresIn:'8h',issuer:'arsos-api',audience:'arsos-admin'})}
export const cookieOptions={httpOnly:true,secure:isProduction,sameSite:'strict',maxAge:8*60*60*1000,path:'/'};
export const clearCookieOptions={httpOnly:true,secure:isProduction,sameSite:'strict',path:'/'};
export function requireAdmin(req,res,next){try{const token=req.cookies[COOKIE_NAME];if(!token)throw new Error('missing');req.admin=jwt.verify(token,config.jwtSecret,{issuer:'arsos-api',audience:'arsos-admin'});next()}catch{return res.status(401).json({message:'Authentication required.'})}}
