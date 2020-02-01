const express = require('express');
const multer = require('multer');
const posts = require('../controllers/posts');

const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Geçersiz Dosya Uzantısı');
        if (isValid) {
            error = null;
        }
        cb(error, "public/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
})


router.get('/', checkAuth, posts.getPosts);
router.get('/:id', checkAuth, posts.getPost);
router.post('/', checkAuth, multer({ storage: storage }).single('file'), posts.addPost);
router.delete('/:id', checkAuth, posts.deletePost);
router.put('/:id', checkAuth, multer({ storage: storage }).single('file'), posts.updatePost);



module.exports = router;