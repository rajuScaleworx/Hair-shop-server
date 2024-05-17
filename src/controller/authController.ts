import { Request, Response, response} from 'express';
import Authservice from '../services/authService';
import * as bcrypt from 'bcrypt';
const authservice= new Authservice();
class UserController {

    public async Signup(req:Request,res:Response){
        try{
            console.log(req.body)
            const signObject:any={
                name:req.body.name,
                email:req.body.email,
                password:await bcrypt.hash(req.body.password,10),
                mobile:req.body.mobile,
                countrycode:req.body.countrycode,
                role:"admin",
                usertype:req.body.usertype,
                uniquecode:"12344766",
                dob:req.body.dob,
                active:true,
            }
            const response = await  authservice.signup(signObject)
            if(response.token){
                res.setHeader("Authorization",`Bearer ${response.token}`);
                res.cookie('Authorization',`Bearer ${response.token}`);
                res.status(response.statusCode).send(response)
            }
            else{
                res.status(response.statusCode).send(response)
            }
        }
        catch(error:any){
            res.status(500).json({
                error
            })
        }
    }
    public async UserLogin(req:Request,res:Response) {
        try{
            const loginObject:any={
                email:req.body.email,
                password:req.body.password,
            }
            const response = await authservice.login(loginObject);
            if(response.token){
                res.setHeader("Authorization",`Bearer ${response.token}`);
                res.cookie('Authorization',`Bearer ${response.token}`);
                res.status(response.statusCode).send(response)
            }
            else{
                res.status(response.statusCode).send(response)
            }
        }
        catch(error){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    
}

export default UserController;