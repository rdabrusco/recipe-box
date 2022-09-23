const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const recipesController = require('../controllers/recipes') 
const { ensureAuth } = require('../middleware/auth')

// router.get('/', recipesController.getReviews)
router.get('/allRecipes/:id', recipesController.getRecipe)
router.get('/allRecipes/', recipesController.listAllRecipes)
router.get('/recentRecipes/', recipesController.listRecentRecipes)



router.get('/newRecipe', ensureAuth, recipesController.newRecipe)
router.get('/editReview/:id', ensureAuth, recipesController.editReview)

router.post('/addNewRecipe', ensureAuth, upload.single("file"), recipesController.addNewRecipe)

router.put('/getPoster', recipesController.getPoster)
router.put('/updateReview', recipesController.updateReview)

router.get('/allReviews', ensureAuth, recipesController.allReviews)



router.delete('/deleteReview', recipesController.deleteReview)



module.exports = router