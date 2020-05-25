const logs = require("./logs")



module.exports = function (app) {
    // app.post('/login', account.login);
    // app.post('/signup', account.signup);
    // app.post('/home', account.logout); //every call needing to be authenticated passes by home
    // app.delete('/home',city.del);
    app.put('/logs', logs.addLog);
    app.get('/logs', logs.getLogs);
}