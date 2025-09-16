import mongoose from "mongoose";


// Define the adventure site
const adventureSiteSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },

    openTime: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        required: true,
        
    },
    ratings: {
        type: Number,
        required: true,
        
    },

    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Adventure",   
        required: true
    },

    siteImage: {
        data: Buffer,
        contentType: String
    }
}, );




// Create the Guide model
const Site = mongoose.model('Sites',adventureSiteSchema);

export default Site;
