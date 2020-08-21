const express = require("express"),
        app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

// jwt
const jwt = require('jwt-simple');
const passport = require("passport");
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const SECRET = 'DUCK IT';


app.use(bodyParser.json());

// create strategy
const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: SECRET
};
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
        if(payload.sub == "beam")
                done(null, true);
        else 
                done(null, false);
})

// connect strategy into passport
passport.use(jwtAuth);

// create passport middleware
const requireJwtAuth = passport.authenticate('jwt', {session: false});

// const middleware = (req, res, next) => {
//         if(req.headers.authorization == 'eiei')
//                 next();
//         else
//                 res.send("Unauthorization");
// };

app.get('/', requireJwtAuth, (req, res) => {
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
        res.send(jwt.encode(payload, SECRET));
});

app.listen(port, () => {
        console.log("Server is running on port " + port)
});