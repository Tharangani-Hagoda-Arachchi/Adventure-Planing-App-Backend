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
    guideCategory: Joi.string().required().messages({
        'string.empty': 'Category is required'
    }),
    language: Joi.string().required().messages({
        'string.empty': 'anguage is required'
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