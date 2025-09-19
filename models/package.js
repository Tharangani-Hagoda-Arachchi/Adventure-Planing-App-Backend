import mongoose from "mongoose";


// Define the adventure site
const PackageSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
   time: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    mealAvailability: {
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

    packageImage: {
        data: Buffer,
        contentType: String
    }
}, );




// Create the Guide model
const Package = mongoose.model('Package',PackageSchema);

export default Site;
