import SizeModal from '../modal/sizemodalSchema';
const Razorpay = require('razorpay');
const crypto = require('crypto');
import OrderModel from '../modal/orderSchema';
import PaymentModel from '../modal/paymentSchema';
import SellProductModel from '../modal/sellProductSchema';
interface IAuthService {

}
const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_XGDvrjGB491HEM',
    key_secret: 'iJ2L83O2GpelopIe6rrpBPvv'
});

class RazorpayService implements IAuthService {
    public async createOrder(amount: any, currency: any, receipt: any, userid: any, addressid: any, productlist: any) {
        try {
            const options = {
                amount: amount * 100, // amount in the smallest currency unit (paise)
                currency,
                receipt,

            };
            const orders = await razorpayInstance.orders.create(options)
            console.log(orders)
            // create order in DB;
            const orderdata = {
                amount: orders.amount,
                userid: userid,
                orderid: orders.id,
                orderStatus: true,
                currency: orders.currency,
            }
            //order save in db
            const saveorders = await OrderModel.create(orderdata)
            console.log("saveorders")
            console.log(saveorders)

            // create payment table
            const paymentdata = {
                userid: userid,
                orderid: saveorders._id,
                addressid: addressid,
                price: orders.amount
            }
            const savepayment = await PaymentModel.create(paymentdata)
            console.log("savepayment")
            console.log(savepayment)
            // save  sell productdetail
            const sellproductsavedata = {
                userid: userid,
                orderid: saveorders._id,
                paymentId: savepayment._id,
                sellstatus: false,
                productlist: productlist

            }
            const savesellproductdetail = await SellProductModel.create(sellproductsavedata)
            console.log(savesellproductdetail)
            console.log("savesellproductdetail")
            orders["paymentid"]=savepayment._id,
            orders["ordertableid"]=saveorders._id
            return orders

        }
        catch (error) {
            throw error
        }
    }
    async paymentVerify(object: any) {
        try {
            const { payment_id, order_id,paymentid ,razorpay_signature} = object
            console.log(object)
            // const paymentVerification = await razorpayInstance.verifyPaymentSignature({
            //     order_id: order_id,
            //     payment_id: payment_id,
            //     signature: object.signature
            // })
            // if (paymentVerification) {
                const payment = await PaymentModel.findByIdAndUpdate(paymentid, { paymentstatus: true,razorpay_payment_id:payment_id,
                    razorpay_order_id:order_id,razorpay_signature:razorpay_signature
                 })
                 console.log(payment)
                const sellproduct = await SellProductModel.findOneAndUpdate({ paymentId: paymentid }, { sellstatus: true })
                console.log(payment)

                return { message: "payment successfull" }
            // }
            // else {
            //     return { message: "payment failed" }
            // }
        }

        catch (error) {
            throw error
        }
    }


    
}

export default RazorpayService;