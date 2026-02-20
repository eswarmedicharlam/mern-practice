const express = require("express");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controller/product.controller");

const router = express.Router();


// Public - Anyone logged in can view
router.get("/", protect, getProducts);
// router.get("/", getProducts);


// Admin only routes
router.post("/", protect, authorize("admin"), createProduct);

router.put("/:id", protect, authorize("admin"), updateProduct);

router.delete("/:id", protect, authorize("admin"), deleteProduct);

module.exports = router;
