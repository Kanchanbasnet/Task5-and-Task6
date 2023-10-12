const express = require('express');
const { createUser, getUsers, getById, updateUser, deleteUser,userLogin} = require('../modules/User/User.Controller');
const userRouter = express.Router();
const multer = require('multer');
const path = require('path');
const {basicAuthentication} = require('../middleware/basicAuthentication');
const { verifyToken } = require('../middleware/jwtAuthentication');



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
userRouter.use(verifyToken);
userRouter.post('/create', upload.single('image'), createUser);

userRouter.get('/getAllUsers',getUsers);
userRouter.post('/login',userLogin);

userRouter.get('/:id',getById);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);


module.exports = userRouter;
