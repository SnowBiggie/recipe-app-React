const User = require("../../model/user/User.model");

// get user
async function httpGetUser(req, res){
    const id = req.params.id;
    try{
        const user = await User.findById(id).exec();

        // do i need this? i feel like it will throw an error anyway.
        if(!user){
            res.status(404).err("No user found");
        }
        const {isAdmin, __v, createdAt, updatedAt, password, ...others} = user._doc
        res.status(200).json(others);
    }catch(err){
        res.status(404).json("User does not exist");
    }
}

// update user
async function httpUpdateUser(req, res){
    const id = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(id, req.body).exec();
        if(!user){
            res.status(404).json("User is not found");
        }
        res.status(200).json("User Updated");
    }catch(err){
        res.status(404).json("User does not exist");
    }

}

// delete user
async function httpDeleteUser(req, res){
    const id = req.params.id;
    try{
        const user = User.findByIdAndRemove(id).exec();
        if(!user){
            res.status(404).json("User is not found");
        }
        res.status(200).json("User Deleted");
    }catch(err){
        res.status(404).json("User not found")
    }
}

module.exports ={
    httpDeleteUser: httpDeleteUser,
    httpGetUser: httpGetUser,
    httpUpdateUser: httpUpdateUser
}