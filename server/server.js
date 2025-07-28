const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');


const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())
const userRoutes = require('./routes/userRouter');
app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("listening")
})