
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const protect = require("./middleware/auth.middleware");


const app = express();

app.use(express.json());

/* ---------- PUBLIC ROUTES ---------- */
app.use("/api/auth", authRoutes);

/* ---------- PROTECTED ROUTES ---------- */
app.use(protect);  // All routes below require JWT
app.use("/api/products", productRoutes);

// Example protected test route
app.get("/api/profile", (req, res) => {
    res.json({
        message: "Profile accessed",
        user: req.user
    });
});

module.exports = app;
