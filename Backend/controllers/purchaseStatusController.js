const PurchaseStatus = require('../models/purchaseStatus');

const newPurchaseStatusController = async (req, res) => {
    try {
        const orderStatus = new PurchaseStatus(req.body);
        await orderStatus.save();

        return res.status(201).send({
            success: true,
            message: "Purchase order Status successfully added",
            orderStatus
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in adding purchase order",
            error: error.message
        });
    }
};

const getAllPurchasesStatus = async (req, res) => {
    try {
        const orderStatus = await PurchaseStatus.find();
        res.status(200).json({
            success: true,
            message: "All purchase orders status fetched successfully",
            orderStatus
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching purchase orders status",
            error: error.message
        });
    }
};

const getOnePurchaseStatus = async (req, res) => {
    try {
        const orderStatus = await PurchaseStatus.findOne({ orderID: req.params.id });

        if (!orderStatus) {
            return res.status(404).send({
                success: false,
                message: "Purchase order Status not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Purchase order Status fetched successfully",
            orderStatus
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching purchase order status",
            error: error.message
        });
    }
};

const deletePurchaseStatus = async (req, res) => {
    try {
        const deletedOrderStatus = await PurchaseStatus.findOneAndDelete({ orderID: req.params.id });

        if (!deletedOrderStatus) {
            return res.status(404).send({
                success: false,
                message: "Purchase order not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Purchase order status deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting purchase order status",
            error: error.message
        });
    }
};


const updatePurchaseStatus = async (req, res) => {
    try {
        const {  totalAmount, paidDate, status } = req.body;
        const update = { totalAmount, paidDate, status };

        await PurchaseStatus.findOneAndUpdate({ orderID: req.params.id }, update);
        res.status(200).send({
            success: true,
            message: "Purchase order status updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in updating purchase order status",
            error: error.message
        });
    }
};


module.exports = { newPurchaseStatusController, getAllPurchasesStatus, getOnePurchaseStatus, deletePurchaseStatus, updatePurchaseStatus };
