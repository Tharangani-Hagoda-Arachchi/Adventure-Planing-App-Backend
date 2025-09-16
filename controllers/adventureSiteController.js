import Adventure from "../models/adventure.js";
import Site from "../models/adventureSite.js";
import { AppError } from '../utils/errorHandler.js';

export const addSite = async (req, res, next) => {
    try {
        const { name,latitude,longitude, openTime, description, ratings, categoryId } = req.body

        if (!req.file) return res.status(400).send('Image is required');

        // check guide is already exists
        const existingSite = await Site.findOne({ name });
        if (existingSite) {
            return res.status(409).json({ message: 'Site is already registered' })
        }

        // create nwe site
        const newSite = new Site({
            name,
            openTime,
            latitude,
            longitude,
            description,
            ratings,
            categoryId,
            siteImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        await newSite.save();

        res.status(201).json({ message: 'New Site Added successful' });

        next()


    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};


// get all sites by category id
export const getCategoryById = async (req, res, next) => {
    try {

        const { categoryId } = req.params

        // check required fields

        if (!categoryId) {
            return res.status(400).json({ message: 'adventure category is required' })
        }

        const validCategory = await Adventure.find({ _id : categoryId })

        if (!validCategory) {
            return res.status(404).json({ message: 'invalid adventure category' })
        }

        const sites = await Site.find({ categoryId })

        if (!sites) {
            return res.status(404).json({ message: 'no adventure site for this category' })
        }

        const siteInBase64 = sites.map(s => ({
            _id: s._id,
            name: s.name,
            openTime: s.openTime,
            description: s.description,
            ratings: s.ratings,
            siteImage: s.siteImage && s.siteImage.data ? `data:${s.siteImage.contentType};base64,${s.siteImage.data.toString('base64')}` : null

        }));


        res.status(200).json(siteInBase64);

        next()


    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};