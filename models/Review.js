const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
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
    editedAt: {
      type: Date,
      edited: false
    }
  
    
  })

module.exports = mongoose.model('Review', ReviewSchema)
