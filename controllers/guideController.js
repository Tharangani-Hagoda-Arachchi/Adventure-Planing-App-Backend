import Guide from "../models/guide.js";
import { AppError } from '../utils/errorHandler.js'; 

export const addGuide = async (req, res, next) => {
    try{
        const {guideRegno, guideName, guideFee, guideAdventureCategory, guideAdventurePlace, guideCategory, language, ratings, guidePhoneNo, guideEmail,guideAddress,guideValidity} = req.body
        //const {guideImageUrl} = req.file ? `http://localhost:4000/uploads/${req.file.filename}`: null
        if (!req.file) return res.status(400).send('Image is required');
        
        // check guide is already exists
        const existingGuide = await Guide.findOne({guideRegno});
        if (existingGuide) {
            return res.status(409).json({ message: 'Guide is already registered' })
        }

        // create nwe user
        const newGuide = new Guide({
            guideRegno,
            guideName,
            guideFee,
            guideAdventureCategory,
            guideAdventurePlace,
            guideCategory,
            language,
            ratings,
            guidePhoneNo,
            guideEmail,
            guideAddress,
            guideValidity,
            guideImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        await newGuide.save();

        res.status(201).json({ message: 'New Guide Added successful' });

        next()
    

    } catch(error){
        next(error); // Pass error to the global error handler
    }
};


// get all guides
export const getGuide = async (req, res, next) => {
    try{

        const guides = await Guide.find()

        const guideInBase64 = guides.map(g =>( {
            _id: g._id,
            guideRegno: g.guideRegno,
            guideName: g.guideName,
            guideFee: g.guideFee,
            guideAdventureCategory: g.guideAdventureCategory,
            guideAdventurePlace: g.guideAdventurePlace,
            guideCategory: g.guideCategory,
            language: g.language,
            ratings: g.ratings || 0,
            guidePhoneNo: g.guidePhoneNo,
            guideEmail: g.guideEmail,
            guideAddress: g.guideAddress,
            guideValidity: g.guideValidity,
            guideImage: g.guideImage && g.guideImage.data ? `data:${g.guideImage.contentType};base64,${g.guideImage.data.toString('base64')}` : null

        }));


        res.status(200).json(guideInBase64);

        next()
    

    } catch(error){
        next(error); // Pass error to the global error handler
    }
};