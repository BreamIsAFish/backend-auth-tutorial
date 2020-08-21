const bodyParser = require("body-parser");

const express = require("express"),
        cors = require("cors"),
        jwt = require('jwt-simple'),
        app = express(),
        port = process.env.PORT || 5000;

// app.use(cors());
app.use(bodyParser.json());

const middleware = (req, res, next) => {
        if(req.headers.authorization == 'eiei')
                next();
        else
                res.send("Unauthorization");
};

app.get('/', middleware, (req, res) => {
        res.send({mesaage:"It's working"});
});

const loginMiddleware = (req ,res, next) => {
        if(req.body.username == 'beam' && req.body.password == 'paan')
                next();
        else 
                res.send("Wrong username or password");
};

app.post('/login', loginMiddleware, (req, res) => {
        const payload = {
                sub: req.body.username,
                iat: new Date().getTime()
        };
        const SECRET = "KUAY";
        res.send(jwt.encode(payload, SECRET));
});

app.listen(port, () => {
        console.log("Server is running on port " + port)
});