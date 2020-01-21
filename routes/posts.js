const express = require('express');
const posts = require('../controllers/posts');

const router = express.Router();


router.get('/', posts.fetchAll);
router.post('/', posts.addPost);



module.exports = router;