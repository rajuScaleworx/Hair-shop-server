import { Document, model,Schema,Types} from 'mongoose';


export interface IUser extends Document {
    name: string;
    email: string;
    mobile:string;
    password: string;
    usertype:string;
    active:boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } ,
    active:{
        type:Boolean,
        default:true
    },
    usertype: {
        type: String,
        required: true
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

const CustomerModel = model<IUser>('customer',CustomerSchema);
export default CustomerModel;