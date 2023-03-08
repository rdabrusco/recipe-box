const cloudinary = require("../middleware/cloudinary");
const Recipe = require('../models/Recipe')



module.exports = {
    getIndex: async (req,res)=>{
        console.log(req.user)
        const recipes = await Recipe.find().sort({ createdAt: 1 }).lean();
        console.log(recipes)
        res.render('index.ejs', {recipes: recipes})
    }
}