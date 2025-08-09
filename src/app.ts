import express from 'express';
import dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());


export default app;