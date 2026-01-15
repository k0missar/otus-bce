const Joi = require('joi')

const createUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6)
}).min(1)

module.exports = {
    createUserSchema,
    updateUserSchema
}