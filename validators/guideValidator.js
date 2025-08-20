import Joi from 'joi';
import {AppError} from '../utils/errorHandler.js'

//guide validation scema
const guideValidationSchema = Joi.object({
    guideRegno: Joi.string().required().messages({
        'string.empty': 'Register No is required'
    }),
    guideName: Joi.string().required().messages({
        'string.empty': 'Name is required'
    }),
    guideFee: Joi.number().required().messages({
        'number.empty': 'Fee is required'
    }),
    guideAdventureCategory: Joi.string().required().messages({
        'string.empty': 'Adventure Category is required'
    }),
    guideAdventurePlace: Joi.string().required().messages({
        'string.empty': 'Adventure place is required'
    }),
    guideCategory: Joi.string().required().messages({
        'string.empty': 'Category is required'
    }),
    language: Joi.string().required().messages({
        'string.empty': 'anguage is required'
    }),
    ratings: Joi.string().required().messages({
        'string.empty': 'rating is required'
    }),
    guidePhoneNo: Joi.string().required().messages({
        'string.empty': 'phone no is required'
    }),
    guideEmail: Joi.string().email().required().messages({
        'string.empty': 'email is required'
    }),
    guideAddress: Joi.string().required().messages({
        'string.empty': 'email is required'
    }),
    guideValidity: Joi.string().required().messages({
        'string.empty': 'email is required'
    }),



    
});

//middleware function to validate guide
const validateGuide = async(req, res, next) => {
   
    const { error } = guideValidationSchema.validate(req.body, { abortEarly: false });
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

export default validateGuide;