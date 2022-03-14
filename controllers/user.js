const db = require('../config/db')
const User = db.users;
const validator = require('validator');
const { uploadErrors } = require('../utils/errors');

module.exports.getAllUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    });
    res.status(200).json(users)
};

module.exports.getUserInfo = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    const userId = req.params.id;
    const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: userId }
    })
    if (user)
        res.status(200).json(user);
    else
        res.status(404).json({ message: 'Utilisateur non trouvé !' });
};

module.exports.updateUser = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })
    if (req.file !== null) {
        try {
            if (
                req.file.mimetype !== "image/jpg" &&
                req.file.mimetype !== "image/jpeg" &&
                req.file.mimetype !== "image/png"
            )
                throw Error('invalid file');
        } catch (err) {
            const errors = uploadErrors(err)
            return res.status(400).send({ errors })
        }
    }
    const nameUrl = req.body.name;
    const userId = req.params.id;
    const objectToUp = {
        avatar: "./uploads/profil/" + nameUrl + userId + ".jpg"
    }
    const userInfo = await User.findOne({
        attributes: { exclude: ['password'] }, where: { id: userId }
    })
    if (!userInfo)
        return res.status(404).json({ message: 'Utilisateur non trouvé !' })
    if (userInfo)
        userInfo.set(objectToUp);
    userInfo.save(objectToUp);
    res.status(201).json(userInfo)
}

module.exports.deleteUser = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    const userId = req.params.id
    const userInfo = await User.findOne({
        attributes: { exclude: ['password'] }, where: { id: userId }
    })
    if (!userInfo)
        return res.status(404).json({ message: 'Utilisateur non trouvé !' })

    try {
        await User.destroy({ where: { id: userId } });
        res.status(200).json({ message: "Success delete user" })
    } catch (err) {
        return res.status(500).json(err)
    }
}
