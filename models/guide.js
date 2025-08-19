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

    guideCategory: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,       
    },
    ratings:[{
        type: Number,
        min:1,
        max: 5,
        default:1      
    }],
    guideImageUrl:{
        type: String
    }
}, );

//for average ratings virtual scema
 guideSchema.virtual("averateRate").get(function(){
    if (this. ratings.length === 0) return 0;
    const sum = this. ratings.reduce((acc, r) => acc + r,0);
    return(sum / this.ratings.length).toFixed(1)
 })

 guideSchema.set("toJSON", {virtuals: true});


// Create the Guide model
const Guide = mongoose.model('Guide',guideSchema);

export default Guide;
