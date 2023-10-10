const express = require('express');
const { createUser, getUsers, getById, updateUser, deleteUser} = require('../modules/User/User.Controller');
const userRouter = express.Router();
const multer = require('multer');
const path = require('path');

// Configure Multer to store uploaded files
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

// Handle user creation route
userRouter.post('/create', upload.single('image'), createUser);
userRouter.get('/getAllUsers',getUsers);
userRouter.get('/:id',getById);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);


module.exports = userRouter;
