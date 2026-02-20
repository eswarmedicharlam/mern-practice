const Product = require("../models/product.model");


// 🔐 Admin only - Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.userId
    });

    res.status(201).json({
      message: "Product created",
      product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// 📦 Get All Products (Public)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

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
