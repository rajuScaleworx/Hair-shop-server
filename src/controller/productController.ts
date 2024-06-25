import { Request, Response, response } from 'express';
import ProductService from '../services/productServices';
import * as bcrypt from 'bcrypt';
const productService = new ProductService();
class ProductController {

    public async AddProduct(req: Request, res: Response) {
        try {
            const user: any = req.user
            if (user.role === "admin") {
                const reqdata = req.body
                const addObject =
                {
                    "name": reqdata.name,
                    "producttypeId": reqdata.producttypeId,
                    "producttype": reqdata.producttype,
                    "productcategoryname": reqdata.productcategoryname,
                    "productcategoryid": reqdata.productcategoryid,
                    "productCollection_type": reqdata.productCollection_type,
                    "productCollection_typeid": reqdata.productCollection_typeid,
                    "createdBy": user._id,
                    "active": true,
                }
                const response = await productService.addProduct(addObject)
                res.status(response.statusCode).send(response)

            }
            else {
                return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add Length!' })
            }
        }
        catch (error: any) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    // public async RemoveCategory(req: Request, res: Response) {
    //     try {
    //         const user: any = req.user
    //         if (user.role === "admin") {
    //             const addObject = {
    //                 lengthid: req.params.lengthid
    //             }
    //             const response = await productCategoryService.RemoveProductCategory(addObject)
    //             res.status(response.statusCode).send(response)

    //         }
    //         else {
    //             return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add Length!' })
    //         }
    //     }
    //     catch (error: any) {
    //         console.log(error)
    //         res.status(500).json({
    //             error
    //         })
    //     }
    // }
    // public async getallCategory(req: Request, res: Response) {
    //     try {
    //         const response = await productCategoryService.getallProductCategory()
    //         res.status(response.statusCode).send(response)
    //     }
    //     catch (error) {
    //         res.status(500).json({
    //             error
    //         })
    //     }
    // }
    public async ProductListbytype(req: Request, res: Response) {
        try {
            const response = await productService.ProductListbytype(req.params.type)
            res.status(response.statusCode).send(response)
        }
        catch (error) {
            res.status(500).json({
                error
            })
        }
    }
    public async ProductDetailbyId(req: Request, res: Response) {
        try {
            const response = await productService.ProductDetailbyId(req.params.id)
            res.status(response.statusCode).send(response)

        }
        catch (error) {
            res.status(500).json({
                error
            })
        }
    }
    public async ProductDetailBymultiId(req: Request, res: Response){
        try{
                const requestdata=req.body
                console.log(requestdata)
            var Idarray:any=[]
            requestdata.forEach((ed:any)=>{
                Idarray.push(ed.productId)
            })
            var coloridarr:any=[]
            requestdata.forEach((ed:any)=>{
                coloridarr.push(ed.color)
            })
            var sizeidarr:any=[]
            requestdata.forEach((ed:any)=>{
                sizeidarr.push(ed.size)
            })
            var lengthdarr:any=[]
            requestdata.forEach((ed:any)=>{
                lengthdarr.push(ed.length)
            })
            const response = await productService.ProductDetailbyMultiId(Idarray,coloridarr,sizeidarr,lengthdarr,requestdata)
            res.status(response.statusCode).send(response)
        }
        catch(error){
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
}

export default ProductController;