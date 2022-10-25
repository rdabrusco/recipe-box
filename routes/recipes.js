const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const recipesController = require('../controllers/recipes') 
const { ensureAuth } = require('../middleware/auth')

// router.get('/', recipesController.getReviews)
router.get('/allRecipes/:id', recipesController.getRecipe)
router.get('/allRecipes', recipesController.listAllRecipes)
router.get('/recentRecipes', recipesController.listRecentRecipes)
router.get('/newRecipe', ensureAuth, recipesController.newRecipe)
router.get('/editRecipe/:id', ensureAuth, recipesController.editRecipe)
router.get('/savedRecipes', recipesController.savedRecipes)
router.get('/myRecipes', recipesController.myRecipes)





router.delete('/deleteRecipe/:id', ensureAuth, recipesController.deleteRecipe)



router.post('/addNewRecipe', ensureAuth, upload.single("file"), recipesController.addNewRecipe)

router.put('/updateRecipe/:id', ensureAuth, recipesController.updateRecipe)
router.put('/saveRecipe/:id', ensureAuth, recipesController.saveRecipe)
router.put('/unsaveRecipe/:id', ensureAuth, recipesController.unsaveRecipe)



// router.put('/updateReview', recipesController.updateReview)







module.exports = router