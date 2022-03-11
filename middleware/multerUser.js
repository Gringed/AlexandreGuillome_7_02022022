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
        const nameUrl = req.body.name;
        console.log(req.body)
        const extension = '.jpg';
        console.log(nameUrl)
        callback(null, nameUrl + extension)
    }
})


module.exports = multer({storage}).single("image");