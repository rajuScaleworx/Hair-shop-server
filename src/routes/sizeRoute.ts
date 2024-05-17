import * as express from 'express';
import SizeController from '../controller/sizeController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const sizeController= new SizeController()

export const sizeroute= express.Router()
const jsonparser=bodyParser.json()
sizeroute.post('/size',jsonparser,authorized,sizeController.AddSize)
sizeroute.delete('/size/:sizeid',jsonparser,authorized,sizeController.RemoveSize)
sizeroute.get('/size',sizeController.getallsize)
