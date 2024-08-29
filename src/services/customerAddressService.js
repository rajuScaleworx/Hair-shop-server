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
const customeraddressSchem_1 = __importDefault(require("../modal/customeraddressSchem"));
class CustomerAddressService {
    addCustomeraddress(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const responsefindUserDetail = await CustomerAddModal.find(
                //     {
                //         $or: [
                //             {
                //                 email: addObject.email
                //             },
                //             {
                //                 mobile: addObject.mobile
                //             }
                //         ],
                //     }
                // )
                // console.log(responsefindUserDetail)
                // if (responsefindUserDetail?.length>0) {
                //     return { statusCode: 400, message: `email name or mobile match try another!` }
                // }
                //  else{
                const addcolorresponse = yield customeraddressSchem_1.default.create(addObject);
                if (addcolorresponse) {
                    return { statusCode: 201, message: 'Customer Add successfully!', result: addcolorresponse };
                }
                else {
                    return { statusCode: 400, message: 'Customer Add Failed!' };
                }
                //  }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCustomeraddressByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getCustomer = yield customeraddressSchem_1.default.find({ userid: id });
                return { statusCode: 200, message: "Get Customer Success", result: getCustomer };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CustomerAddressService;
