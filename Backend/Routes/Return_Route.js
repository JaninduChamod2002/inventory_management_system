import express from 'express';
import {Return} from '../Models/Return.js';

const router = express.Router();

// Route for saving a new return
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.returnID ||
      !request.body.returnDate ||
      !request.body.returnItemN ||
      !request.body.reason ||
      !request.body.cusName ||
      !request.body.cAddress ||
      !request.body.phoneNO
    ) {
      return response.status(400).send({
        message: 'Send all required fields: returnID, returnDate, returnItemN, reason, cusName, cAddress, phoneNO',
      });
    }
    const newReturn = {
      returnID: request.body.returnID,
      returnDate: request.body.returnDate,
      returnItemN: request.body.returnItemN,
      reason: request.body.reason,
      cusName: request.body.cusName,
      cAddress: request.body.cAddress,
      phoneNO: request.body.phoneNO,
      rStatus: request.body.rStatus,
    };

    const createdReturn = await Return.create(newReturn);

    return response.status(201).send(createdReturn);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all returns from the database
router.get('/', async (request, response) => {
  try {
    const returns = await Return.find({});

    return response.status(200).json({
      count: returns.length,
      data: returns,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one return by ID from the database
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const returnedItem = await Return.findById(id);

    return response.status(200).json(returnedItem);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a return
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.returnID ||
      !request.body.returnDate ||
      !request.body.returnItemN ||
      !request.body.reason ||
      !request.body.cusName ||
      !request.body.cAddress ||
      !request.body.phoneNO
    ) {
      return response.status(400).send({
        message: 'Send all required fields: returnID, returnDate, returnItemN, reason, cusName, cAddress, phoneNO',
      });
    }

    const { id } = request.params;

    const updatedReturn = await Return.findByIdAndUpdate(id, request.body, { new: true });

    return response.status(200).json(updatedReturn);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a return
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    await Return.findByIdAndDelete(id);

    return response.status(200).send({ message: 'Return deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
