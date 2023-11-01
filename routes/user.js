const express = require('express');
const { createUser, getUsers, getById, updateUser, deleteUser, userLogin, registerUser } = require('../modules/User/User.Controller');
const userRouter = express.Router();






const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    },
});

const upload = multer({ storage: storage });





userRouter.get('/getAllUsers', getUsers);
userRouter.get('/:id', getById);
userRouter.post('/create', upload.single('image'), createUser);
userRouter.post('/login', userLogin);
userRouter.patch('/:id', upload.single('image'), updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/auth/register', registerUser);



module.exports = userRouter;