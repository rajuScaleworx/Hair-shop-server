import { Request, Response, response} from 'express';
import ProductCategoryService from '../services/productCategoryService';
import * as bcrypt from 'bcrypt';
const productCategoryService= new ProductCategoryService();
class ProductCategoryController {

    public async AddCategory(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                    name:req.body.name,
                    producttype:req.body.producttype,
                    producttypeid:req.body.producttypeid,
                    createdBy:user._id,
                    active:true,
                }
                const response = await  productCategoryService.addProductCategory(addObject)
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
    public async RemoveCategory(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                   lengthid:req.params.categoryid
                }
                const response = await  productCategoryService.RemoveProductCategory(addObject)
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
    public async getallCategory(req:Request,res:Response){
        try{
            const response = await productCategoryService.getallProductCategory()
            res.status(response.statusCode).send(response)
        }
        catch(error){
            res.status(500).json({
                error
            }) 
        }
    }
    public async updateProductCategory(req:Request,res:Response){
        try{
            const user:any=req.user
            if(user.role ==="admin"){
                const addObject={
                   id:req.body.id,
                   name:req.body.name,
                   producttype:req.body.producttype,
                   producttypeid:req.body.producttypeid,

                }
                const response:any = await  productCategoryService.updateProductCategory(addObject)
                res.status(response.statusCode).send(response)

            }
            else{
                return res.status(403).send({statusCode:403,message:'You are not authorized to UPdate ProductCategory!'})
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

export default ProductCategoryController;