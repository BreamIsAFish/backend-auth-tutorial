const roomModel = require('./models/room');
const room = require('../models/room');

module.exports = {
      getAll: function(req, res, next) {
            let allRoom = [];
            roomModel.find({}, function(err, rooms) {
                  if(err) next(err);
                  else {
                        for (let room in rooms) {
                              allRoom.push({id: room._id,
                                    room: room.roomName, 
                                    date: room.date, 
                                    available: room.available
                              });
                        }
                        res.json({status: 'success',
                              message: 'Room list found',
                              data: {rooms: allRoom}
                        });
                  }
            });
      },

      create: function(req, res, next) {
            roomModel.create({
                  roomName: req.body.roomName,
                  date: req.body.date,
                  available: req.body.available
            }, function(err, reault) {
                  if(err) next(err);
                  else {
                        res.json({
                              status: 'success',
                              message: 'Room created successfully',
                              data: null
                        });
                  }
            });
      },

      updateById: function(req, res, next) {
            roomModel.findByIdAndUpdate(req.body.roomId, {available:req.body.available},
                  function(err, result) {
                        if(err) next(err)
                        else {
                              res.json({
                                    status: 'success',
                                    message: 'Update successful',
                                    data: null
                              });
                        }
                  });
      },

      deleteById: function(req, res, next) {
            roomModel.findByIdAndRemove(req.params.roomId, function(err, roomInfo){
                  if(err) next(err);
                  else {
                        res.json({
                              status:"success", 
                              message: "Room deleted successfully", 
                              data:null
                        });
                  }
            });
      }

}