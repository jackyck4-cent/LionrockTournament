var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
let mongoose = require("mongoose");

let DB = require("../config/db")
let Tournament = require("../models/tournament");
let Player = require("../models/player");
let userModel = require("../models/user");
const e = require('express');
let User = userModel.User
/*
module.exports.add = function(req, res, next) {

    var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

    let newEntry = new Tournament({
        name: req.body.name,
        owner_id : id,
        description : req.body.description,
        enroll_start_at: req.body.enroll_start_at,
        enroll_end_at: req.body.enroll_end_at,
        has_started : req.body.has_started,
        has_finished : req.body.has_finished,
        champion : "",
        no_of_players : req.body.no_of_players,
        players : []
    });

    Tournament.create(newEntry, (err, resultdata) => {
        if (err) {
            console.log(err);
            res.json({ status: 0 , 'message' : 'Insertion Error' });
        } else {
          // refresh the book list
            res.json({ status: 1 , 'message' : 'OK' });
        }
      });
}

module.exports.edit = function(req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.id);

    let item = {
        name: req.body.name,
        description : req.body.description,
        enroll_start_at: req.body.enroll_start_at,
        enroll_end_at: req.body.enroll_end_at,
        has_started : req.body.has_started,
        has_finished : req.body.has_finished,
        no_of_players : req.body.no_of_players,
    };
      Tournament.updateOne({ _id: id }, item, (err) => {
        if (err) {
            console.log(err);
            res.json({ status: 0 , 'message' : 'Update Error' });
        } else {
          //refresh the book list
          res.json({ status: 1 , 'message' : 'OK' });
        }
      });
}

module.exports.delete = function(req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.id);

    
    Tournament.remove({ _id: id }, (err) => {
        if (err) {
            res.json({ status: 0 , 'message' : 'Delete Error' });
        } else {
          //refresh book list
          res.json({ status: 1 , 'message' : 'OK' });
        }
    });
}
*/

module.exports.playerlist = function(req, res, next) {

  items = {}
  User.find().then( ( users ) => {
    for (var a=0;a<users.length;a++)
    {
      items[users[a].reference] = {
        user_id: users[a].reference,
        name: users[a].display_name,
        email: users[a].email,
      }
    }

    res.json({ status: 1 , 'data' : items });  
  })

     
}

module.exports.list = function(req, res, next) {
  items = {
      '1': {
        tn_id: '1',
        name: 'Street Basketball Api',
        description: 'Let\'s play basketball', 
        owner: 'a0001',
        size: 16,
        start_date: '2022-11-20',
        end_date: '2022-11-27',
        status: 'enrolling',
        players: [],  // list of players
        current_round: '',    // 1=completed, 2=final, 4=semi-final, 8=quarter-final, 16=round-of-16
        champion: '',
        bouts: {
          '_2': [
            // 1st-player, 2nd-player, winner
            ['', '', ''],
          ],
          '_4': [
            // 1st-player, 2nd-player, winner
            ['', '', ''],
            // 3rd-player, 4th-player, winner
            ['', '', ''],
          ],
          '_8': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
          '_16': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
        }
      },
      '2': {
        tn_id: '2',
        name: 'Funny Volley Ball',
        description: 'Let\'s play volley ball', 
        owner: 'a0002',
        size: 8,
        start_date: '2022-11-21',
        end_date: '2022-11-28',
        status: 'enrolling',
        players: ['a0013', 'a0002', 'a0003', 'a0004', 'a0005'],  // list of players
        current_round: '',    // 1=completed, 2=final, 4=semi-final, 8=quarter-final, 16=round-of-16
        champion: '',
        bouts: {
          '_2': [
            // 1st-player, 2nd-player, winner
            ['', '', ''],
          ],
          '_4': [
            // 1st-player, 2nd-player, winner
            ['', '', ''],
            // 3rd-player, 4th-player, winner
            ['', '', ''],
          ],
          '_8': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
          '_16': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
        }
      }, 
      '3': {
        tn_id: '3',
        name: 'Wonderful Fencing',
        description: 'Let\'s play fencing', 
        owner: 'a0011',
        size: 4,
        start_date: '2022-11-22',
        end_date: '2022-11-29',
        status: 'started',
        players: ['a0001', 'a0002', 'a0003', 'a0004'],
        current_round: '_4',
        champion: '',
        bouts: {
          '_2': [
            ['', '', ''],
          ],
          '_4': [
            ['a0001', 'a0002', ''],
            ['a0003', 'a0004', ''],
          ],
          '_8': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
          '_16': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
        }
      },
      '4': {
        tn_id: '4',
        name: 'Stupid Fight',
        description: 'Let\'s fight', 
        owner: 'a0012',
        size: 8,
        start_date: '2022-12-01',
        end_date: '2022-12-07',
        status: 'started',
        players: ['a0001', 'a0002', 'a0003', 'a0004', 'a0005', 'a0006', 'a0007', 'a0008'],
        current_round: '_4',
        champion: '',
        bouts: {
          '_2': [
            ['a0001', 'a0008', ''],
          ],
          '_4': [
            ['a0001', 'a0004', 'a0001'],
            ['a0005', 'a0008', 'a0008'],
          ],
          '_8': [
            ['a0001', 'a0002', 'a0001'],
            ['a0003', 'a0004', 'a0004'],
            ['a0005', 'a0006', 'a0005'],
            ['a0007', 'a0008', 'a0008'],
          ],
          '_16': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
        }
      },
      '5': {
        tn_id: '5',
        name: 'No Name Table Tennis',
        description: 'Let\'s play ping pong', 
        owner: 'a0015',
        size: 8,
        start_date: '2022-12-02',
        end_date: '2022-12-08',
        status: 'completed',
        players: ['a0001', 'a0002', 'a0003', 'a0004', 'a0005', 'a0006', 'a0007', 'a0008'],
        current_round: '_2',
        champion: 'a0007',
        bouts: {
          '_2': [
            ['a0001', 'a0007', 'a0007'],
          ],
          '_4': [
            ['a0001', 'a0004', 'a0001'],
            ['a0005', 'a0007', 'a0007'],
          ],
          '_8': [
            ['a0001', 'a0002', 'a0001'],
            ['a0003', 'a0004', 'a0004'],
            ['a0005', 'a0006', 'a0005'],
            ['a0007', 'a0008', 'a0007'],
          ],
          '_16': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
        }
      },
      '6': {
        tn_id: '6',
        name: 'Wonderful Dancing',
        description: 'Let\'s dance', 
        owner: 'a0010',
        size: 4,
        start_date: '2023-01-02',
        end_date: '2023-01-08',
        status: 'draft',
        players: [],
        current_round: '',
        champion: '',
        bouts: {
          '_2': [
            ['', '', ''],
          ],
          '_4': [
            ['', '', ''],
            ['', '', ''],
          ],
          '_8': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
          '_16': [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
        }
      },
  };

  res.json({ status: 1 , 'data' : items });   
}

module.exports.info = function(req, res, next) {
  
  let tnid = ((req.params.tnid))
  console.log(tnid)
  
  Tournament.find({
      'tn_id' : tnid
  } ).then( ( items ) => {
    
   
    if ( items.length > 0 )
    {
      let entry = items[0];
     
      res.json({ status: 1 , data :  entry }); 
      
        
    }
    else
      res.json({ status: 2 }); 
       
  });

 
}



module.exports.fulllist = function(req, res, next) {
  items = {}
  userlist = {};

  User.find().then( ( users ) => {
    players = {};
    for (var a=0;a<users.length;a++)
    {
      players[users[a].reference] = {
        user_id: users[a].reference,
        name: users[a].display_name,
        email: users[a].email,
      }

      userlist[users[a]._id+""] = users[a].reference;
    }
   

    items.players = players;

    Tournament.find().sort({name:1}).then( ( games ) => {

      tournaments = {};
      for (var a=0;a<games.length;a++)
      {
        
        tournaments[games[a].tn_id] = games[a];
      

      }
      items.tournaments = tournaments;

      res.json({ status: 1 , 'data' : items });       
  });

   
  })
 
}

module.exports.get = function(req, res, next) {

    let id = mongoose.Types.ObjectId(req.params.id);
    console.log(req.params.id);
    Tournament.find({
        _id : id
    } ).then( ( items ) => {
        res.json({ status: 1 , 'data' : items });       
    });
}

module.exports.create = function(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];
  let userinfo = jwt.verify(token, DB.Secret );
  //console.log(userinfo.userId);

  Tournament.estimatedDocumentCount().then( (count) =>  {
      
    strCount = (count+1)+"";
    for (var a=strCount.length;a<4;a++)
      strCount = "0"+strCount;
    strRefer = "t"+strCount;

    const newEntry = new Tournament({
      tn_id: strRefer,
      name : req.body.name,
      description: req.body.description,
      owner_id : mongoose.Types.ObjectId(userinfo.userId),
      owner : userinfo.user_id,
      size : req.body.size,
      start_date : req.body.start_date,
      end_date : req.body.end_date,
      status : req.body.status,
      players : [],
      current_round : '',
      champion : '',
      bouts : {}
    })

    Tournament.create(newEntry, (err, resultdata) => {
      if (err) {
          console.log(err);
          res.json({ status: 0 , 'message' : 'Insertion Error' });
      } else {
        // refresh the book list
          res.json({ status: 1 , 'message' : 'OK' });
      }
    });

         
    
  })  
}

module.exports.update = function(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];
  let userinfo = jwt.verify(token, DB.Secret );
  //console.log(userinfo);
  let tnid = ((req.params.tnid))

  Tournament.find({
      'tn_id' : tnid
  } ).then( ( items ) => {
    
    if ( items.length > 0 )
    {
      let entry = items[0];
            
      
      entry.name = req.body.name;
      entry.description = req.body.description;
      entry.size = req.body.size;
      entry.start_date = req.start_date;
      entry.end_date = req.body.end_date;
      entry.save();
      
      
      
      res.json({ status: 1 , data :  entry });   
    }
       
  });

 // res.json({ status: 1 , 'message' : 'OK' });
}


module.exports.register = function(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];
  let userinfo = jwt.verify(token, DB.Secret );
  //console.log(userinfo);
  let tnid = ((req.params.tnid))
  console.log(tnid)
  
  Tournament.find({
      'tn_id' : tnid
  } ).then( ( items ) => {
    
   
    if ( items.length > 0 )
    {
      let entry = items[0];
      let found = -1;

      for (var a=0;a<entry.players.length;a++)
      {
        if (userinfo.user_id == entry.players[a] )
        {
          found = a;
        }
      } 

      if (found == -1 )
      {
        entry.players.push(userinfo.user_id);
        entry.save();
        res.json({ status: 1 , data :  entry }); 
      }
      else
      {
        res.json({ status: 3 }); 

      }
      
      
        
    }
    else
      res.json({ status: 2 }); 
       
  });

  //res.json({ status: 1 , 'message' : 'OK' });
}

module.exports.enroll = function(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];
  let userinfo = jwt.verify(token, DB.Secret );
  //console.log(userinfo);
  let tnid = ((req.params.tnid))

  Tournament.find({
      'tn_id' : tnid
  } ).then( ( items ) => {
    
    if ( items.length > 0 )
    {
      let entry = items[0];
            
      entry.status = "enrolling";
      entry.save();
      
      
      
      res.json({ status: 1 , data :  entry });   
    }
       
  });

 // res.json({ status: 1 , 'message' : 'OK' });
}

module.exports.start = function(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];
  let userinfo = jwt.verify(token, DB.Secret );
  //console.log(userinfo);
  let tnid = ((req.params.tnid))

  Tournament.find({
      'tn_id' : tnid
  } ).then( ( items ) => {
    
    if ( items.length > 0 )
    {
      tree = [];
      let entry = items[0];
      //'_2'=final, '_4'=semi-final, '_8'=quarter-final, '_16'=round-of-16
      let col = "";
      switch (parseInt(entry.size))
      {
         case 4:
          entry.current_round = "_4";
          col = "_4";
          break;

         case 8 :
          entry.current_round = "_8";
          col = "_8";
          break;

         case 16:
          entry.current_round = "_16";
          col = "_16";
          break;
      }

      
      entry.bouts = {
        '_2': [
          ['', '', ''],
        ],
        '_4': [
          ['', '', ''],
          ['', '', ''],
        ],
        '_8': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        '_16': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      };
      

      
      for (var a=0;a<Math.ceil(entry.players.length / 2);a++)
      {
        tree[a] = [ entry.players[a * 2 ], entry.players[a * 2  + 1 ], ''];
      }
      entry.bouts[col] = tree;
      //bouts: 
      console.log(entry.players)
      console.log(tree);      
      entry.status = "started";
      entry.save();
      
      
      
      res.json({ status: 1 , data :  entry });   
    }
       
  });

 // res.json({ status: 1 , 'message' : 'OK' });
}

module.exports.winner = function(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];
  let userinfo = jwt.verify(token, DB.Secret );
  //console.log(userinfo);
  let tnid = ((req.params.tnid))

  Tournament.find({
      'tn_id' : tnid
  } ).then( ( items ) => {
    
    if ( items.length > 0 )
    {
      let entry = items[0];
            
      //'_2'=final, '_4'=semi-final, '_8'=quarter-final, '_16'=round-of-16
      entry.bouts = req.body.winners.bouts;
      if (entry.current_round == "_2")
      { 
        //entry.status = "completed" ;
      }
      else if (entry.current_round == "_4")
      {
        //entry.current_round = "_2";
        entry.bouts["_2"][0][0] = entry.bouts["_4"][0][2];
        entry.bouts["_2"][0][1] = entry.bouts["_4"][1][2];
      }
      else if (entry.current_round == "_8")
      {
        //entry.current_round = "_4";

        entry.bouts["_4"][0][0] = entry.bouts["_8"][0][2];
        entry.bouts["_4"][0][1] = entry.bouts["_8"][1][2];

        entry.bouts["_4"][1][0] = entry.bouts["_8"][2][2];
        entry.bouts["_4"][1][1] = entry.bouts["_8"][3][2];
      }
      else if (entry.current_round == "_16")
      {
       // entry.current_round = "_8";

        entry.bouts["_8"][0][0] = entry.bouts["_8"][0][2];
        entry.bouts["_8"][0][1] = entry.bouts["_8"][1][2];

        entry.bouts["_8"][1][0] = entry.bouts["_8"][2][2];
        entry.bouts["_8"][1][1] = entry.bouts["_8"][3][2];

        entry.bouts["_8"][2][0] = entry.bouts["_8"][4][2];
        entry.bouts["_8"][2][1] = entry.bouts["_8"][5][2];

        entry.bouts["_8"][3][0] = entry.bouts["_8"][6][2];
        entry.bouts["_8"][3][1] = entry.bouts["_8"][7][2];
      }
      
      entry.save();
      
      
      
      res.json({ status: 1 , data :  entry });   
    }
       
  });

 // res.json({ status: 1 , 'message' : 'OK' });
}

module.exports.nextround = function(req, res, next) {

  const token = req.headers.authorization.split(" ")[1];
  let userinfo = jwt.verify(token, DB.Secret );
  //console.log(userinfo);
  let tnid = ((req.params.tnid))

  Tournament.find({
      'tn_id' : tnid
  } ).then( ( items ) => {
    
    if ( items.length > 0 )
    {
      let entry = items[0];
            
      if (entry.current_round == "_2")
      { 
        //entry.status = "completed" ;
        entry.champion = entry.bouts["_2"][0][2];
        entry.status = "completed";
        entry.save();
      }
      else if (entry.current_round == "_4")
      {
        entry.current_round = "_2";
      }
      else if (entry.current_round == "_8")
      {
        entry.current_round = "_4";
      }
      else if (entry.current_round == "_16")
      {
        entry.current_round = "_8";
      }
      
      
      res.json({ status: 1 , data :  entry });   
    }
       
  });

 // res.json({ status: 1 , 'message' : 'OK' });
}