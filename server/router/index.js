const dbserver = require('../dao/dbserver')

module.exports = function(app){
    app.post('/test', dbserver.buildUser)
    app.post('/judge',dbserver.judgeValue)
}   