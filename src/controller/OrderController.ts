import { Request, Response, response} from 'express';
import LengthService from '../services/lengthService';
import OrderService from '../services/OrderServices';
import * as bcrypt from 'bcrypt';
const orderService= new OrderService();
class OrderController {

    public async OrderList(req:Request,res:Response){
        try{
                const addObject={
                    userid:req.params.userid
                }
                const response = await  orderService.GetOrderList(addObject)
                res.status(response.statusCode).send(response)

                        
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
   
}

export default OrderController;