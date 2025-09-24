import Adventure from "../models/adventure.js";
import Package from "../models/package.js";
import { AppError } from '../utils/errorHandler.js';

export const addpPackage = async (req, res, next) => {
    try {
        const { name,price,time,place, mealAvailability, description, ratings, categoryId } = req.body

        if (!req.file) return res.status(400).send('Image is required');

        // check guide is already exists
        const existingPackage = await Package.findOne({ name });
        if (existingPackage) {
            return res.status(409).json({ message: 'package is already registered' })
        }

        // create nwe site
        const newPackage = new Package({
            name,
            price,
            time,
            place,
            mealAvailability,
            description,
            ratings,
            categoryId,
            packageImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        await newPackage.save();

        res.status(201).json({ message: 'New package Added successful' });

        next()


    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};


// get all packages by category id
export const getPackageByCatid = async (req, res, next) => {
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

        const packages = await Package.find({ categoryId })

        if (!packages || packages.length === 0) {
            return res.status(404).json({ message: 'no adventure packages for this category' })
        }

        const packageInBase64 = packages.map(s => ({
            _id: s._id,
            name: s.name,
            price: s.price,
            time: s.time,
            place: s.place,
            mealAvailability: s.mealAvailability,
            description: s.description,
            ratings: s.ratings,
            categoryId: s.categoryId,
            packageImage: s.packageImage && s.packageImage.data ? `data:${s.packageImage.contentType};base64,${s.packageImage.data.toString('base64')}` : null

        }));


        res.status(200).json(packageInBase64);

        next()


    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};

// get  package by  id
export const getPackageById = async (req, res, next) => {
    try {

        const { id } = req.params

        // check required fields

        if (!id) {
            return res.status(400).json({ message: 'adventure place ID is required' })
        }

        const packages = await Package.findById({_id: id })

        if (!packages) {
            return res.status(404).json({ message: 'no adventure packages for this ID' })
        }

        const onepackageInBase64 = {
            _id: packages._id,
            name: packages.name,
            price: packages.price,
            time: packages.time,
            place: packages.place,
            mealAvailability: packages.mealAvailability,
            description: packages.description,
            ratings: packages.ratings,
            categoryId: packages.categoryId,
            packageImage: packages.packageImage && packages.packageImage.data ? `data:${packages.packageImage.contentType};base64,${packages.packageImage.data.toString('base64')}` : null

        };


        res.status(200).json(onepackageInBase64);

        next()


    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};

// get  packages
export const getaAllpackages = async (req, res, next) => {
    try {


        const packages = await Package.find()

        if (!packages) {
            return res.status(404).json({ message: 'no adventure packages' })
        }

        const allPackagesInBase64 = {
            _id: packages._id,
            name: packages.name,
            price: packages.price,
            time: packages.time,
            place: packages.place,
            mealAvailability: packages.mealAvailability,
            description: packages.description,
            ratings: packages.ratings,
            categoryId: packages.categoryId,
            packageImage: packages.packageImage && packages.packageImage.data ? `data:${packages.packageImage.contentType};base64,${packages.packageImage.data.toString('base64')}` : null

        };


        res.status(200).json(allPackagesInBase64);

        next()


    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};





