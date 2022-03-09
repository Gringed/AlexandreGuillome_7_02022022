const router = require('express').Router();
const auth = require('../controllers/auth')
const userCtrl = require('../controllers/user')
/*const uploadCtrl = require('../controllers/upload')
 const multer = require('multer')
var upload = multer(); */
const upload = require('../middleware/multerUser')

router.post("/register", auth.signUp)
router.post("/login", auth.signIn);
router.get('/logout', auth.logout);


router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getUserInfo)
router.put('/:id', upload, userCtrl.updateUser)
router.delete('/:id', userCtrl.deleteUser)

// router.post('/upload', upload.single("image"), uploadCtrl.uploadProfil)


module.exports = router;