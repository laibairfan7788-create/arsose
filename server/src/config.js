import 'dotenv/config';
export const config={env:process.env.NODE_ENV||'development',port:Number(process.env.PORT)||5000,mongoUri:process.env.MONGODB_URI||'',clientOrigin:process.env.CLIENT_ORIGIN||'http://localhost:5173',adminEmail:(process.env.ADMIN_EMAIL||'').toLowerCase(),adminHash:process.env.ADMIN_PASSWORD_HASH||'',jwtSecret:process.env.JWT_SECRET||'development-only-secret-change-before-deploy'};
export const isProduction=config.env==='production';
