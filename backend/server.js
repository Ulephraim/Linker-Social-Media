/** @format */

import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './data/database.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './Routers/userRouter.js';
import postRouter from './Routers/postRouter.js';
import followRouter from './Routers/followRouter.js';
import cloudinary from 'cloudinary';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

const corsOptions = {
  origin: ['https://linker-frontend.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

app.use(cookieParser());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/follow', followRouter);

app.get('/', (req, res) => {
  res.send('Server is working fine');
});

connectToDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
