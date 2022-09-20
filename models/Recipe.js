const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    img: {
      type: String,
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
    },
    prepTime: {
        type: String,
        required: true,

    },
    cookTime: {
        type: String,
        required: true,

    },
    servings: {
        type: Number,
    }
    // tags: {
    //     type: Array,
    //     required: true,
    // },

  
    
  })

module.exports = mongoose.model('Recipe', RecipeSchema)
