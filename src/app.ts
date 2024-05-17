// src/app.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {routes} from './routes/index';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from 'passport';
import { initPassport } from "../src/passport.mw";
dotenv.config();
import '../src/passport.mw';
const app: Express = express();
const port = process.env.PORT ;
const dburl = process.env.MONGODB_URL
const uri: string =`${dburl}` 
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/",routes);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.authenticate("session"))
initPassport(app)
const connectdatabase=async()=>{
  // const uri: string =`${dburl}` 
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


