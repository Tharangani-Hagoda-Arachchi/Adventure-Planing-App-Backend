import Guide from "../models/guide.js";
import { AppError } from '../utils/errorHandler.js'; 

export const addGuide = async (req, res, next) => {
    try{
        const {guideRegno, guideName, guideFee, guideAdventureCategory, guideCategory, language} = req.body
        const {guideImageUrl} = req.file ? `http://localhost:4000/uploads/${req.file.filename}`: null
        
        // check guide is already exists
        const existingGuide = await Guide.findOne({guideRegno});
        if (existingGuide) {
            return res.status(409).json({ message: 'Guide is already registered' });
        }

        // create nwe user
        const newGuide = new Guide({
            guideRegno,
            guideName,
            guideFee,
            guideAdventureCategory,
            guideCategory,
            language,
            guideImageUrl 
        });

        await newGuide.save();

        res.status(201).json({ message: 'New Guide Added successful' });

        next()
    

    } catch(error){
        next(error); // Pass error to the global error handler
    }
};