// const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();


// const generateTokenAndSetCookie = (userId, res) => {
// 	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// 		expiresIn: "15d",
// 	});

// 	res.cookie("jwt", token, {
// 		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
// 		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
// 		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
// 		// secure: process.env.NODE_ENV !== "development",
// 	});
// };


// module.exports= generateTokenAndSetCookie;
const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });

        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development",
        });
    } catch (error) {
        console.error('Error generating token and setting cookie:', error);
        // Handle the error appropriately, such as sending an error response
        // res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = generateTokenAndSetCookie;
