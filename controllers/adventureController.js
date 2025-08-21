import Adventure from "../models/adventure.js";
import { AppError } from '../utils/errorHandler.js'; 
import bcrypt from 'bcrypt';



export const addAdventure = async (req, res, next) => {
    try{
        const {adventureType}  = req.body

  
        const newAdventure = new Adventure({
            adventureType
        });

        await newAdventure.save();

        res.status(201).json({ message: 'New Adventure Type Added successful' });

        next()
    

    } catch(error){
        next(error); // Pass error to the global error handler
    }
};



// get all adventures
export const getAdventure = async (req, res, next) => {
    try {

        // Search for all admin
        const adventure = await Adventure.find();

        if (!adventure) {
            return res.status(404).json({ message: `No adventure found'.` });
        }

        res.status(200).json({
            message: `Adventure retrieved successfully.`,
            admins: adventure.map(adventure => ({
                _id: adventure._id,
                adventureType: adventure.adventureType,

            }))
        });
        next()

    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};