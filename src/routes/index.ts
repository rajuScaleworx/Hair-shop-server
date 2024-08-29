import express from 'express';
import {authroute} from './authRoute';
import {colorroute} from './colorRoute';
import {lengthroute} from './lengthRoute';
import {sizeroute} from './sizeRoute';
import {producttyperoute} from './productTypeRoute';
import {productcategoryroute} from './productCategoryRoute';
import {collectiontyperoute} from './collectionTYpeRoute';
import {productroute} from './productRoute';
import {productDetailroute} from './productDetailRoute';
import {razerpayroute} from './razerpayRouter';
import {customerroute} from './customerRoute';
import {customeraddressroute} from './customerAddRoute';
import {orderroute} from './orderRoute';
import {guestCartroute} from './guestCartRoute';
export const routes = express.Router()

routes.use(authroute);
routes.use(colorroute);
routes.use(lengthroute);
routes.use(sizeroute);
routes.use(producttyperoute);
routes.use(productcategoryroute);
routes.use(collectiontyperoute);
routes.use(productroute);
routes.use(productDetailroute);
routes.use(razerpayroute);
routes.use(customerroute);
routes.use(customeraddressroute);
routes.use(orderroute);
routes.use(guestCartroute);












