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
<<<<<<< HEAD
    enum: ["Admin", "Manager", "Cashier", "Biller"],
    default: "Biller",
  },
  password: {
    type: String,
   
=======
    enum: ["admin", "manager", "cashier", "biller"],
    default: "employee",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
>>>>>>> 049f0438929ae15cf20d439380297b5c2676aa4e
   
  },
  passwordConfirm: {
    type: String,
<<<<<<< HEAD
   
=======
    required: [true, "A user must have a password confirm"],
>>>>>>> 049f0438929ae15cf20d439380297b5c2676aa4e
   
  },
});

export const Employee = mongoose.model('Employee', employeeSchema);
