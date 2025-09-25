import express from "express";
import { globalSearch, searchPackages, searchSites } from "../controllers/searchController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const searchrouter = express.Router();


searchrouter.get("/adventures",authenticate,searchSites);
searchrouter.get("/all",authenticate,globalSearch);
searchrouter.get("/packages",authenticate,searchPackages);

export default searchrouter;
