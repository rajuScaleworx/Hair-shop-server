import * as express from 'express';
import ProductCategoryController from '../controller/productCategoryController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const productCategoryController= new ProductCategoryController()

export const productcategoryroute= express.Router()
const jsonparser=bodyParser.json()
productcategoryroute.post('/product_type',jsonparser,authorized,productCategoryController.AddCategory)
productcategoryroute.delete('/product_type/:product_typeid',jsonparser,authorized,productCategoryController.RemoveCategory)
productcategoryroute.get('/product_type',productCategoryController.getallCategory);
