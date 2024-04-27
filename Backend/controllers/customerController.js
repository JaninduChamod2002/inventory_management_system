const Customer = require("./../models/customerModel");

const newCustomerController = async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();

        return res.status(201).send({
            success: true,
            message: "Customer successfully created",
            customer: newCustomer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating customer",
            error: error.message
        });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customerData = await Customer.find();
        res.status(200).json({
            success: true,
            message: "All customers fetched successfully",
            customerData
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching customers",
            error: error.message
        });
    }
};


const getOneCustomer = async (req, res) => {
    try {
        const customerData = await Customer.findOne({ customerID: req.params.id });

        if (!customerData) {
            return res.status(404).send({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer found",
            customerData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching customer",
            error: error.message
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findOneAndDelete({ customerID: req.params.id });
        if (!deletedCustomer) {
            return res.status(404).send({
                success: false,
                message: "Customer not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Customer deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting customer",
            error: error.message
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const filter = { customerID: req.params.id };
        const update = req.body;

        const updatedCustomer = await Customer.findOneAndUpdate(filter, update, { new: true });

        if (!updatedCustomer) {
            return res.status(404).send({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Customer updated successfully",
            customer: updatedCustomer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating customer",
            error: error.message
        });
    }
};

module.exports = { newCustomerController, getAllCustomers, getOneCustomer, deleteCustomer, updateCustomer };

// const newCustomerController = async (req, res) => {
//   try {
//       const newCustomer = new Customer(req.body);
//       await newCustomer.save();

//       return res.status(201).send({
//           success: true,
//           message: "Customer successfully created",
//           customer: newCustomer
//       });
//   } catch (error) {
//       console.log(error);
//       res.status(500).send({
//           success: false,
//           message: "Error in creating customer",
//           error: error.message
//       });
//   }
// };

// const getOneCustomer = async (req, res) => {
//   try {
//       const customerData = await Customer.findOne({ customerID: req.params.cid });

//       if (!customerData) {
//           return res.status(404).send({
//               success: false,
//               message: "Customer not found"
//           });
//       }

//       res.status(200).json({
//           success: true,
//           data: customerData
//       });
//   } catch (error) {
//       console.log(error);
//       res.status(500).send({
//           success: false,
//           message: "Error in fetching customer",
//           error: error.message
//       });
//   }
// };

// const deleteCustomer = async (req, res) => {
//   try {
//       await Customer.findByIdAndDelete(req.params.objid);
//       res.status(200).send({
//           success: true,
//           message: "Customer deleted successfully"
//       });
//   } catch (error) {
//       console.log(error);
//       res.status(500).send({
//           success: false,
//           message: "Error in deleting customer",
//           error: error.message
//       });
//   }
// };

// const updateCustomer = async (req, res) => {
//   try {
//       const filter = { customerID: req.params.cid };
//       const update = req.body;

//       const updatedCustomer = await Customer.findOneAndUpdate(filter, update, { new: true });

//       if (!updatedCustomer) {
//           return res.status(404).send({
//               success: false,
//               message: "Customer not found"
//           });
//       }

//       res.status(200).send({
//           success: true,
//           message: "Customer updated successfully",
//           customer: updatedCustomer
//       });
//   } catch (error) {
//       console.log(error);
//       res.status(500).send({
//           success: false,
//           message: "Error in updating customer",
//           error: error.message
//       });
//   }
// };

// module.exports = { newCustomerController, getOneCustomer, deleteCustomer, updateCustomer };

// const newCustomerController = async (req, res) => {
//   try {
//       const newCus = new customerModel(req.body);
//       await newCus.save();

//       return res.status(201).send({
//           success: true,
//           message: "Return successfully created",
//           return: newCus
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//           success: false,
//           message: "Error in creating return",
//           error: error.message
//       });
//   }
// };

// exports.getAllCustomer = async (req, res, next) => {
//     const customer = await Customer.find();

//     res.status(200).json({
//         status: "success",
//         results: categories.length,
//         data: {
//           customers: customers,
//         },
//       });
//     };

//     exports.getCustomer = async (req, res, next) => {
//         const customer = await Customer.findById(req.params.id);
      
//         if (!customer) {
//           return next();
//         }
//         res.status(200).json({
//             status: "success",
//             data: {
//               customer,
//             },
//           });
//         };

//         exports.createCustomer = async (req, res, next) => {
//             const newCustomer = await Customer.create(req.body);
          
//             res.status(201).json({
//               status: "success",
//               data: {
//                 newCustomer,
//               },
//             });
//           };

//           exports.updateCustomer = async (req, res, next) => {
//             const updatedCustomer = await Customer.findByIdAndUpdate(
//               req.params.id,
//               req.body,
//               {
//                 new: true,
//                 runValidators: true,
//               }
//             );
//             if (!updatedCategory) {
//                 return next();
//               }
            
//               res.status(200).json({
//                 status: "success",
//                 data: {
//                   updatedCategory,
//           },
//         });
//     };

//     exports.deleteCustomer = async (req, res, next) => {
//         await Customer.findByIdAndDelete(req.params.id);
      
//         res.status(204).json({
//           status: "success",
//           data: {
//             data: null,
//           },
//         });
//       };
      
