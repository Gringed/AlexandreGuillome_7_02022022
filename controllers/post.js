const db = require('../config/db')
const Post = db.posts;
const User = db.users;
const Likes = db.likes;
const Comments = db.comments;
const validator = require('validator');
const { uploadErrors } = require('../utils/errors');
const multer = require('../middleware/multerPost');

module.exports.readPost = async (req, res) => {
    const allPost = await Post.findAll({order: [['createdAt', 'DESC']]},{
        attributes: ['id', 'userId', 'imagePost', 'message', 'likes', 'usersLiked', 'comments', 'createdAt', 'updatedAt']
    })
    
        if(allPost)
            res.status(201).json(allPost)
        else
        res.status(400).json({message: "Requête impossible"})
    
};

module.exports.createPost = async (req, res) => {
    let filename;

    if(req.file !== null){
        try{
            if(
                req.file.mimetype !== "image/jpg" && 
                req.file.mimetype !== "image/jpeg" &&
                req.file.mimetype !== "image/png"
            )
            throw Error('invalid file');
        }catch(err){
            const errors = uploadErrors(err)
            return res.status(400).send({errors})
        }
        multer.storage = "test"
        filename = req.originalUrl.split("=")[1] + req.file.originalname.split('.')[0] + '.png';
    }

    const { userId, message } = req.body
    const newPost = {
        userId: userId,
        imagePost: req.file !== null ? "./uploads/posts/" + filename : "",
        message: message,
        likes: 0,
        comments: 0
    }
    try {
        const post = await Post.create(newPost)
        return res.status(201).json(post)
    } catch (err) {
        return res.status(400).send(err);
    }

};

module.exports.updatePost = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    const updatePost = {
        message: req.body.message
    }
    const postCheck = await Post.findOne({
        where: { id: req.params.id }
    })
    if (!postCheck)
        return res.status(404).json({ message: 'Post non trouvé !' })
    if (postCheck)
        postCheck.set(updatePost);
    postCheck.save(updatePost);
    res.status(201).json(postCheck)
};

module.exports.deletePost = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    const postCheck = await Post.findOne({ where: { id: req.params.id } })
    if (!postCheck)
        return res.status(404).json({ message: 'Post non trouvé !' })
    if (postCheck)
        postCheck.destroy();
    res.status(201).json({ message: "Post supprimé !" })
};

module.exports.likePost = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    try {
        const recupPost = await Post.findOne({ where: { id: req.params.id }, attributes: ['id', 'likes'] })
        const updatePostLikes = {
            likes: recupPost.likes + 1
        }
        if (recupPost)
            recupPost.update(updatePostLikes)

        const newPostLikes = {
            idUserLike: req.body.idUserLike,
            idPost: req.params.id
        }
        await Likes.create(newPostLikes)
        res.status(201).json({ message: "Like ajouté dans le post et la table like" })
    }
    catch(err) {
        return res.status(400).json(err)
    }
};

module.exports.unLikePost = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    try {
        const recupPost = await Post.findOne({ where: { id: req.params.id }, attributes: ['id', 'likes'] })
        const updatePostLikes = {
            likes: recupPost.likes - 1
        }
        if (recupPost)
            recupPost.update(updatePostLikes)

        const deleteLike = await Likes.findOne({ where: { idPost: req.params.id }, attributes: ['id', 'idPost'] })
        if (!deleteLike)
            return res.status(404).json({ message: 'Like non mis !' })
        if (deleteLike)
            deleteLike.destroy();
        res.status(201).json({ message: "Likes supprimé" })
    }
    catch(err) {
        return res.status(400).json(err)
    }

};

module.exports.commentPost = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    const { userId, message, firstname, lastname } = req.body
    const newCommentPost = {
        userId: userId,
        idPost: req.params.id,
        message: message,
        firstname: firstname,
        lastname: lastname
    }
    try {
        const recupPost = await Post.findOne({ where: { id: req.params.id }, attributes: ['id', 'comments'] })
        const numberComments = {
            comments: recupPost.comments + 1
        }
        if (!recupPost)
            return res.status(404).json({ message: 'Post non trouvé !' })
        if (recupPost) {
            recupPost.update(numberComments)
            const comment = await Comments.create(newCommentPost)
            return res.status(201).json(comment)
        }
    } catch(err) {
        return res.status(400).json(err)
    }
}

module.exports.editCommentPost = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    const updateCommentPost = {
        message: req.body.message
    }

    try {
        const recupComments = await Comments.findOne({ where: { id: req.params.id}, attributes: ['id', 'idPost', 'message'] })
        if (!recupComments)
            return res.status(404).send({ message: "Ce commentaire n'existe pas" })
        else
            recupComments.update(updateCommentPost);
        res.status(201).json(recupComments);

    } catch(err) {
        return console.log(err)
    }
}

module.exports.deleteCommentPost = async (req, res) => {
    if (!validator.isInt(req.params.id))
        return res.status(400).json({ message: "Id inconnue" })

    try {
        const recupComments = await Comments.findOne({ where: { id: req.params.id }, attributes: ['id', 'idPost', 'message'] })
        if (!recupComments)
            return res.status(404).send({ message: "Ce commentaire n'existe pas" })
        else
            recupComments.destroy(recupComments);
        res.status(201).json({message : "Message supprimé avec succès"});

    } catch(err) {
        return res.status(400).json(err)
    }
}
