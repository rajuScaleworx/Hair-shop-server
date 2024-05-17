import { Document, model, Schema, Types } from 'mongoose';


export interface IProduct extends Document {
    productid: string;
    name: string;
    producttypeId: string;
    producttype: string;
    productcategoryname: string;
    productcategoryid: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema({
    productid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    producttypeId: {
        type: Types.ObjectId,
        required: true,
        ref: "producttype"
    },
    producttype: {
        type: String,
        required: true,
        ref: "producttype"
    },
    productcategoryname: {
        type: String,
        required: true,
        ref: "productcategory"
    },
    productcategoryid: {
        type: Types.ObjectId,
        required: true,
        ref: "productcategory"
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}
    ,
    {
        timestamps: true
    }
)

const ProductModal = model<IProduct>('product', ProductSchema)
export default ProductModal;