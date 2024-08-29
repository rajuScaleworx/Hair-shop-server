import * as express from 'express';
import GuestController from '../controller/guestCartController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';
import { Request, Response, response } from 'express';

const guestController= new GuestController()

export const guestCartroute= express.Router()
const jsonparser=bodyParser.json()
guestCartroute.post('/addguestcart',jsonparser,guestController.addGuestCart)
guestCartroute.get('/getguestcart/:guestId',jsonparser,guestController.getguestcart)

// customerroute.get('/customer/:id',customerController.getCustomerByid)
