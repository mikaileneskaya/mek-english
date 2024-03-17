import User from './models/userModel.js'; 
import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import cookieParser from 'cookie-parser';
import pageRoute from './routes/pageRoute.js';
import userRoute from './routes/userRoute.js';
import englishRoute from './routes/englishRoute.js';
import { checkUser } from './middlewares/authMiddleware.js';
import say from 'say';

dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

//connection to the DB
conn();

const app = express();
const port = process.env.PORT;

//ejs template engine
app.set('view engine', 'ejs');

//static files middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('*', checkUser);
app.use('/', pageRoute);
app.use('/english', englishRoute);
app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});