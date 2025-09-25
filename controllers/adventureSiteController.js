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
            latitude: s.latitude,
            longitude: s.longitude,
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

// get all sites by  id
export const getPlaceById = async (req, res, next) => {
    try {

        const { id } = req.params

        // check required fields

        if (!id) {
            return res.status(400).json({ message: 'adventure place ID is required' })
        }

        const site = await Site.findById({_id: id })

        if (!site) {
            return res.status(404).json({ message: 'no adventure site for this ID' })
        }

        const onesiteInBase64 = {
            _id: site._id,
            name: site.name,
            latitude: site.latitude,
            longitude: site.longitude,
            openTime: site.openTime,
            description: site.description,
            ratings: site.ratings,
            siteImage: site.siteImage && site.siteImage.data ? `data:${site.siteImage.contentType};base64,${site.siteImage.data.toString('base64')}` : null

        };


        res.status(200).json(onesiteInBase64);

        next()


    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};


// get all adventures
export const getAdventureSites = async (req, res, next) => {
    try {

        // Search for all adventures
        const adventure = await Site.find();

        if (!adventure || adventure.length === 0) {
            return res.status(404).json({ message: `No adventure found'.` });
        }
        const siteInBase64 = adventure.map(s => ({
            _id: s._id,
            name: s.name,
            latitude: s.latitude,
            longitude: s.longitude,
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


