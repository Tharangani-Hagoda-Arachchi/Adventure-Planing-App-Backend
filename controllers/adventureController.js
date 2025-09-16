import Adventure from "../models/adventure.js";
import { AppError } from '../utils/errorHandler.js'; 
import bcrypt from 'bcrypt';



export const addAdventure = async (req, res, next) => {
    try{
        const adventureType  = req.body

  
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

        // Search for all adventures
        const adventure = await Adventure.find();

        if (!adventure) {
            return res.status(404).json({ message: `No adventure found'.` });
        }

        const adventureInBase64 = adventure.map(a =>( {
            _id: a._id,
            adventureType: a.adventureType,


        }));

        res.status(200).json(adventureInBase64);
     
        next()

    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};