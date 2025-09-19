import DBConnect from "./db_config.js"
import {errorMiddleware} from './utils//errorHandler.js'
import { swaggerUi,swaggerDocs } from "./swagger.js";
import authrouter from "./routes/authRoutes.js";
import guiderouter from "./routes/guideRoutes.js";
import adventurerouter from "./routes/adventureRoutes.js";
import siterouter from "./routes/adventureSiteRoutes.js";


import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import packagerouter from "./routes/packageRoute.js";




const app = express();
const port = process.env.PORT || 3000;
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
app.use('/api',adventurerouter)
app.use('/api',siterouter)
app.use('/api',packagerouter)





DBConnect();

app.use(errorMiddleware);

app.listen(port,'0.0.0.0',() => {
    console.log(`Sever run on port ${port}`);
    console.log(`Server running on http://13.60.76.232/api`);
  console.log(`Swagger docs available at http://13.60.76.232/api-docs`);

})

