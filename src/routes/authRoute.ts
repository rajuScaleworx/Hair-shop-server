import * as express from 'express';
import UserController from '../controller/authController';
import bodyParser from 'body-parser';
const userController= new UserController()

export const authroute= express.Router()
const jsonparser=bodyParser.json()
authroute.post('/signup',jsonparser,userController.Signup)
authroute.post('/login',jsonparser,userController.UserLogin)