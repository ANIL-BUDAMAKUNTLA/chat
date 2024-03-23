const mongoose=require('mongoose')

const connectToMongoDB = async () => {
	
		mongoose.connect('mongodb+srv://anilb091929:anil@cluster0.abti02l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("MONGO CONNECTION OPEN! 😊")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR! 😔")
        console.log(err)
    })
	
}



    module.exports = connectToMongoDB;