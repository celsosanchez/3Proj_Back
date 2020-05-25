const Log = require("../schema/log");

async function addLog(req, res) {
    const { Attack_Type, Affected_Area, Level_Affectation, Start_Time, End_Time } = req.body;
    if (!Attack_Type || !Affected_Area || !Level_Affectation || !Start_Time || !End_Time) {
        //the case of invalid email, password or name 
        return res.status(400).json({
            text: "invalid request"
        });

    }
    let a = new Date(Start_Time);
    let b = new Date(End_Time);
    let Durat = () => {return (b.getTime() - a.getTime()) / 1000}
    const log = {
        Attack_Type,
        Affected_Area,
        Level_Affectation,
        Start_Time: a,
        End_Time: b,
        Duration: Durat()
    };

    try {
        // save user in DB
        const LogData = new Log(log);
        await LogData.save();
        return res.status(200).json({
            text: "Log Created",

        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}










async function getLogs(req, res) {
    
    try {



        const found = await Log.find();

        return res.status(200).json({
            found
        })
    } catch (error) {
        return res.status(500).json({ error });
    }


    // return res.status(200).json({
    //     data: [
    //         [1, 1, 1, 1, 85, 60, 75, 60, 90, 1, 1, 1],
    //         [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
    //         [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
    //       ]
    // })


}
exports.getLogs = getLogs;
exports.addLog = addLog;