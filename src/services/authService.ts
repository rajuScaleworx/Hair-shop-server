import UserModel from '../modal/UserSchema';
import Utils from '../helper/utils';
import * as bcrypt from 'bcrypt';
interface IAuthService {

}

const utils = new Utils()
class AuthService implements IAuthService {
    public async signup(addObject: any) {
        try {
            const responsefindUserDetail = await UserModel.findOne({ email: addObject.email })
            if (responsefindUserDetail) {
                return { statusCode: 400, message: `User with ${addObject.email} already exist. Please try again with another e-mail!` }
            }
            const newUserresponse = await UserModel.create(addObject)
            if (newUserresponse) {
                const tokenObject: any = {
                    _id: newUserresponse._id,
                    name: newUserresponse.name,
                    email: newUserresponse.email,
                    role: newUserresponse.role,
                    userType: newUserresponse.usertype
                }
                const token = await utils.createToken(tokenObject)
                return { statusCode: 201, message: 'User created successfully', token: token }

            }
            else {
                return { statusCode: 400, message: 'Create User Failed!' }
            }
        }
        catch (error) {
            throw error
        }
    }
    public async login(addObject: any) {
        try {
            const userResponse: any = await UserModel.findOne({ email: addObject.email })
            if(userResponse){

            
            if (userResponse?.active === false) {
                return { statusCode: 400, message: "Login not Successful. user is not Present or user is already deleted or disabled" }
            }
            else {
                if (bcrypt.compareSync(addObject.password, userResponse.password)) {
                    const tokenObject: any = {
                        _id: userResponse._id,
                        name: userResponse.name,
                        email: userResponse.email,
                        role: userResponse.role,
                        userType: userResponse.usertype
                    }
                    const tokenres = await utils.createToken(tokenObject)
                    return {statusCode:200,message:"Login Success!",token:tokenres}

                }
                else{
                    return {statusCode:400,message:"Login Not Success. Please type Correct Password"}
                }

            }
        }
        else{
            return {statusCode:400,message:"Login Not Success. Please type Correct Email or Password!"}

        }
        }
        catch (error) {
            throw error
        }
    }
    public async finduserByemail(addObject: any) {
        try {
            const newUser = await UserModel.findOne({ email: addObject.email })
            return newUser
        }
        catch (error) {
            throw error
        }
    }
}

export default AuthService;