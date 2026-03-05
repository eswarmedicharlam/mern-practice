const Product = require("../models/product.model");



exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.userId
    });

    res.status(201).json({
      statusCode: 200,
      message: "Product created successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateProduct = async (req, res) => {
  debugger
  try {
    const { _id, ...updateData } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const updated = await Product.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
