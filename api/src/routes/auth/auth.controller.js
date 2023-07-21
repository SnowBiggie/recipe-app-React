const User = require("../../model/user/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// CRUD

// create user
async function httpRegister(req, res){
    const { fullname, email, password } = req.body;
    console.log(fullname, email, password);
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                fullname: fullname,
                email: email,
                password: hashedPassword,
                isAdmin: false
            });

        const {isAdmin, _id} =  await newUser.save();
        token = jwt.sign({isAdmin: isAdmin, id: _id}, process.env.JWT);
        res.status(200).json({
            id: _id,
            token: token
        });
        }catch(err){
            console.log(err)
            res.status(500).json(err);
        }
}


// Login
async function httpLogin(req, res) {
    const { email, password} = req.body;
    try{
        // query the user in the db
        const user = await User.findOne({email: email});
        !user && res.status(401).json("Wrong email or password");
        
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(401).json("Wrong password or email");
        token = jwt.sign({isAdmin: user.isAdmin, id: user._id}, process.env.JWT);
        res.status(200).json({
            id: user._id,
            token: token
        });
    }catch(err){
        res.status(500).json("something went wrong");
    }
}

async function verify(req, res, next){
    const auth = req.headers.authorization;
    if(auth){
        const token = auth.split(' ')[1];
        jwt.verify(token,process.env.JWT, (err, user)=>{
            if(err){
                return res.status(401).json('json token is not valid');
            }
            if(req.params.id === user.id || user.isAdmin){
                next();
            }
            else{
                return res.status(401).json('json token is not valid');
            }
            // req.user = user;
            
        });
    }else{
        res.status(400).json("not authenticated");
    }
}

module.exports = {
    httpRegister,
    httpLogin, 
    verify
}