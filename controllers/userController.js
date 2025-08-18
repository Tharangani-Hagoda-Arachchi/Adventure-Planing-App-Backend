import User from "../models/user.js";
import { AppError } from '../utils/errorHandler.js'; 


const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email regex
const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(password); // At least 6 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char


export const addUser = async (req, res, next) => {
    try{
        const {name, email,phone,password } = req.body


        // check email is already exists
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        // create nwe user
        const newUser = new User({
            name,
            email,
            phone,
            password 
        });

        await newUser.save();

        res.status(201).json({ message: 'New user Added successful' });

        next()
    

    } catch(error){
        next(error); // Pass error to the global error handler
    }
};





