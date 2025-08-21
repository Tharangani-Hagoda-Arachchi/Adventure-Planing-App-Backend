import Joi from 'joi';
import {AppError} from '../utils/errorHandler.js'

//guide validation scema
const AdventureValidationSchema = Joi.object({
    adventureTyoe: Joi.string().required().messages({
        'string.empty': 'Type is required'
    }),
});

//middleware function to validate guide
const validateAdventure = async(req, res, next) => {
   
    const { error } = AdventureValidationSchema.validate(req.body, { abortEarly: false });
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

export default validateAdventure;