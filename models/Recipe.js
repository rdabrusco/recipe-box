const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        reqired: true
    },

    source:{
        type: String,
    },

    shortDes: {
        type: String,
        reqired: true
    },
    fullDes: {
        type: String,
    },

    file: {
        type: String,
    },

    img: {
      type: String,
    },

    cloudinaryId: {
        type: String,
    },

    ingredients: {
        type: Array,
        required: true,
    },

    directions: {
        type: Array,
        required: true,
    },
    

    prepTime: {
        type: String,
        required: true,

    },

    prepTimeMHD: {
        type: String,
        required: true,

    },

    cookTime: {
        type: String,
        required: true,

    },

    cookTimeMHD: {
        type: String,
        required: true,

    },

    totalTime: {
        type: String,
        required: true,

    },

    totalTimeMHD: {
        type: String,
        required: true,

    },

    servings: {
        type: String,
    },

    yield: {
        type: String
    },
    
    tips: {
        type: Array,
    },

    // tags: {
    //     type: Array,
    // },

    likes: {
      type: Number,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    editedAt: {
        type: Date,
    }

  
    
  })

module.exports = mongoose.model('Recipe', RecipeSchema)
