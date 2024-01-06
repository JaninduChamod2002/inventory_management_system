const Category = require('./../models/categoryModel');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.staus(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories: categories,
      },
    });
  } catch (err) {
    next();
  }
};
