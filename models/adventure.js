import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import Joi from 'joi';


// Define the User Schema
const adventureSchema = new mongoose.Schema({

    adventureType: {
        type: String,
        required: true,

    },
 
} );


const Adventure = mongoose.model('Adventure',adventureSchema);

export default Adventure;