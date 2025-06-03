const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { isPassportNumber } = require('validator')



const register  = async (req,res)=>{
   // const {name, email,password} = req.body
   const user = await User.create({...req.body})
    //const salt  = await bcrypt.genSalt(10)
    const token = user.createJWT()
    res.status(201).json({user:{name:user.name},token})
    //const hashedPassword = await bcrypt.hash(password,salt)
    //const tempuser = {name,email,password:hashedPassword}

    if(!name || !email || !password ){
        return res.status(500).json({ msg: `invlaid` })
    }
    //const user = await User.create({ ...tempuser});
    res.status(200).json({user})
    }
    


    const login = async (req, res) => {
        const { email, password } = req.body
      
        if (!email || !password) {
          return res.status(400).json({msg:`there is no user `})
        }
        const user = await User.findOne({ email })

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
          res.status(500).json({msg:'Invalid Credentials'})
        }
        // compare password
        const token = user.createJWT()
        res.status(200).json({ user: { name: user.name }, token })
      }

    module.exports =
     {
        register,
        login
    }