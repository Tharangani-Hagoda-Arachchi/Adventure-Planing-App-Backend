import User from "../models/user.js";
import { AppError } from '../utils/errorHandler.js'; 
import bcrypt from 'bcrypt';


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

//user login
export const userLogin = async (req, res, next) => {
    try{
        const { email,password} = req.body
        
        if (!email || !password) {
            throw new AppError('Email password are required', 422, 'ValidationError');
        }

        const user = await User.findOne({email})

        if (!user){
            throw new AppError('Email password are invalid', 401, 'AuthenticationError');
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError('Email or Password invalid', 401, 'AuthenticationError');
        }

       
        res.status(200).json({
            success: true,
            message: 'Login successful',
        });

        next()
        
        

    } catch(error){
        next(error)
    }
}






