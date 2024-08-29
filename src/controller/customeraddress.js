"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customerAddressService_1 = __importDefault(require("../services/customerAddressService"));
const customerAddressService = new customerAddressService_1.default();
class CustomerAddController {
    AddCustomeraAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const addObject = {
                    userid: req.body.userid,
                    name: req.body.name,
                    address: req.body.address,
                    city: req.body.city,
                    zipcode: req.body.zipcode,
                    country: req.body.country,
                    landemark: req.body.landemark,
                    alternatemobilenumber: req.body.alternatemobilenumber,
                };
                const response = yield customerAddressService.addCustomeraddress(addObject);
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    error
                });
            }
        });
    }
    getCustomerAddressByuserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield customerAddressService.getCustomeraddressByid(req.params.id);
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
}
exports.default = CustomerAddController;
