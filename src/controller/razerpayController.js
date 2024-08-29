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
const sizeService_1 = __importDefault(require("../services/sizeService"));
const razorpayService_1 = __importDefault(require("../services/razorpayService"));
const sizeService = new sizeService_1.default();
const razorpayService = new razorpayService_1.default();
class RazerpayController {
    Order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, currency, receipt, userid, addressid, productlist } = req.body;
                const order = yield razorpayService.createOrder(amount, currency, receipt, userid, addressid, productlist);
                console.log(order);
                res.status(200).json(order);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error.message });
            }
        });
    }
    paymentsuccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature, paymentid } = req.body;
                // const payment = await razorpayService.verifyPayment(razorpay_payment_id, razorpay_order_id, razorpay_signature);
                const addObject = {
                    payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature,
                    order_id: razorpay_order_id,
                    paymentid: paymentid,
                };
                const response = yield razorpayService.paymentVerify(addObject);
                res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = RazerpayController;
