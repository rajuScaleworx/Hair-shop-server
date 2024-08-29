import { Request, Response, response} from 'express';
import SizeService from '../services/sizeService';
import * as bcrypt from 'bcrypt';
import Razorpay from 'razorpay';
import RazorpayService from '../services/razorpayService';
const sizeService= new SizeService();
const razorpayService= new RazorpayService();

class RazerpayController {

    public async Order(req:Request,res:Response){
        try {
            const { amount, currency, receipt,userid,addressid,productlist }:any = req.body;

            const order = await razorpayService.createOrder(amount, currency, receipt,userid,addressid,productlist);
            console.log(order)
            res.status(200).json(order);
          } catch (error:any) {
            console.log(error)
            res.status(500).json({ error: error.message });
          }
    }
    public async paymentsuccess(req:Request,res:Response){
      try{
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature,paymentid }:any = req.body;
       // const payment = await razorpayService.verifyPayment(razorpay_payment_id, razorpay_order_id, razorpay_signature);
       const addObject:any={
        payment_id:razorpay_payment_id,
        razorpay_signature:razorpay_signature,
        order_id:razorpay_order_id,
        paymentid:paymentid,
       }
       const response=await  razorpayService.paymentVerify(addObject)
       res.status(200).json(response);

      }
      catch(error:any){
        console.log(error)
        res.status(500).json({ error: error.message });
      }
    }
    // public async capturePayment(req:Request,res:Response){
    //     try {
    //         const { paymentId, amount } = req.body;
    //         const payment = await razorpayService.capturePayment(paymentId, amount);
    //         res.status(200).json(payment);
    //       } catch (error:any) {
    //         res.status(500).json({ error: error.message });
    //       }
    // }
    
}

export default RazerpayController;