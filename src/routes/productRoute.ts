import * as express from 'express';
import ProductController from '../controller/productController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';
const multer = require('multer');
const path = require('path');

const productController= new ProductController()
const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
      cb(null, 'uploadsimage/');
    },
    filename: (req:any, file:any, cb:any) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });

export const productroute= express.Router()
const jsonparser=bodyParser.json();
productroute.post('/addproduct',jsonparser,authorized,upload.array('files', 5),productController.AddProducts)
productroute.get('/productlist',productController.ProductList);

productroute.post('/product',jsonparser,authorized,productController.AddProduct)
// productroute.delete('/product_category/:product_typeid',jsonparser,authorized,productCategoryController.RemoveCategory)
productroute.get('/product/:id',productController.ProductDetailbyId);
productroute.get('/productlist/:type',productController.ProductListbytype);
productroute.post('/productlistbymultiid',jsonparser,productController.ProductDetailBymultiId);
productroute.get('/ProductDetailbyIdAdmin/:id',jsonparser,productController.ProductDetailbyIdforAdmin);


// ProductDetailbyIdAdmin
