const mongoose = require('mongoose');

const {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, IP_SERVER}= require('./constantes');

const app=require("./app")


//const dbURL=`mongodb://${IP_SERVER}:27017/${DB_NAME}`
const dbURL=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`


const PORT = process.env.PORT || 4000;

mongoose.connect(dbURL)
.then(mongoose=>console.log("Conectado a la db en el puerto 27017"))
.catch(err=> console.log(err))

app.listen(PORT, ()=>{
    console.log(`https://apiwaos.onrender.com/api`)
})