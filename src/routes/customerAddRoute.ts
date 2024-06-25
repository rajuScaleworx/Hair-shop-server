
import * as express from 'express';
import CustomerAddController from '../controller/customeraddress';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const customerAddController= new CustomerAddController()

export const customeraddressroute= express.Router()
const jsonparser=bodyParser.json()
customeraddressroute.post('/addCustomeradd',jsonparser,customerAddController.AddCustomeraAddress);
customeraddressroute.get('/customeradd/:id',customerAddController.getCustomerAddressByuserId);
