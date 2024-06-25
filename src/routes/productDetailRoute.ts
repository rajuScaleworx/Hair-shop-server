import * as express from 'express';
import ProductDetailController from '../controller/ProductDetailController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';
import upload from '../helper/multer';

const productDetailController= new ProductDetailController()

export const productDetailroute= express.Router()
const jsonparser=bodyParser.json();
productDetailroute.post('/productdetail',jsonparser,authorized,productDetailController.AddProductDetail)
// productroute.delete('/product_category/:product_typeid',jsonparser,authorized,productCategoryController.RemoveCategory)
productDetailroute.post('/updateimage',jsonparser,authorized,upload.single('file'),productDetailController.UploadImageByproductId);
productDetailroute.get('/showfile/:filename',productDetailController.showFile);
productDetailroute.get('/showfilebyid/:productid',productDetailController.showFilebyProductId);
