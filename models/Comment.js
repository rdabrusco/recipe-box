const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
  },
    
  })

module.exports = mongoose.model('Comment', CommentSchema)
