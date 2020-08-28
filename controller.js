const userModel = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jasonwebtoken');

module.exports = {
        register: function(req, res, next) {
                userModel.create({
                        username: req.body.username,
                        password: req.body.password
                }, function(err, result){
                        if(err) next(err);
                        else res.json({
                                status: "success",
                                message: "Register Successfully",
                                data: null
                        });
                });
        },

        authenticate: function(req, res, next){
                userModel.findOne({username: req.body.username.body},
                        function(err, userInfo){
                                if(err) next(err);
                                else {
                                        if(bcrypt.compareSync(req.body.password, userInfo.password)){
                                                const token = jwt.sign({id: userInfo._id,}, req.app.get('secretKey'),
                                                {expireIn: '1h'});
                                                res.json({
                                                        status: "success",
                                                        message: "User found",
                                                        data: {user: userInfo, token: token}
                                                });
                                        } else {
                                                res.json({
                                                        status: "error",
                                                        message: "Invalid username/password",
                                                        data: null
                                                });
                                        }
                                }
                        })
        }
}