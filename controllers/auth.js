const db = require('../config/db')
const User = db.users;
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors');
const bcrypt = require('bcrypt')
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    const { email, firstName, lastName, password } = req.body

    if (!email || !password || !firstName || !lastName) {
        res.status(400).send({ message: "Les champs ne doivent pas être vides" });
        return;
    }
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const users = {
        email: email,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        avatar: "./uploads/profil/random-avatar.png",
        isAdmin: 0
    }
    try {
        const newUser = await User.create(users)
        return res.status(201).json(newUser)
    } catch (err) {
        return res.status(400).send(err);
    }

}
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            res.status(400).send({ message: "Les champs ne doivent pas être vides" });
            return;
        }
        const recupUser = await User.findOne({ where: { email: email } })

        if (!recupUser) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' })
        }
        const hashPass = await bcrypt.compare(password, recupUser.password)

        if (!hashPass)
            return res.status(401).json({ error: 'Mot de passe incorrect' })
        else {
            const token = createToken(recupUser.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge })
            res.status(201).json({ message: "Connexion réussie avec succès" })
        }
    }
    catch (err) {
        const errors = signInErrors(err)
        res.status(400).send({ errors })
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}