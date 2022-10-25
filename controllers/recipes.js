const cloudinary = require("../middleware/cloudinary");
const Recipe = require('../models/Recipe')
const User = require('../models/User')



module.exports = {
    newRecipe: (req,res)=>{
        console.log('test')
        console.log(req.user)
        res.render('newRecipe.ejs', {user: req.user})
    },
    listRecentRecipes: async (req, res) => {
        try {
          const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean();
          res.render("allRecipes.ejs", { recipes: recipes });
        } catch (err) {
          console.log(err);
        }
      },
      savedRecipes: async (req, res) => {
        try {
          const faves = req.user.favorites
          const recipes = await Recipe.find({_id: {$in: faves}})
          console.log(recipes)
          res.render('savedRecipes.ejs', {user: req.user, recipes: recipes})
        } catch (err) {
          console.log(err);
        }
      },
      myRecipes: async (req, res) => {
        try {
          const recipes = await Recipe.find({userId: req.user.id}).sort({ createdAt: "desc" }).lean();
          res.render("myRecipes.ejs", { recipes: recipes });
        } catch (err) {
          console.log(err);
        }
      },
      
      saveRecipe: async (req, res) => {
        try {
          const userFaves = req.user.favorites
          if(!userFaves.includes(String(req.params.id))){
            userFaves.push(String(req.params.id))
            const update = await User.findOneAndUpdate({_id:req.user.id},{
              favorites: userFaves,
            })
          }else{
            console.log('Recipe already exists in favorites.')
          }
         
          res.redirect('back')
        } catch (err) {
          console.log(err);
        }
      },
      unsaveRecipe: async (req, res) => {
        try {
          const recipe = req.params.id
          const userFaves = req.user.favorites
          userFaves.splice(userFaves.indexOf(req.params.id), 1)
          const update = await User.findOneAndUpdate({_id:req.user.id},{
            favorites: userFaves,
          })
         
          res.redirect('back')
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
    getRecipe: async (req, res) => {
        try {
          const recipe = await Recipe.findById(req.params.id);
        //   const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
          res.render("recipe-detail.ejs", { recipe: recipe, user: req.user});
        } catch (err) {
          console.log(err);
        }
      },
    addNewRecipe: async (req, res)=>{
        try{

            console.log( req.file )
            console.log(req.body)
            const result = await cloudinary.uploader.upload(req.file.path) 
            
            const body = req.body
            console.log(body)
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
                file: body.file,
                img: result ? result.secure_url : "",
                cloudinaryId: result ? result.public_id : "",
                ingredients: body.ingredients, 
                directions: body.steps,
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
                userId: req.user.id,
                userName: req.user.userName})
            console.log(req.body)
            console.log(response)
            res.redirect(`/recipes/allRecipes/${response._id}`)
        }catch(err){
            console.log(err)
        }
    },

    editRecipe: async (req,res)=>{
        try{
            const recipe = await Recipe.findById(req.params.id)
            res.render('editRecipe.ejs', {recipe: recipe, user: req.user.id})
        }catch(err){
            console.log(err)
        }
    },
    updateRecipe: async (req,res)=>{
        const recipe = await Recipe.findById(req.params.id);
        const body = req.body
        const result = req.body.file ? await cloudinary.uploader.upload(req.file.path) : ""
        console.log(req.body, `btihriurh`)
        
        try{
            await Recipe.findOneAndUpdate({_id:req.params.id},{
                title: body.title, 
                source: body.source,
                shortDes: body.shortDes,
                fullDes: body.fullDes,
                // file: body.file,
                // img: result ? result.secure_url : "",
                // cloudinaryId: result ? result.public_id : "",
                ingredients: body.ingredients, 
                directions: body.steps,
                prepTime: body.prepTime,
                prepTimeMHD: body.prepTimeMHD,
                cookTime: body.cookTime,
                cookTimeMHD: body.cookTimeMHD,
                totalTime: body.totalTime,
                totalTimeMHD: body.totalTimeMHD,
                servings: body.servings,
                yield: body.yield,
                tips: body.tips,
                editedAt: Date.now(),
                userId: req.user.id,
                userName: req.user.userName
            })
            console.log('Recipe Updated')
            res.redirect(`/recipes/allRecipes/${req.params.id}`)
        }catch(err){
            console.log(err)
        }
    },
    deleteRecipe: async (req, res) => {
        console.log(req.params.id)

        try {
          // Find post by id
          let recipe = await Recipe.findById({ _id: req.params.id });
          // Delete image from cloudinary
          console.log('deleting recipe')
          console.log(recipe.cloudinaryId)
          if(recipe.cloudinaryId){
            await cloudinary.uploader.destroy(recipe.cloudinaryId);
          }
          // Delete post from db
          await Recipe.deleteOne({ _id: req.params.id });
          console.log("Deleted Recipe");
          res.redirect("/");
        } catch (err) {
          res.redirect(`/recipes/allRecipes/${response._id}`);
        }
      },

    
}