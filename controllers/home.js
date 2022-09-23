const cloudinary = require("../middleware/cloudinary");


module.exports = {
    getIndex: (req,res)=>{
        console.log(req.user)
        res.render('index.ejs')
    }
}