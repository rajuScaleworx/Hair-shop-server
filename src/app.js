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
// src/app.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./routes/index");
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const passport_mw_1 = require("../src/passport.mw");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
require("../src/passport.mw");
const app = (0, express_1.default)();
const port = process.env.PORT;
const dburl = process.env.MONGODB_URL;
const uri = `${dburl}`;
// app.use(bodyParser.urlencoded({extended: true}));
console.log(uri);
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3000/"], maxAge: 84600
}));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/", index_1.routes);
// app.use(bodyParser.urlencoded({extended:false}));
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
app.use(passport_1.default.authenticate("session"));
app.use(body_parser_1.default.urlencoded({
    extended: true,
    limit: "25mb"
}));
app.use(require('express-session')({
    secret: 'hdjhiuhiudehuieyiueyiuewyiuewiu',
    resave: false,
    saveUninitialized: false
}));
(0, passport_mw_1.initPassport)(app);
const connectdatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    // const uri: string =`${dburl}` 
    console.log(uri);
    const clientoptions = {
        serverApi: { version: "1", strict: true, deprecationErrors: true }
    };
    yield mongoose_1.default.connect(uri, clientoptions);
    yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
    console.log("connected to database");
});
app.listen(port, () => {
    console.log(uri);
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
connectdatabase();
