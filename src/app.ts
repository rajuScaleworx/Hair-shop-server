// src/app.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {routes} from './routes/index';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport, { session } from 'passport';
import { initPassport } from "../src/passport.mw";
import cors from 'cors';
dotenv.config();
import '../src/passport.mw';
const app: Express = express();
const port = process.env.PORT ;
const dburl = process.env.MONGODB_URL
const uri: string =`${dburl}` 
// app.use(bodyParser.urlencoded({extended: true}));
console.log(uri)
app.use(
  cors({
    credentials:true,
    origin: ["http://localhost:3000","http://localhost:3000/"],maxAge:84600
  })
)
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/",routes);
// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.authenticate("session"))
app.use(bodyParser.urlencoded({
  extended:true,
  limit:"25mb"
}))
app.use(require('express-session')({ 
  secret: 'hdjhiuhiudehuieyiueyiuewyiuewiu',
  resave: false,
  saveUninitialized: false
}));

initPassport(app)
const connectdatabase=async()=>{
  // const uri: string =`${dburl}` 
  console.log(uri)
  const clientoptions: object = {
    serverApi:{version:"1",strict:true,deprecationErrors:true}
  }
  await mongoose.connect(uri,clientoptions)
  await mongoose.connection.db.admin().command({ping:1})
 
  console.log("connected to database");

}

app.listen(port, () => {
  console.log(uri)
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
connectdatabase()


