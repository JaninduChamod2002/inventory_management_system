const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    customerID : {
        type : String,
        required: [true, "Customer ID is Required!"],
    },
   
    name : {
        type : String,
        unique : true,
        required : [true, "Customer Name is Required!"],
    },

    contactNo : {
        type : Number,
        required :[true, "Contact Number is Required!"],
    },

    purchaseHistory : {
        type : String,
        
    },

    address : {
        type : String , 
        unique : true,
        required : [true, "Customer Address ID is Required!"],

    },

    dateOfBirth : {
        type : Date,
        required : [true, "Transaction Date is Required!"],
            
    },        

    


});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;