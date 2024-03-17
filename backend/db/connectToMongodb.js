const mongoose=require('mongoose')

const connectToMongoDB = async () => {
	
		mongoose.connect('mongodb://127.0.0.1:27017/chat')
    .then(() => {
        console.log("MONGO CONNECTION OPEN! 😊")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR! 😔")
        console.log(err)
    })
	
}



    module.exports = connectToMongoDB;