const multer = require('multer');

const MIME_TYPE = {
    "image/jpg" : ".jpg",
    "image/jpeg" : ".jpg",
    "image/gif" : ".gif",
    "image/png" : ".png"
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${__dirname}/../client/public/uploads/profil`)
    },
    filename: (req, file, callback) => {
        const nameUrl = req.originalUrl.split('=')[1];
        const extension = MIME_TYPE[file.mimetype];
        console.log(nameUrl)
        callback(null, nameUrl + extension)
    }
})


module.exports = multer({storage}).single("image");