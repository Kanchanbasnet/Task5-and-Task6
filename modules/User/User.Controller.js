const User = require('../../models/User.Model');
const multer = require('multer');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken'); 
const {admin} = require('../../firebase/admin');




exports.registerUser = async (req,res)=>{

    const token = req.body.token;
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
  
      const userRecord = await admin.auth().getUser(uid);
      const userExist =  await User.findOne({email: userRecord.email}) 
          const createUser ={
            name:userRecord.displayName,
            email:userRecord.email
          }
        if(!userExist){
         await User.create(createUser)
        }
        res.json(userRecord);
    } catch (error) {
      console.error('Error verifying token or fetching user data:', error);
      res.status(400).json({ error: 'Token verification failed' });
    }
  }



exports.createUser = async (req, res) => {
  try {
      const userExist = await User.findOne({ username: req.body.username });

      if (userExist) {
          return res.status(400).json({ message: 'User already exists.' });
      }

      const bcryptedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
          username: req.body.username,
          password: bcryptedPassword,
          name: req.body.name,
          address: req.body.address,
          image: req.file.filename,
      });

      const newUser = await user.save();

      const payload = {
          user: {
              _id: newUser._id,
              name: newUser.name,
              password: newUser.password,
              image: newUser.image,
          }
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

      return res.status(200).json({ token, data: newUser, message: 'User Created Successfully.' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
  }
};
exports.userLogin = async(req,res)=>{
  try{
    const {username , password} = req.body;
    const userExist = await User.findOne({username})
    if(!userExist){
      return res.status(404).send(`User with the ${username} does not exist.`)
    }
    const comparePassword = await bcrypt.compare(password,userExist.password);
    if(comparePassword){
      const userResult ={
        _id:userExist._id,
        name:userExist.name,
        password:userExist.password,
        image:userExist.image,
      }
      //creating a token
      const token = jwt.sign({ user: userResult }, process.env.JWT_SECRET, { expiresIn: "2h" });
      
      
      return res.status(200).send({userResult, token, message:"Login Successfull"})

    }
    else{
      return res.status(200).send({message:'Login details are incorrect.'})
    }
    
  }
  catch(error){
    console.log(error);
    return res.status(500).send('Internal Server Error.');

  }
}

exports.getUsers = async(req,res)=>{
  try{
      const users = await User.find();
      if(!users){
          res.status(404).send("User not found.");
      }
      res.status(200).send(users);


  }catch(error){
      console.error(`Internal Server Error.`);

  }



}

exports.getById = async(req,res)=>{
  try{
      const id = req.params.id;
      const userExist = await User.findOne({_id:id});
      if(!userExist){
          return res.status(404).send("User does not exists.");
      }
      return res.status(201).send(userExist);

  }
  catch(error){
      console.error(`Internal Server Error.`);
  }
}
exports.updateUser = async(req,res) =>{
  try{
      const id = req.params.id;
     
      const userExist = await User.findOne({_id:id});
      
      if(!userExist){
          return res.status(404).send("User does not exist");
      }
      const updateUser = await User.findByIdAndUpdate(id, req.body,{new:true});
      res.status(201).send(updateUser);


  }
  catch(error){
      console.error(`Internal Server Error.`);

  }
}
exports.deleteUser = async(req,res)=>{
  try{
      const id = req.params.id;
      const userExist = await User.findOne({_id:id});
      

      if(!userExist){
          return res.status(404).send("user does not exist");
      }
      
       await User.findByIdAndDelete(id);
      res.status(201).send("User Deleted successfully.")

  }
  catch (error){
      console.log(error);
      console.log(`Internal Server Error.`); 
  }
}

