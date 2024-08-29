"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Razorpay = require('razorpay');
const crypto = require('crypto');
const orderSchema_1 = __importDefault(require("../modal/orderSchema"));
const paymentSchema_1 = __importDefault(require("../modal/paymentSchema"));
const sellProductSchema_1 = __importDefault(require("../modal/sellProductSchema"));
const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_XGDvrjGB491HEM',
    key_secret: 'iJ2L83O2GpelopIe6rrpBPvv'
});
class RazorpayService {
    createOrder(amount, currency, receipt, userid, addressid, productlist) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    amount: amount * 100, // amount in the smallest currency unit (paise)
                    currency,
                    receipt,
                };
                const orders = yield razorpayInstance.orders.create(options);
                console.log(orders);
                // create order in DB;
                const orderdata = {
                    amount: orders.amount,
                    userid: userid,
                    orderid: orders.id,
                    orderStatus: true,
                    currency: orders.currency,
                };
                //order save in db
                const saveorders = yield orderSchema_1.default.create(orderdata);
                console.log("saveorders");
                console.log(saveorders);
                // create payment table
                const paymentdata = {
                    userid: userid,
                    orderid: saveorders._id,
                    addressid: addressid,
                    price: orders.amount
                };
                const savepayment = yield paymentSchema_1.default.create(paymentdata);
                console.log("savepayment");
                console.log(savepayment);
                // save  sell productdetail
                const sellproductsavedata = {
                    userid: userid,
                    orderid: saveorders._id,
                    paymentId: savepayment._id,
                    sellstatus: false,
                    productlist: productlist
                };
                const savesellproductdetail = yield sellProductSchema_1.default.create(sellproductsavedata);
                console.log(savesellproductdetail);
                console.log("savesellproductdetail");
                orders["paymentid"] = savepayment._id,
                    orders["ordertableid"] = saveorders._id;
                return orders;
            }
            catch (error) {
                throw error;
            }
        });
    }
    paymentVerify(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payment_id, order_id, paymentid, razorpay_signature } = object;
                console.log(object);
                // const paymentVerification = await razorpayInstance.verifyPaymentSignature({
                //     order_id: order_id,
                //     payment_id: payment_id,
                //     signature: object.signature
                // })
                // if (paymentVerification) {
                const payment = yield paymentSchema_1.default.findByIdAndUpdate(paymentid, { paymentstatus: true, razorpay_payment_id: payment_id,
                    razorpay_order_id: order_id, razorpay_signature: razorpay_signature
                });
                console.log(payment);
                const sellproduct = yield sellProductSchema_1.default.findOneAndUpdate({ paymentId: paymentid }, { sellstatus: true });
                console.log(payment);
                return { message: "payment successfull" };
                // }
                // else {
                //     return { message: "payment failed" }
                // }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = RazorpayService;
