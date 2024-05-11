import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        cusID: {
            type: String, 
            unique: true
        },
        date: {
            type: Date,
            required: true,
            default : Date.now()
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        NIC: {
            type: String,
            required: true 
        },
        phone: {
            type: String,
            required: true 
        },
        email: {
            type: String,
            default: null
        },
       
    },
    
);


export const Customer = mongoose.model('Customer', customerSchema);
