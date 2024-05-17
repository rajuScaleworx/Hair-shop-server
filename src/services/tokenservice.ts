import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

let JWTScret:any = process.env.JWT_SECERET_KEY;

export default class TokenService {
    public createToken(userObject: any) {
        const JWTObject: any = {
            _id: userObject._id,
            name: userObject.name,
            email: userObject.email,
            role: userObject.role,
            userType: userObject.usertype
        }
        return jwt.sign(JWTObject,JWTScret,{
            expiresIn: '24h'
        })
    }
}