import { Request, Response, response} from 'express';
import CollectionService from '../services/collectionTypeService';
import * as bcrypt from 'bcrypt';
const collectionService= new CollectionService();
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
                const response = await  collectionService.addColor(addObject)
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
                const response = await  collectionService.RemoveCollection(addObject)
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
            const response = await collectionService.getcolor()
            res.status(response.statusCode).send(response)
        }
        catch(error){
            res.status(500).json({
                error
            }) 
        }
    }
    public async getCollectiontypewithproduct(req:Request,res:Response){
        try{
            const response = await collectionService.getCollectiontypewithproduct()
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