import * as express from 'express';
import RazerpayController from '../controller/razerpayController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const razerpayController= new RazerpayController()

export const razerpayroute= express.Router()
const jsonparser=bodyParser.json()
razerpayroute.post('/order',jsonparser,razerpayController.Order)
razerpayroute.post('/paymentsuccess',jsonparser,razerpayController.paymentsuccess)

// razerpayroute.delete('/size/:sizeid',jsonparser,authorized,sizeController.RemoveSize)
// razerpayroute.get('/size',sizeController.getallsize)
