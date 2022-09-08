const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    img: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
    },
    userId: {
      type: String,
      required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ingredients: {
        type: Array,
        required: true,
    },
    instructions: {
        type: Array,
        required: true,
    },
    tips: {
        type: Array,
    },
    course: {
        type: String,
        required: true,

    },
    timeToMake: {
        type: String,
        required: true,

    },
    tags: {
        type: Array,
        required: true,
    },

  
    
  })

module.exports = mongoose.model('Recipe', RecipeSchema)
