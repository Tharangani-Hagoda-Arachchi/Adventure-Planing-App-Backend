import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true
    },
    address: { 
        type: String, 
        required: true
    },
    date: { 
        type: Date, 
        required: true
    },
    travellers: { 
        type: Number, 
        required: true
    },
    bookingTypeId: { 
        type: String, 
        required: true
    },
    pricePerPerson: { 
        type: Number, 
        required: true
    },
    totalPrice: { 
        type: Number, 
        required: true
    },
    guideId: { 
        type: String, 
        default: null
    },
    packageId: { 
        type: String, 
        default: null
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
