import User from "../models/user.js";
import { AppError } from '../utils/errorHandler.js';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from "../utils/token.js";

const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN,
    NODE_ENV
} = process.env;


const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email regex
const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(password); // At least 6 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char


export const addUser = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body


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
        const payload = { id: newUser._id, email: newUser.email }
        const accessToken = createAccessToken(payload, JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRES_IN || '15m')
        const refreshToken = createRefreshToken(payload, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRES_IN || '7d')

        //newUser.token.push(accessToken)
        await newUser.save()

        res.status(201).json({ message: 'New user Added successful', accessToken });

        next()


    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};

//user login
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {

            throw new AppError('Email password are required', 422, 'ValidationError');
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw new AppError('Inavalid Email or Password', 401, 'AuthenticationError');
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new AppError('Inavalid Email or Password', 401, 'AuthenticationError');
        }

        const payload = { id: user._id, email: user.email }
        const accessToken = createAccessToken(payload, JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRES_IN || '15m')
        //const refreshToken = createRefreshToken(payload, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRES_IN || '7d')

        //user.token.push(accessToken)
        //await user.save()


        res.status(200).json({
            success: true,
            message: 'Login successful',
            accessToken
        });

        next()



    } catch (error) {
        next(error)
    }
}


// fetch user form id get by token
export const getUserFromToken = async (req, res, next) => {
  try {

    if (!req.user || !req.user.id) {
      throw new AppError("User ID not found in token", 401, "AuthenticationError");
    }


    const user = await User.findById(req.user.id);

    if (!user) {
      throw new AppError("User not found", 404, "NotFoundError");
    }


    const userresult = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    res.status(200).json(userresult);

  } catch (error) {
    next(error);
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    // Find user
    const user = await User.findById(_id = id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;

    // Save updated user
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};








