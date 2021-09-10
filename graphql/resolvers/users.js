const { loginController, registerController } = require('../controllers/users')

module.exports = {
  Mutation: {
    login: (_, { loginInput: { username, password }}) => loginController(username, password),
    register: (_, { registerInput: { username, email, password, confirmPassword }}) => registerController(username, email, password, confirmPassword)
  }
}
