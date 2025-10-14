
import express from 'express';
import postRoutes from './routes/postRoutes.js';
import mongoose from 'mongoose';




const app = express(); //storing the object that we get while calling express js
const port = 5000;

mongoose.connect('mongodb+srv://bishnuthapaofkalika:first2020@cluster0.jv82y5f.mongodb.net/Social_Networking')
  .then(() => {
    app.listen(port, () => {
    console.log("database connected and server is running")
    });
  }).catch((err) => {
    console.log(err)
  })

app.use(express.json()); //middleware to access incoming JSON data


app.use(postRoutes);

