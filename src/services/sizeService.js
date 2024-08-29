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
const sizemodalSchema_1 = __importDefault(require("../modal/sizemodalSchema"));
class SizeService {
    addSize(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responsefindUserDetail = yield sizemodalSchema_1.default.find({
                    $or: [
                        {
                            name: addObject.name
                        },
                        {
                            nickname: addObject.code
                        }
                    ],
                });
                console.log(responsefindUserDetail);
                if ((responsefindUserDetail === null || responsefindUserDetail === void 0 ? void 0 : responsefindUserDetail.length) > 0) {
                    return { statusCode: 400, message: `Size name or Size Code match try another!` };
                }
                else {
                    const addcolorresponse = yield sizemodalSchema_1.default.create(addObject);
                    if (addcolorresponse) {
                        return { statusCode: 201, message: 'Size Add successfully!' };
                    }
                    else {
                        return { statusCode: 400, message: 'Size Add Failed!' };
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    RemoveSize(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addsizeresponse = yield sizemodalSchema_1.default.findByIdAndDelete(addObject.sizeid);
                if (addsizeresponse) {
                    return { statusCode: 200, message: 'Size Remove successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'Size Remove Failed!' };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getsize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getsizeresponse = yield sizemodalSchema_1.default.find();
                return { statusCode: 200, message: "Get Size Success", result: getsizeresponse };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // updateSize
    updateSize(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addlengthresponse = yield sizemodalSchema_1.default.findByIdAndUpdate(addObject.id, { name: addObject.name, description: addObject.desc, code: addObject.code });
                if (addlengthresponse) {
                    return { statusCode: 200, message: 'Size Update successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'Size Update Failed!' };
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = SizeService;
