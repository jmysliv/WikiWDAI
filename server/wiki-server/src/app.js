// app.js
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import courseRouter from './routes/courses';
import userRouter from './routes/user';
import MongoClient from 'mongodb';
import mongoose from 'mongoose';
import authRouter from './auth/routes.config'
import meRouter from './me/me.routes'
import cors from 'cors'

mongoose.connect('mongodb://localhost/test', {useUnifiedTopology: true, useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected with mongo");
    
});

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use('/courses', courseRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/me', meRouter);

app.listen(4000, 'localhost', (e)=>{
    console.log('running');
    
});
export default app;