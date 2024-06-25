import { Document, model,Schema,Types} from 'mongoose';


export interface IUser extends Document {
    orderid:string;
    paymentId: string;
    sellstatus: boolean;
    productlist:[],
    createdAt: Date;
    updatedAt: Date;
}

const SellProductSchema = new Schema({
    
    userid:{
        type:Types.ObjectId,
        required:true,
        ref:"customer"
    },
    orderid: {
        type: String,
        required: true,
    },
    paymentId:{
        type: String,
    },
    sellstatus:{
      type:Boolean,
      required: true,
      default:false
    },
    productlist:{
        type:[],
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

const SellProductModel = model<IUser>('SellProduct',SellProductSchema);
export default SellProductModel;