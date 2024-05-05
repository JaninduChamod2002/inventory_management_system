const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({

    orderID: {
        type: String,
        unique: true,
        required: [true, "Order ID is required"],
    },

    supplier: {
        type: String,
        required: true,
    },

    orderDate: {
        type: Date,
        default: Date.now(),
    },

    requiredDate:{
        type:Date,
        required:true,
    },
    
    Items: [{
        name: {
            type: String,
            required:true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: {
            type: Number,
            required: true,
        },
        
    }],
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
