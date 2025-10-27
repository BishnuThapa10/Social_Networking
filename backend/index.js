
import express from 'express';
import postRoutes from './routes/postRoutes.js';
import userRoute from './routes/userRoutes.js';
import otherRoute from './routes/otherRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();


const app = express(); //storing the object that we get while calling express js
const port = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(port, () => {
    console.log("database connected and server is running")
    });
  }).catch((err) => {
    console.log(err)
  })

  // Parse JSON requests
app.use(express.json()); //middleware to access incoming JSON data

// To parse urlencoded/form-data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
  origin:[
    'http://localhost:5173'
  ],

  credentials: true,
  
}));



app.use(postRoutes);
app.use(userRoute);
app.use(otherRoute);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // This is a Joi validation error
    return res.status(400).json({
      message: err.error.details.map(d => d.message).join(", ")
    });
  }

  // Other errors
  console.error(err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

