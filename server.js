import DBConnect from "./db_config.js"
import {errorMiddleware} from './utils//errorHandler.js'
import { swaggerUi,swaggerDocs } from "./swagger.js";
import authrouter from "./routes/authRoutes.js";
import guiderouter from "./routes/guideRoutes.js";

import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



const app = express();
const port = process.env.PORT || 4000;
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
dotenv.config();
app.use(cookieParser());


//swager setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/api/swagger.json', (req, res) => {
  res.json(swaggerDocs);
});




app.use('/api/auths',authrouter)
app.use('/api',guiderouter)




DBConnect();

app.use(errorMiddleware);

app.listen(port,() => {
    console.log(`Sever run on port ${port}`);
    console.log(`Server running on http://localhost:4000/api`);
  console.log(`Swagger docs available at http://localhost:4000/api-docs`);

})

