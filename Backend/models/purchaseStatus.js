const mongoose = require('mongoose');

const purchaseStatusSchema = new mongoose.Schema({

    orderID: {
        type: String,
        unique: true,
        required: [true, "Order ID is required"],
    },
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
    },
    paidDate:{
        type:Date,
        default: null,
    },
    status: {
        type: String,
        required: [true, "Order status is required"],
        
    }
});

const PurchaseStatus = mongoose.model("PurchaseStatus", purchaseStatusSchema);
module.exports = PurchaseStatus;