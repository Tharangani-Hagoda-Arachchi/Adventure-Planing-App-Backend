import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import Joi from 'joi';


// Define the User Schema
const guideSchema = new mongoose.Schema({

    guideRegno: {
        type: String,
        required: true,
    },

    guideName: {
        type: String,
        required: true,
    },
    
    guideFee: {
        type: Number,
        required: true,
        
    },
    guideAdventureCategory: {
        type: String,
        required: true,
        
    },
    guideAdventurePlace: {
        type: String,
        required: true,
        
    },

    guideCategory: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,       
    },
    ratings:{
        type: Number
    
    },
    guidePhoneNo: {
        type: String,
        required: true,       
    },
    guideEmail: {
        type: String,
        required: true,       
    },
    guideAddress: {
        type: String,
        required: true,       
    },
    guideValidity: {
        type: String,
        required: true,       
    },
    guideImage: {
        data: Buffer,
        contentType: String
    }
}, );




// Create the Guide model
const Guide = mongoose.model('Guide',guideSchema);

export default Guide;
