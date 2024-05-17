import { Document, model, Schema, Types } from 'mongoose';
export interface ILength extends Document {
    name: string;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const LengthSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,

        required: true
    },
    description: {
        type: String,

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

const LengthModal = model<ILength>('length',LengthSchema);
export default LengthModal;


