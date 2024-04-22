const ReturnModel = require('../models/returnModel');

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

const getOneReturn = async (req, res) => {
    try {
        const returnData = await ReturnModel.findOne({ returnID: req.params.rid });

        if (!returnData) {
            return res.status(404).send({
                success: false,
                message: "Return not found"
            });
        }

        res.status(200).json({
            success: true,
            data: returnData
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
        await ReturnModel.findByIdAndDelete(req.params.objid);
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
        const filter = { returnID: req.params.rid };
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

module.exports = { newReturnController, getOneReturn, deleteReturn, updateReturn };
