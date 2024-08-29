import { Request, Response, response } from 'express';
import ProductService from '../services/productServices';
import * as bcrypt from 'bcrypt';
const productService = new ProductService();
class ProductController {
    public async AddProducts(req: Request, res: Response) {
        try {
            const user: any = req.user
            if (user.role === "admin") {
                const request: any = req
                const files: any = request.files
                // const { name, colors, sizes, lengths } = req.body;
                const images = files.map((file: any) => file.filename);
                console.log('req.body')
                console.log(req.body)
                console.log(images)
                const reqdata = req.body
                const productdetail: any = {
                    image: images,
                    price: reqdata.price,
                    maxbuycount: reqdata.maxbuycount,
                    colorid: JSON.parse(reqdata.colorid),
                    sizeid: JSON.parse(reqdata.sizeid),
                    lengthid: JSON.parse(reqdata.lengthid),
                    productId: "",

                }
                const createproduct = {
                    "name": reqdata.name,
                    "producttypeId": reqdata.producttypeId,
                    "producttype": reqdata.producttype,
                    "productcategoryname": reqdata.productcategoryname,
                    "productcategoryid": reqdata.productcategoryid,
                    "productCollection_type": reqdata.productCollection_type,
                    "productCollection_typeid": reqdata.productCollection_typeid,
                    "createdBy": user._id,
                    "active": false,
                }
                const response: any = await productService.addProduct(createproduct, productdetail)
                res.status(response.statusCode).send(response)
            }
            else {
                return res.status(403).send({ statusCode: 403, message: 'You are not authorized to add Length!' })
            }
        }
        catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }
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
                    price: reqdata.price,
                    image: "",
                    maxbuycount: reqdata.maxbuycount,
                    colorid: reqdata.colorid,
                    sizeid: reqdata.sizeid,
                    lengthid: reqdata.lengthid,
                    "createdBy": user._id,
                    "active": false,
                }
                const createproduct = {
                    "name": reqdata.name,
                    "producttypeId": reqdata.producttypeId,
                    "producttype": reqdata.producttype,
                    "productcategoryname": reqdata.productcategoryname,
                    "productcategoryid": reqdata.productcategoryid,
                    "productCollection_type": reqdata.productCollection_type,
                    "productCollection_typeid": reqdata.productCollection_typeid,
                    "createdBy": user._id,
                    "active": false,
                }
                const productDetail = {
                    price: reqdata.price,
                    image: "",
                    maxbuycount: reqdata.maxbuycount,
                    colorid: reqdata.colorid,
                    sizeid: reqdata.sizeid,
                    lengthid: reqdata.lengthid,
                    productId: "",
                }
                const response: any = await productService.addProduct(createproduct, productDetail)
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
    public async ProductList(req: Request, res: Response) {
        try {
            const response = await productService.ProductList(req.params.type)
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
    // for Admin API
    public async ProductDetailbyIdforAdmin(req: Request, res: Response) {
        try {
            const response = await productService.ProductDetailbyIdAdmin(req.params.id)
            res.status(response.statusCode).send(response)

        }
        catch (error) {
            res.status(500).json({
                error
            })
        }
    }
    public async ProductDetailBymultiId(req: Request, res: Response) {
        try {
            const requestdata = req.body
            console.log(requestdata)
            var Idarray: any = []
            requestdata.forEach((ed: any) => {
                Idarray.push(ed.productId)
            })
            var coloridarr: any = []
            requestdata.forEach((ed: any) => {
                coloridarr.push(ed.color)
            })
            var sizeidarr: any = []
            requestdata.forEach((ed: any) => {
                sizeidarr.push(ed.size)
            })
            var lengthdarr: any = []
            requestdata.forEach((ed: any) => {
                lengthdarr.push(ed.length)
            })
            const response = await productService.ProductDetailbyMultiId(Idarray, coloridarr, sizeidarr, lengthdarr, requestdata)
            res.status(response.statusCode).send(response)
        }
        catch (error) {
            console.log(error)
            res.status(500).json({
                error
            })
        }
    }
    public async ProductUpdate(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const { productData, productDetailsData } = req.body;

            const result = await productService.updateProduct(productId, productData, productDetailsData);

            res.json({
                success: true,
                data: result
            });
        } catch (error:any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

}

export default ProductController;