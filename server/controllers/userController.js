import userModel from '../models/usermodel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

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

      // is user already exists with these email
      const existingUser = await userModel.findOne({ email })
      if (existingUser) {
         return res.json({ success: false, message: "User already exists" })
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

// API to login user
const loginUser = async (req, res) => {

   try {
      const { email, password } = req.body
      const user = await userModel.findOne({ email })

      if (!user) {
         return res.json({
            message: "User doesn't exist",
            success: false
         })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
         res.json({
            success: true,
            message: "Login Successful",
            token
         })
      }
      else {
         res.json({ message: "Invalid Credentials", success: false })
      }
   }
   catch (error) {
      res.json({ message: error.message, success: false })

   }
}

// API to get user profile data
const getProfile = async (req, res) => {
   try {
      const userId = req.userId
      const userData = await userModel.findById(userId).select('-password')

      res.json({ success: true, userData })
   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

// API to update user profile
const updateProfile = async (req, res) => {
   try {
      const userId = req.userId
      const { name, phone, address, gender, dob } = req.body
      const imageFile = req.file

      if (!name || !phone || !gender || !dob) {
         res.json({ success: false, message: "Data is missing" })
      }

      await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), gender, dob })
      if (imageFile) {

         // upload image to cloudinary
         const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
         const imageURL = imageUpload.secure_url

         await userModel.findByIdAndUpdate(userId, { image: imageURL })
      }
      res.json({ success: true, message: "Profile updated" })

   }
   catch (error) {
      console.log(error)
      res.json({ message: error.message, success: false })

   }
}

// API to book an appointment 

const bookAppointment = async (req, res) => {

   try {
      const userId = req.userId;
      const { docId, slotTime, slotDate } = req.body
      const docData = await doctorModel.findById({ docId }).select('-password')

      if (!docData.available) {
         return res.json({ success: false, message: "Doctor is not available" })
      }

      let slots_booked = docData.slots_booked
      // checking for slots availibility
      if (slots_booked[slotDate]) {
         if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({ success: false, message: "Slot is not available" })
         }
         else {
            slots_booked[slotDate].push(slotTime)
         }
      }
      else {
         slots_booked[slotDate] = [];
         slots_booked[slotDate].psuh(slotTime)
      }

      const userData = await userModel.findById(userId).select('-password');
      delete docData.slots_booked


      const appointmentData = {
         userId,
         docId,
         slotDate,
         slotTime,
         amount: docData.fees,
         userData,
         docData,
         date: Date.now()
      }

      const newAppointment = new appointmentModel(appointmentData)
      await newAppointment.save()

      // save new slots data in docData
      await doctorModel.findByIdAndUpdate(docId, { slots_booked })
      res.json({
         success: true,
         message: "Appointment Booked"
      })
   }
   catch (error) {
      console.log(error)
      res.json({ message: error.message, success: false })
   }
}

const cancelAppointment = async (req, res) => {

}

// API to list down all appointments
const listAppointment = async (req, res) => {
   try{

      const userId = req.userId
      const appointments = await appointmentModel.findById

      res.json({success: true, appointments})
   }
   catch(error){
      console.log(error)
      res.json({success: false , message: error.message})
   }

}



export {
   registerUser,
   loginUser,
   getProfile,
   updateProfile,
   bookAppointment,
   listAppointment,
}