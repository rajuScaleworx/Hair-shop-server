import * as express from 'express';
import LengthController from '../controller/lengthController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const lengthController= new LengthController()

export const lengthroute= express.Router()
const jsonparser=bodyParser.json()
lengthroute.post('/length',jsonparser,authorized,lengthController.AddLength)
lengthroute.delete('/length/:lengthid',jsonparser,authorized,lengthController.RemoveLength)
lengthroute.get('/length',lengthController.getalllength)
