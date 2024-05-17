import { Request, Response, response} from 'express';
import LengthService from '../services/lengthService';
import * as bcrypt from 'bcrypt';
const lengthService= new LengthService();
class LengthController {

    public async AddLength(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                    name:req.body.name,
                    description:req.body.description,
                    code:req.body.code,
                    createdBy:user._id,
                    active:true,
                }
                const response = await  lengthService.addLength(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to add Length!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async RemoveLength(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                   lengthid:req.params.lengthid
                }
                const response = await  lengthService.RemoveLength(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to add Length!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async getalllength(req:Request,res:Response){
        try{
            const response = await lengthService.getlength()
            res.status(response.statusCode).send(response)
        }
        catch(error){
            res.status(500).json({
                error
            }) 
        }
    }
}

export default LengthController;