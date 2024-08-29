import { Request, Response, response} from 'express';
import SizeService from '../services/sizeService';
import * as bcrypt from 'bcrypt';
const sizeService= new SizeService();
class SizeController {

    public async AddSize(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                    name:req.body.name,
                    description:req.body.desc,
                    code:req.body.code,
                    createdBy:user._id,
                    active:true,
                }
                const response = await  sizeService.addSize(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to add Size!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async RemoveSize(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                    sizeid:req.params.sizeid
                }
                const response = await  sizeService.RemoveSize(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to add Size!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async getallsize(req:Request,res:Response){
        try{
            const response = await sizeService.getsize()
            res.status(response.statusCode).send(response)
        }
        catch(error){
            res.status(500).json({
                error
            }) 
        }
    }
    // updateSize
    public async updateSize(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                   id:req.body.id,
                   name:req.body.name,
                   desc:req.body.desc,code:req.body.code
                }
                const response:any = await  sizeService.updateSize(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to UPdate Size!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
}

export default SizeController;