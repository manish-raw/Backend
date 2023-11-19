const mongoose = require('mongoose')
const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err)
        
    }
}

module.exports = dbConnection;