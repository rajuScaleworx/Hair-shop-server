import * as express from 'express';
import ColorController from '../controller/colorController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const colorController= new ColorController()

export const colorroute= express.Router()
const jsonparser=bodyParser.json()
colorroute.post('/color',jsonparser,authorized,colorController.AddColor)
colorroute.delete('/color/:colorid',jsonparser,authorized,colorController.RemoveColor)
colorroute.get('/color',colorController.getallcolor)
colorroute.post('/color_update',jsonparser,authorized,colorController.updateColor);
