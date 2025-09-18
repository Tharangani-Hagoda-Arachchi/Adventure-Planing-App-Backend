import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import Joi from 'joi';


// Define the User Schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,       
    },
        token: {
        type: [String],
        default: []
    }

}, );

//password validation schema
const passwordSchema = Joi.string()
    .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/))
    .required()
    .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, number, special character, and be at least 6 characters long',
    });

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            //password vlidation 
            const { error } = passwordSchema.validate(this.password);
            if (error) {
                return next(new Error(error.details[0].message)); // Return validation error if password doesn't meet requirements
            }
            
            //hash password
            this.password = await bcrypt.hash(this.password, 10);

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});



// Create the User model
const User = mongoose.model('User',userSchema);

export default User;
