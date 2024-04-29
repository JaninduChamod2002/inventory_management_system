const Return = require("../models/returnModel"); // Make sure to adjust the path as needed


const newReturnController = async (req, res) => {
    try {
        const newReturn = new ReturnModel(req.body);
        await newReturn.save();

        return res.status(201).send({
            success: true,
            message: "Return successfully created",
            return: newReturn
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating return",
            error: error.message
        });
    }
};
const getAllReturns = async (req, res) => {
    try {
        const returnData = await ReturnModel.find();
        res.status(200).json({
            success: true,
            message: "All returns fetched successfully",
            returnData
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching purchase orders",
            error: error.message
        });
    }
};

const getOneReturn = async (req, res) => {
    try {
        const returnData = await ReturnModel.findOne({ returnID: req.params.id });

        if (!returnData) {
            return res.status(404).send({
                success: false,
                message: "Return not found"
            });
        }

        res.status(200).json({
            success: true,
            message:"fgjjj",
            returnData
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching return",
            error: error.message
        });
    }
};

const deleteReturn = async (req, res) => {
    try {
        const deletedReturn = await Return.findOneAndDelete({returnID: req.params.id});
        if (!deletedReturn) {
            return res.status(404).send({
                success: false,
                message: "Return not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Return deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting return",
            error: error.message
        });
    }
};


const updateReturn = async (req, res) => {
    try {
        const filter = { returnID: req.params.id };
        const update = req.body;

        const updatedReturn = await ReturnModel.findOneAndUpdate(filter, update, { new: true });

        if (!updatedReturn) {
            return res.status(404).send({
                success: false,
                message: "Return not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Return updated successfully",
            return: updatedReturn
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating return",
            error: error.message
        });
    }
};

module.exports = { newReturnController, getAllReturns,getOneReturn, deleteReturn, updateReturn };
//
