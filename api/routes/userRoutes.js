'use strict'

module.exports = function (app) {
  const user = require('../controllers/userController')

  //!temp rout
  app.route('/users')
  .get(user.list)

  // todoList Routes
  app.route('/signup')
    .post(user.signup)

  app.route('/login')
    .post(user.login)
}
