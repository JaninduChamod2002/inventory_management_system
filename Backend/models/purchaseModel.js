const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({

    orderID: {
        type: String,
        unique: true,
        required: [true, "Order ID is required"],
    },
    orderDate: {
        type: Date,
        default: Date.now(),
    },
    supplier: {
        type: String,
        required: true,
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
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
    },
    status: {
        type: String,
        default: "pending",
        required: [true, "Order status is required"],
        enum: ["paid", "pending"]
    }
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
