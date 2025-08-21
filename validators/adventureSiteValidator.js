import Joi from 'joi';
import {AppError} from '../utils/errorHandler.js'

//site validation scema
const siteValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required'
    }),
    openTime: Joi.string().required().messages({
        'string.empty': 'Open Time is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'descriotion is required'
    }),
    ratings: Joi.number().required().messages({
        'number.empty': 'rating is required'
    }),
    categoryId: Joi.string().required().messages({
        'string.empty': ' Category ID is required'
    }),
    guideAdventurePlace: Joi.string().required().messages({
        'string.empty': 'Adventure place is required'
    }),
    guideCategory: Joi.string().required().messages({
        'string.empty': 'Category is required'
    }),
    
});

//middleware function to validate site
const validateSite = async(req, res, next) => {
   
    const { error } = siteValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return next(new AppError(
            'Validation failed',
            400,
            'ValidationError',
            errorMessages
        ));    
    }
   
    next();
};

export default validateSite;