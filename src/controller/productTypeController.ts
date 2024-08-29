import { Request, Response, response} from 'express';
import ProductTypeService from '../services/productTypeService';
import * as bcrypt from 'bcrypt';
const productTypeService= new ProductTypeService();
class ProductTypeController {

    public async AddProductType(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                console.log(req.body)
                const addObject={
                    name:req.body.name,
                    active:true,
                }
                const response = await  productTypeService.addProductType(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to add productType!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async RemoveProductType(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                   lengthid:req.params.product_typeid
                }
                const response = await  productTypeService.RemoveProductType(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to remove ProductType!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async updateProductType(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                   id:req.body.id,
                   name:req.body.name
                }
                const response:any = await  productTypeService.updateProductType(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to remove ProductType!'})
            }            
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async getallProductType(req:Request,res:Response){
        try{
            const response = await productTypeService.getallProductType()
            res.status(response.statusCode).send(response)
        }
        catch(error){
            res.status(500).json({
                error
            }) 
        }
    }
    
}

export default ProductTypeController;