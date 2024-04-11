const User=require("../models/user")
const bcrypt= require('bcryptjs')

async function Registrar(req,res){
    const {nombreusuario, apellidos, email,  password}=req.body

    try {
        if(!email) res.status(400).send({msg:"El email es obligatorio"})
        if(!password) res.status(400).send({msg:"El password es obligatorio"})

        const usuario= new User({
            nombreusuario,
            apellidos,
            email: email.toLowerCase(),
            role:"admin",
            active: true

        })
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt);

        usuario.password = hashPassword

        await usuario.save().then(()=>{
            res.status(200).send({msg:"Datos guardados correctamente"})
        })

    } catch (error) {
        res.status(500).send({
            msg:"No se guardo la informacion"
        })
    }
}

async function Login (req,res){
    const {email, password} = req.body

    try {
        if(!email) res.status(400).send({msg:"El email es obligatorio"})
        if(!password) res.status(400).send({msg:"El password es obligatorio"})

        const emailLowerCase = email.toLowerCase();

        const response  = await User.findOne({email: emailLowerCase})

        bcrypt.compare(password, response.password, (bcryptError, check)=>{
            if(bcryptError){
                res.status(500).send({msg:"Error del usuario"})
            }else if(!check){
                res.status(400).send({msg:"Password incorrecto"})
            }else if(!response.active){
                res.status(400).send({msg:"Usuario inactivo"})
            }else{
                res.status(200).send({msg:"Usuario logueado correctamente"})
            }
        })

    } catch (error) {
        res.status(500).send({msg:"Error al autenticar"})
    }
}

module.exports= {
    Registrar,
    Login
}