const cloudinary = require("../middleware/cloudinary");
const Recipe = require('../models/Recipe')


module.exports = {
    newRecipe: (req,res)=>{
        console.log('test')
        res.render('newRecipe.ejs', {user: req.user.id})
    },
    listRecentRecipes: async (req, res) => {
        try {
          const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean();
          res.render("allRecipes.ejs", { recipes: recipes });
        } catch (err) {
          console.log(err);
        }
      },
      listAllRecipes: async (req, res) => {
        try {
          const recipes = await Recipe.find().sort({ createdAt: 1 }).lean();
          res.render("allRecipes.ejs", { recipes: recipes });
        } catch (err) {
          console.log(err);
        }
      },
    addNewRecipe: async (req, res)=>{
        try{

            console.log( req.file )
            const result = await cloudinary.uploader.upload(req.file.path);
            
            const body = req.body
            let ingredients = []
            let tips = []
            if(!Array.isArray(body.ingredients)){
                 ingredients.push(body.ingredients)
                 body.ingredients = ingredients
            }
            if(body.tips.length !== 0 && !Array.isArray(body.tips)){
                tips.push(body.tips)
                body.tips = tips
           }
            if(Array.isArray(body.steps)){
                body.steps = body.steps.map(el => el.trim())
            }
            if(Array.isArray(body.tips)){
                body.tips = body.tips.map(el => el.trim())
            }
            // const tags = req.body.tags.split(" ")

            const response = await Recipe.create({
                title: body.title, 
                source: body.source,
                shortDes: body.shortDes,
                fullDes: body.fullDes,
                img: result ? result.secure_url : "",
                cloudinaryId: result ? result.public_id : "",
                ingredients: body.ingredients, 
                directions: body.directions,
                prepTime: body.prepTime,
                prepTimeMHD: body.prepTimeMHD,
                cookTime: body.cookTime,
                cookTimeMHD: body.cookTimeMHD,
                totalTime: body.totalTime,
                totalTimeMHD: body.totalTimeMHD,
                servings: body.servings,
                yield: body.yield,
                tips: body.tips,
                likes: 0,
                userId: req.user.id})
            // console.log(req.body)
            console.log(response)
            res.redirect(`/recipes/allRecipes/${response._id}`)
        }catch(err){
            console.log(err)
        }
    },
    getRecipe: async (req, res) => {
        try {
          const recipe = await Recipe.findById(req.params.id);
        //   const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
          res.render("recipe-detail.ejs", { recipe: recipe, user: req.user});
        } catch (err) {
          console.log(err);
        }
      },
    editReview: async (req,res)=>{
        try{
            const reviewItem = await Review.findById(req.params.id)
            console.log(reviewItem)
            res.render('editReview.ejs', {review: reviewItem, user: req.user.id})
        }catch(err){
            console.log(err)
        }
    },
    updateReview: async (req,res)=>{
        const reviewFromJs = req.body.review
        const stars = req.body.rating
        console.log(stars)
        
        try{
            await Review.findOneAndUpdate({_id:req.body.id},{
                review: reviewFromJs,
                rating: stars,
                editedAt: Date.now()
            })
            console.log('Review Updated')
            res.json('Review Updated')
        }catch(err){
            console.log(err)
        }
    },
    getReviews: async (req,res)=>{
        console.log(req.user)
        try{
            const reviewItems = await Review.find({userId:req.user.id})
            res.render('reviews.ejs', {reviews: reviewItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },

    allReviews: async (req,res)=>{
        console.log(req.user)
        try{
            const reviewItems = await Review.find()
            res.render('allReviews.ejs', {reviews: reviewItems})
        }catch(err){
            console.log(err)
        }
    },
    deleteReview: async (req, res)=>{
        console.log(req.body.reviewIdFromJSFile)
        try{
            await Review.findOneAndDelete({_id:req.body.reviewIdFromJSFile})
            console.log('Deleted Review')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    getPoster: async (req, res) => {
        try{
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${req.body.movie}`)
            const data = await response.json()
            res.json(data) 
        }catch(err){
            console.error(err)
        }
    }
    
}