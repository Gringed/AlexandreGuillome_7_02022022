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
        const errors = signUpErrors(err)
        res.status(200).json({ errors })
    }

}
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    User.login = async function(email, password) {
        const user = await User.findOne({where: {email: email} });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
            return user
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    }
    
    try {
        const user = await User.login(email, password)
        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({user: user.id})
        
      } catch (err){
        const errors = signInErrors(err);
        res.status(200).json({ errors });
      }
    
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}