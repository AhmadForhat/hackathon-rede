const jwt = require('jsonwebtoken')

const { SECRET_KEY } = require('../config')

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, SECRET_KEY, { expiresIn: '24h' })
}

module.exports = {
  generateToken
}
