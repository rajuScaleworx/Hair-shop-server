import * as express from 'express';
import ProductController from '../controller/productController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const productController= new ProductController()

export const productroute= express.Router()
const jsonparser=bodyParser.json();
productroute.post('/product',jsonparser,authorized,productController.AddProduct)
// productroute.delete('/product_category/:product_typeid',jsonparser,authorized,productCategoryController.RemoveCategory)
productroute.get('/product/:id',productController.ProductDetailbyId);
productroute.get('/productlist/:type',productController.ProductListbytype);
productroute.post('/productlistbymultiid',jsonparser,productController.ProductDetailBymultiId);