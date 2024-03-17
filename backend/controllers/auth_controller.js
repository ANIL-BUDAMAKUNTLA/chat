const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie=require('../utils/generateTokens')

async function signup(req,res,next){

    const {fullName,username,password,confirmPassword,gender}=req.body;
    try{
        if(password!=confirmPassword){
            return res.status(400).json(`passwords don't match`)
        }
        const user = await User.findOne({ username });

        
        if(user){
            return res.status(400).json(`user already exists with username ${user.username}`)
        }
        // https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // hash password
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser = new User({
            fullName,
            username,
            password : hashPassword,
            gender,
            profilePic:gender=="male"?boyProfilePic:girlProfilePic
        })
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(200).json(newUser)

    }catch(err){
        console.log('error in signup controller')
        res.status(500).json({'error':err.message})
        

    }
}



function logout(req,res,next){
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

async function login(req,res,next){
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
   
}

exports.login=login;
exports.logout=logout;
exports.signup=signup;