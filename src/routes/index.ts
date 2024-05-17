import express from 'express';
import {authroute} from './authRoute';
import {colorroute} from './colorRoute';
import {lengthroute} from './lengthRoute';
import {sizeroute} from './sizeRoute';
import {producttyperoute} from './productTypeRoute';
import {productcategoryroute} from './productCategoryRoute';
export const routes = express.Router()

routes.use(authroute);
routes.use(colorroute);
routes.use(lengthroute);
routes.use(sizeroute);
routes.use(producttyperoute);
routes.use(productcategoryroute);





