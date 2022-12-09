// IMPORT PACKAGES
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const PORT = 3000
const DB = "mongodb+srv://cherifhassan:borkounou123@cluster0.gyhgeap.mongodb.net/?retryWrites=true&w=majority";

const app = express();

// Import FROM OTHER FILES
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

// Midlleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

//connections
mongoose.connect(DB).then(() => {
    console.log('Connection successful');
}).catch(e => {
    console.log(e);
});

mongoose.connection.useDb('test')

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Connected at port ${PORT}`)
// })

app.listen(process.env.PORT || 3000, () => {
    console.log(`Connected at port ${process.env.PORT}`)
})