const express = require("express"),
        cors = require("cors"),
        app = express(),
        port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => {
        console.log("Server is running on " + port)
});

app.get('/', (req, res) => {
        res.send({mesaage:"It's working"});
});