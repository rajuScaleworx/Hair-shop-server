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
const lengthmodalSchema_1 = __importDefault(require("../modal/lengthmodalSchema"));
class ColorService {
    addLength(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responsefindUserDetail = yield lengthmodalSchema_1.default.find({
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
                    return { statusCode: 400, message: `Length name or Length Code match try another!` };
                }
                else {
                    const addcolorresponse = yield lengthmodalSchema_1.default.create(addObject);
                    if (addcolorresponse) {
                        return { statusCode: 201, message: 'Length Add successfully!' };
                    }
                    else {
                        return { statusCode: 400, message: 'Length Add Failed!' };
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    RemoveLength(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addlengthresponse = yield lengthmodalSchema_1.default.findByIdAndDelete(addObject.lengthid);
                if (addlengthresponse) {
                    return { statusCode: 200, message: 'Length Remove successfully!' };
                }
                else {
                    return { statusCode: 400, message: 'Length Remove Failed!' };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getlength() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getlengthresponse = yield lengthmodalSchema_1.default.find();
                return { statusCode: 200, message: "Get Color Success", result: getlengthresponse };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // updateLength
    updateLength(addObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addlengthresponse = yield lengthmodalSchema_1.default.findByIdAndUpdate(addObject.id, { name: addObject.name, description: addObject.desc, code: addObject.code });
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
exports.default = ColorService;
