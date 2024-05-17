import { Document, model,Schema,Types} from 'mongoose';


export interface IUser extends Document {
    uniquecode:string;
    name: string;
    email: string;
    dob:string;
    mobile:string;
    countrycode:string;
    password: string;
    role: string;
    usertype:string;
    lastlogin:Date;
    active:boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema({
    uniquecode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    countrycode: {
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
    role: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    //
    lastlogin: {
        type: Date,
        default:new Date()
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

const UserModel = model<IUser>('user',UserSchema);
export default UserModel;