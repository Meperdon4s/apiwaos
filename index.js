const mongoose = require('mongoose');

const {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, IP_SERVER}= require('./constantes');

const app=require("./app")


const dbURL=`mongodb+srv://rafaguzman:VthMC4E8f8IT33Nq@cluster0.gvqmluk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const PORT = process.env.PORT || 4000;

mongoose.connect(dbURL)
.then(mongoose=>console.log("Conectado a la db en el puerto 27017"))
.catch(err=> console.log(err))

app.listen(PORT, ()=>{
    console.log(`http://${IP_SERVER}:${PORT}/api`)
})