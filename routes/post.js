const router = require('express').Router();
const postCtrl = require('../controllers/post')
const upload = require('../middleware/multerPost')

//Post 
router.get('/', postCtrl.readPost)
router.post('/', upload, postCtrl.createPost)
router.put('/:id', postCtrl.updatePost)
router.delete('/:id', postCtrl.deletePost)

//Like
router.put('/like-post/:id', postCtrl.likePost)
router.put('/unlike-post/:id', postCtrl.unLikePost)

//Comments
router.post('/comment-post/:id', postCtrl.commentPost)
router.put('/edit-comment-post/:id', postCtrl.editCommentPost)
router.delete('/delete-comment-post/:id', postCtrl.deleteCommentPost)

module.exports = router;