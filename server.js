const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route
const personRoute = require("./routes/person");

// Middleware
const routeInfo = require('./middleware/routeInfo')

app.use('/person', routeInfo, personRoute);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});