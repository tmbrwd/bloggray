const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { route } = require('./pages');

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/edit/:id', authController.editUser)

router.post('/delete/:id', authController.deleteUser)
router.post('/uploadForm', authController.uploadForm)
router.post('/deletePost/:id', authController.deletePost)
router.post('/editPost/:id', authController.editPost)



//router.post('/uploadForm', authController.uploadForm)






module.exports = router;