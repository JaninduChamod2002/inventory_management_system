const mongoose = require('mongoose');
const Purchase = require('../models/purchaseModel');

const newPurchaseController = async (req, res) => {
    try {
        const order = new Purchase(req.body);
        await order.save();

        return res.status(201).send({
            success: true,
            message: "Purchase order successfully added",
            order
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

const getAllPurchases = async (req, res) => {
    try {
        const orders = await Purchase.find();
        res.status(200).json({
            success: true,
            message: "All purchase orders fetched successfully",
            orders
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

const getOnePurchase = async (req, res) => {
    try {
        const order = await Purchase.findOne({ orderID: req.params.id });

        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Purchase order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Purchase order fetched successfully",
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching purchase order",
            error: error.message
        });
    }
};

const deletePurchase = async (req, res) => {
    try {
        await Purchase.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "Purchase order deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting purchase order",
            error: error.message
        });
    }
};

const updatePurchase = async (req, res) => {
    try {
        const { orderID, orderDate, supplier, products, totalAmount, status } = req.body;
        const update = { orderID, orderDate, supplier, products, totalAmount, status };
        
        await Purchase.findByIdAndUpdate(req.params.id, update);
        res.status(200).send({
            success: true,
            message: "Purchase order updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in updating purchase order",
            error: error.message
        });
    }
};

module.exports = { newPurchaseController, getAllPurchases, getOnePurchase, deletePurchase, updatePurchase };

