const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server')

const { validateRegisterInput } = require('../../../util/validators')
const { generateToken } = require('../../../util/tokenizer')
const User = require('../../../models/User')

const register = async (username, email, password, confirmPassword) => {
  const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)

  if(!valid) {
    throw new UserInputError('Errors', { errors })
  }
  const user = await User.findOne({ username })

  if(user) {
    throw new UserInputError('Username is taken', {
      errors: {
        username: 'This username is taken'
      }
    })
  }

  password = await bcrypt.hash(password, 12)

  const newUser = new User({
    email,
    username,
    password,
    createdAt: new Date().toISOString()
  })

  const result = await newUser.save()

  const token = generateToken(result)

  return {
    ...result._doc,
    id: result._id,
    token
  }
}

module.exports = register
