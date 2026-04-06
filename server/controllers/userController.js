import userModel from '../models/usermodel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// API to register user
const registerUser = async (req, res) => {
   try {

      const { name, email, password } = req.body
      // validate details
      if (!name || !email || !password) {
         return res.json({ message: "Missing details", success: false })
      }

      // validate email
      if (!validator.isEmail(email)) {
         return res.json({ message: "Invalid email", success: false })
      }

      // validate password strength
      if (password.length < 8) {
         return res.json({ message: "Password must be strong", success: false })
      }

      //hashing user password
      const salt = await bcrypt.genSalt(10); //10 ideal rounds for hashing
      const hashedPassword = await bcrypt.hash(password, salt)

      // save user data to database
      const userData = {
         name,
         email,
         password: hashedPassword
      }
      const newUser = new userModel(userData)
      const user = await newUser.save()
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

      res.json({ success: true, token })

   }
   catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: error.message
      })
   }
}

const loginUser = async (req, res) => {

   try {
      const { email, password } = req.body
      const user = await userModel.findOne({ email })

      if(!user){
         return res.json({
            message: "User doesn't exist",
            success: false
         })
      }
      const isMatch = await bcrypt.compare(password , user.password)
      if(isMatch){
         const token = jwt.sign({id: user._id} , process.env.JWT_SECRET)
         res.json({
            message: "Login Successful",
            token
         })
      }
      else{
         res.json({message: "Invalid Credentials" , success: false})
      }
   }
   catch (error) {
      res.json({message: error.message , success: false})

   }
}


export {
   registerUser,
   loginUser
}