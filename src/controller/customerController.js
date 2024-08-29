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
const customerServices_1 = __importDefault(require("../services/customerServices"));
const generate_password_1 = __importDefault(require("generate-password"));
const customerService = new customerServices_1.default();
class CustomerController {
    AddCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const addObject = {
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: generate_password_1.default.generate({ length: 10, numbers: true }),
                    usertype: req.body.usertype,
                    active: true,
                };
                const response = yield customerService.addCustomer(addObject);
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
    getCustomerByid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield customerService.getCustomerByid(req.params.id);
                res.status(response.statusCode).send(response);
            }
            catch (error) {
                res.status(500).json({
                    error
                });
            }
        });
    }
    getallCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield customerService.getallCustomer();
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
exports.default = CustomerController;
