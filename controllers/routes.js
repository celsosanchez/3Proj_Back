const logs = require("./logs")
const users = require("./users")



module.exports = function (app) {
    // app.post('/login', account.login);
    // app.post('/signup', account.signup);
    // app.post('/home', account.logout); //every call needing to be authenticated passes by home
    // app.delete('/home',city.del);
    app.put('/logs', logs.addLog);
    app.get('/logs', logs.getLogs);
    app.post('/api/users/register', users.register)
    app.post('/api/users/login', users.login)
    
}