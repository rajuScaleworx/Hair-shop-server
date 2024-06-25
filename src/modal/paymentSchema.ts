import { Document, model,Schema,Types} from 'mongoose';


export interface IUser extends Document {
    orderid:string;
    paymentid: string;
    price: string;
    paymentstatus:boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema = new Schema({
    
    userid:{
        type:Types.ObjectId,
        required:true,
        ref:"customer"
    },
    orderid: {
        type: String,
        required: true,
    },
    addressid:{
        type: String,
       
    },
    razorpay_payment_id: {
        type: String,
       
    },
    razorpay_order_id: {
        type: String,
       
    },
    razorpay_signature: {
        type: String,
       
    },
    price:{
        type:String,
        required: true
    },
    paymentstatus: {
        type: Boolean,
        required: true,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date
    },
    updatedAt: {
        type: Date,
        default: Date
    },
    //

})

const PaymentModel = model<IUser>('payment',PaymentSchema);
export default PaymentModel;