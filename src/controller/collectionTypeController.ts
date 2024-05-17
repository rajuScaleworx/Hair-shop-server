import { Request, Response, response} from 'express';
import ColorService from '../services/colorService';
import * as bcrypt from 'bcrypt';
const colorService= new ColorService();
class CollectiontypeController {

    public async Addcollectiontype(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                    name:req.body.name,
                    description:req.body.description,
                    createdBy:user._id,
                    active:true,
                }
                const response = await  colorService.addColor(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to add Color!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async Removecollectiontype(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                   id:req.params.id
                }
                const response = await  colorService.RemoveColor(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to add Color!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async getallcollectiontype(req:Request,res:Response){
        try{
            const response = await colorService.getcolor()
            res.status(response.statusCode).send(response)
        }
        catch(error){
            res.status(500).json({
                error
            }) 
        }
    }
}

export default CollectiontypeController;