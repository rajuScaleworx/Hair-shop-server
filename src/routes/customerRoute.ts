import * as express from 'express';
import CustomerController from '../controller/customerController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const customerController= new CustomerController()

export const customerroute= express.Router()
const jsonparser=bodyParser.json()
customerroute.post('/addCustomer',jsonparser,customerController.AddCustomer)
customerroute.get('/customer/:id',customerController.getCustomerByid)
