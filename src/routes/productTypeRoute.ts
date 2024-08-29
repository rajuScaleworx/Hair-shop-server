import * as express from 'express';
import ProductTypeController from '../controller/productTypeController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const productTypeController= new ProductTypeController()

export const producttyperoute= express.Router()
const jsonparser=bodyParser.json()
producttyperoute.post('/product_type',jsonparser,authorized,productTypeController.AddProductType)
producttyperoute.delete('/product_type/:product_typeid',jsonparser,authorized,productTypeController.RemoveProductType)
producttyperoute.get('/product_type',productTypeController.getallProductType);
producttyperoute.post('/product_type_update',jsonparser,authorized,productTypeController.updateProductType);

