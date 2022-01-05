const dbserver = require('../dao/dbserver')
const jwt = require('../dao/jwt')
const aboutUserData = require('../dao/aboutUserData')

module.exports = function(app){
    app.post('/test')
    app.post('/judge',dbserver.judgeValue)
    app.post('/api/login',dbserver.matchUser)
    app.post('/api/register',dbserver.buildUser)

    app.post('/user/updateUserTags',jwt.checkToken,aboutUserData.updateUserTags)
    app.post('/user/updateUserData',jwt.checkToken,aboutUserData.updateUserData)
    app.get('/user/getUserData',jwt.checkToken,aboutUserData.getUserData)
    app.get('/user/getUserTags',jwt.checkToken,aboutUserData.getUserTags)
    
    // app.get('/test',aboutUserData.test)
}   