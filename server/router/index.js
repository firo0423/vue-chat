const dbserver = require('../dao/dbserver')
const jwt = require('../dao/jwt')

module.exports = function(app){
    app.post('/test', dbserver.buildUser)
    app.post('/judge',dbserver.judgeValue)
    app.post('/api/login',dbserver.matchUser)
    app.post('/api/register',dbserver.buildUser)
    app.get('/user/getUserData',jwt.checkToken,dbserver.getUserData)
}   