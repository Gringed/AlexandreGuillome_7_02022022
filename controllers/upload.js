const db = require('../config/db')
const User = db.users;
const fs = require('fs');
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

module.exports.uploadProfil = async (req, res) => {
    try {
        if (
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/png" &&
            req.file.mimetype !== "image/jpeg"
        )
            throw Error("Format invalide")

        if (req.file.size > 500000) throw Error("Fichier trop volumineux")

    } catch(err) {
        return res.status(400).json(err)
    }

    const filename = req.originalUrl.split('=')[1] + ".png";
    console.log(req.file)
    await pipeline(
        req.file.buffer,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${filename}`
        )
        
    )
}