/** @format */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Linker',
    });
    console.log('connected to database');
  } catch (error) {
    console.log(error);
  }
};
