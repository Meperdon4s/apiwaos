const express = require('express')
const AuthController= require('../controllers/Auth')

const api =express.Router()

api.post("/auth/registro", AuthController.Registrar)
api.post("/auth/login", AuthController.Login)

module.exports = api;