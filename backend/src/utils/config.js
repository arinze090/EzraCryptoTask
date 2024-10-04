import dotenv from 'dotenv';

dotenv.config();
const config = {
  NODE_ENV: process.env.NODE_ENV,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
