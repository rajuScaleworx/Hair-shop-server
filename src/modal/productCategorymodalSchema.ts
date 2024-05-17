import { Document, model, Schema, Types } from 'mongoose';


export interface IProductCategory extends Document {
    name: string;
    active: boolean;
    producttype: string;
    producttypeid: string;
    createdAt: Date;
    updatedAt: Date;
}
const ProductCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    producttype: {
        type: String,
        required: true,
    },
    producttypeid: {
        type: Types.ObjectId,
        required: true,
        ref: "producttype"
    },
    createdBy:{
        type: Types.ObjectId,
        required: true,
        ref:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
})

const ProductCategoryModal = model<IProductCategory>('productcategory', ProductCategorySchema);
export default ProductCategoryModal;


