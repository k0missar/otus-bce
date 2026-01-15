const Joi = require('joi')

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    difficulty: Joi.string()
        .valid('beginner', 'intermediate', 'advanced')
        .required(),
    tags: Joi.array().items(Joi.string()).min(1).required(),
    author_id: Joi.string().hex().length(24).required()
})

const updateCourseSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced'),
    tags: Joi.array().items(Joi.string()).min(1),
    author_id: Joi.string().hex().length(24)
}).min(1)

module.exports = {
    createCourseSchema,
    updateCourseSchema
}