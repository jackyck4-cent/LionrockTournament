let mongoose = require("mongoose");



let Tournament = mongoose.Schema(
    {
        // _id: <generated Object ID>,  // tournament id
        tn_id : { type : String , default : "" , trim : true  },
        name: { type : String , default : "" , trim : true , required : "name is required" },                   // name of tournament
        description: { type : String , default : "" , trim : true  },            // description of tournament
        owner_id: { type : mongoose.Schema.Types.ObjectId , trim : true , required : "owner_id is required" },               // user id for tournament owner
        owner : { type : String , default : "" , trim : true , required : "name is required" },    
        size : { type : Number , default : 16 , trim : true  },    
        start_date : { type : String , default : "" , trim : true  },   
        end_date : { type : String , default : "" , trim : true  },   
        status : { type : String , default : "" , trim : true  }, 
        players: { type : Array , default : undefined , trim : true } ,             // registered players for the tournament
        current_round : { type : String , default : "" , trim : true  },
        champion: { type : String , default : "" , trim : true  }, 
        bouts: { type : Object , default : undefined , trim : true }
        
    }, {
        collection: "tounaments",
    }
);

module.exports = mongoose.model("tournament", Tournament);