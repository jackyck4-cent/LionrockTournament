let mongoose = require("mongoose");

let Joined = mongoose.Schema(
    {
        tn_id : { type : String , default : "" , trim : true  },
        playername: { type : String , default : "" , trim : true , required : "name is required" }
        
    }, {
        collection: "joineds",
    }
);

module.exports = mongoose.model("joined", Joined);