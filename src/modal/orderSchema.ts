import { Document, model,Schema,Types} from 'mongoose';


export interface IUser extends Document {
    orderid:string;
    currency:string;
    amount:string;
    orderStatus: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema({
    
    userid:{
        type:Types.ObjectId,
        required:true,
        ref:"customer"
    },
    orderid: {
        type: String,
        required: true,
    },
    orderStatus:{
        type:Boolean,
        required: true,
        default:false
    },
    currency:{
        type: String,
        required: true,
    },
    amount:{
        type: String,
        required: true,
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

const OrderModel = model<IUser>('order',OrderSchema);
export default OrderModel;