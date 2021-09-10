const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server')

const { validateLoginInput } = require('../../../util/validators')
const { generateToken } = require('../../../util/tokenizer')
const User = require('../../../models/User')

const login = async (username, password) => {
  const { errors, valid } = validateLoginInput(username, password)

  if(!valid) {
    throw new UserInputError('Errors', { errors })
  }

  const user = await User.findOne({ username })

  if(!user) {
    errors.general = 'User not found'
    throw new UserInputError('User not found', { errors })
  }

  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    errors.general = 'Wrong credentials'
    throw new UserInputError('Wrong credentials', { errors })
  }

  const token = generateToken(user)

  return {
    ...user._doc,
    id: user._id,
    token
  }
}

module.exports = login
