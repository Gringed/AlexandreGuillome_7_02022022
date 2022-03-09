const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${__dirname}/../client/public/uploads/posts`)
    },
    filename: (req, file, callback) => {
        const nameUrl = req.originalUrl.split("=")[1] + file.originalname.split(".")[0] + '.png';
   
        callback(null, nameUrl)
    }
})

// VOIR pour le mettre directement dans le post controller avec vérif

module.exports = multer({storage}).single("image");