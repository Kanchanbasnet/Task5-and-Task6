const User = require('../../models/User.Model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');







exports.createUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      location: req.body.location,
      image: req.file.filename, 
    });

    const userExist = await User.findOne({ email: req.body.email });

    if (!userExist) {
      const newUser = await user.save();
      return res.status(200).send({ data: newUser, message: "User Created Successfully." });
    } else {
      return res.send("User exists.");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal server error.' });
  }
};
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

