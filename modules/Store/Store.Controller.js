const Store = require('../../models/Store.Model');
const User = require('../../models/User.Model');

exports.createStore = async (req, res) => {
  try {
    const { userId, storeName } = req.body;

    
    const storeExist = await Store.findOne({ storeName });

    if (storeExist) {
      return res.status(400).send("Store already exists");
    }

    
    const store = new Store({
        userId : userId,
      storeName: req.body.storeName,
      logo: req.files['logo'][0].filename,
      image: req.files['image'][0].filename,
      storeType: req.body.storeType,
      address:req.body.address,
      location: {
        type: "Point",
        coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)],
      },
    });

    const storeData = await store.save();
    
    return res.status(201).send({ message: "Store created Successfully", data: storeData });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getStore = async (req,res)=>{
    try{
        const store = await Store.find();
        if(!store){
            res.send("Store doesnot exits");
        }
        return res.send(store);

    }
    catch(error){
        console.log(error)
        res.send(error);

    }
}

exports.findStore = async(req,res) =>{
    try{
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;

        const storeData = await Store.aggregate([
            {
              $geoNear:{
                near:{type:"Point", 
                coordinates:[parseFloat(longitude),parseFloat(latitude)]
            },
                key:"location",
                maxDistance:parseFloat(5000)*1609,
                distanceField:'dist.calculated',
                spherical:true
              }  
            }
        ])

        res.status(200).send({data:storeData})


    }
    catch(error){
        console.log(error)
        res.send(error);
    }
}

