import { Document, model, Schema, Types } from 'mongoose';
export interface IColor extends Document {
    name: string;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const CustomerAddSchema = new Schema({
    userid:{
        type:Types.ObjectId,
        required:true,
        ref:"customer"
    },
    name: {
        type: String,
        unique:true,
        required: true
    },
    address: {
        type: String,
        unique:true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    landemark: {
        type: String,
        required: true
    },
    alternatemobilenumber: {
        type: String,
        required: true
    },
    active:{
        type: String,
        default:true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,

        default: Date.now
    }
},
    {
        timestamps: true
    }
)

const CustomerAddModal = model<IColor>('customer_address',CustomerAddSchema);
export default CustomerAddModal;


