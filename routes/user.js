const express = require('express')

const {
  logIn,signUp
}=require("../controllers/userController")

const router = express.Router()

// login
router.post('/login', logIn)

// signin
router.post('/signup', signUp)


module.exports = router