const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    difficulty: String,
    tags: [String],
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Course', CourseSchema)
