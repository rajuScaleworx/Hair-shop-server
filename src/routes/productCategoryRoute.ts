import * as express from 'express';
import ProductCategoryController from '../controller/productCategoryController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const productCategoryController= new ProductCategoryController()

export const productcategoryroute= express.Router()
const jsonparser=bodyParser.json()
productcategoryroute.post('/product_category',jsonparser,authorized,productCategoryController.AddCategory)
productcategoryroute.delete('/product_category/:categoryid',jsonparser,authorized,productCategoryController.RemoveCategory)
productcategoryroute.get('/product_category',productCategoryController.getallCategory);
productcategoryroute.post('/product_category_update',jsonparser,authorized,productCategoryController.updateProductCategory);
