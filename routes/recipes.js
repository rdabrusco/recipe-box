const express = require('express')
const router = express.Router()
const recipesController = require('../controllers/recipes') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', recipesController.getReviews)
router.get('/newRecipe', ensureAuth, recipesController.newRecipe)
router.get('/editReview/:id', ensureAuth, recipesController.editReview)

router.put('/getPoster', recipesController.getPoster)
router.put('/updateReview', recipesController.updateReview)

router.get('/allReviews', ensureAuth, recipesController.allReviews)

router.post('/addNewRecipe', recipesController.addNewRecipe)

router.delete('/deleteReview', recipesController.deleteReview)



module.exports = router