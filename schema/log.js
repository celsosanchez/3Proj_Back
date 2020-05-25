const mongoose = require("mongoose");

const log = mongoose.Schema(
    {
        Attack_Type: String,
        Affected_Areas: [{
            type: Number
        }],
        Level_Affectation: Number,
        Start_Time: Date,
        End_Time: Date,
        Duration: Number

    });

module.exports = mongoose.model("Log", log)