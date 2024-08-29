import { Request, Response, response} from 'express';
import ProductDetailService from '../services/ProductDetailService';
import * as bcrypt from 'bcrypt';
import ProductDetailModal from '../modal/ProductDetailSchema';

import path from 'path';
const productDetailService= new ProductDetailService();
class ProductDetailController {

    public async AddProductDetail(req:Request,res:Response){
        try{
            const user:any=req.user
            const reqdata=req.body
            if(user.role ==="admin"){
                const addObject={
                    productId:reqdata.productId,
                        colorid:reqdata.colorid,
                        sizeid:reqdata.sizeid,
                        lengthid:reqdata.lengthid,
                        createdBy:user._id,
                        active:true,
                
                }
                const response = await  productDetailService.addProductDetail(addObject)
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
    public async UploadImageByproductId(req:Request,res:Response){
        try{
            const reqdata:any=req
            console.log(req.body.productId)
            console.log(reqdata.file)
            const addObject:any={
                productId:reqdata.body.productId,
                image:reqdata.file.filename
            }
            const response:any= await productDetailService.UploadImageByproductId(addObject)
            console.log(response)
            res.status(response.statusCode).send(response)
        }
        catch(error){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async showFile  (req:Request, res:Response){
        try {
            const file = path.resolve("uploadsimage" + `/${req.params.filename}`);
            res.sendFile(file);
        }
        catch (err) {
            console.log("error" + err)
        }
    }
    public async showFilebyProductId  (req:Request, res:Response){
        try {
            const fetchdata:any=await ProductDetailModal.findOne({productId:req.params.productid})
            if(fetchdata){
                const file = path.resolve("uploadsimage" + `/${fetchdata.image}`);
                res.sendFile(file);
            }
            else{

            }
            
        }
        catch (err) {
            console.log("error" + err)
        }
    }
    // public async RemoveCategory(req:Request,res:Response){
    //     try{
    //         const user:any=req.user
    //         if(user.role ==="admin"){
    //             const addObject={
    //                lengthid:req.params.lengthid
    //             }
    //             const response = await  productCategoryService.RemoveProductCategory(addObject)
    //             res.status(response.statusCode).send(response)

    //         }
    //         else{
    //             return res.status(403).send({statusCode:403,message:'You are not authorized to add Length!'})
    //         }            
    //     }
    //     catch(error:any){
    //         console.log(error)
    //         res.status(500).json({
    //             error
    //         })
    //     }
    // }
    // public async getallCategory(req:Request,res:Response){
    //     try{
    //         const response = await productCategoryService.getallProductCategory()
    //         res.status(response.statusCode).send(response)
    //     }
    //     catch(error){
    //         res.status(500).json({
    //             error
    //         }) 
    //     }
    // }

}

export default ProductDetailController;