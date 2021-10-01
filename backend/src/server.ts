import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

const server = () => {
    dotenv.config();
    
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser())

    app.use('/', express.static('/frontend/public'))
}

server();