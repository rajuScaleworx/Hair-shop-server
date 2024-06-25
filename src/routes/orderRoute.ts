import * as express from 'express';
import OrderController from '../controller/OrderController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const orderController= new OrderController()

export const orderroute= express.Router()
const jsonparser=bodyParser.json()
orderroute.get('/orderlist/:userid',orderController.OrderList)
// lengthroute.delete('/length/:lengthid',jsonparser,authorized,lengthController.RemoveLength)
// lengthroute.get('/length',lengthController.getalllength)
