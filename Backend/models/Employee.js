import mongoose from "mongoose";

const employeeSchema =  mongoose.Schema({
  EmpID: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  
  phone: {
    type: String,
    unique: true,
    required: [true, 'User must have a phone number'],
   
  },
  role: {
    type: String,

    enum: ["Admin", "Manager", "Cashier", "Biller"],
    default: "Biller",
  },
  password: {
    type: String,
   

    enum: ["admin", "manager", "cashier", "biller"],
    default: "employee",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],

   
  },
  passwordConfirm: {
    type: String,
   

    required: [true, "A user must have a password confirm"],

   
  },
});

export const Employee = mongoose.model('Employee', employeeSchema);
