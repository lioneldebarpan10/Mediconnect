import validator from "validator"; 
import bcrypt from "bcrypt"; 
import { v2 as cloudinary } from 'cloudinary'; // image upload
import doctorModel from "../models/doctorModel.js" 
import appointmentModel from "../models/appointmentModel.js"
import jwt from "jsonwebtoken" 

// API for adding Doctor
const addDoctor = async (req, res) => {

   try {

      const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
      // to parse the form data we need a middleware
      const imageFile = req.file

      // for API Testing - POST http://localhost:4000/api/admin/add-doctor
      //console.log({name ,email, password ,speciality , degree, experience, about, fees, address }, imageFile);

      // Step - 1 checking for all data to add doctor
      if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
         return res.json({
            success: false,
            messgae: "Missing Details",
         })
      }

      // Step - 2 it means we have all data , now we validate email format
      if (!validator.isEmail(email)) {
         return res.json({
            success: false,
            message: "Please enter a valid email",
         })
      }

      // Step - 3 validate password, request password is strong or not
      if (password.length < 8) {
         return res.json({
            success: false,
            message: "Please enter a strong password",
         })
      }

      // Step - 4 Hashing Doctor password
      const salt = await bcrypt.genSalt(10); // salt round selected
      const hashedPassword = await bcrypt.hash(password, salt)

      // Step - 5 upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
      const imageUrl = imageUpload.secure_url  // image url of cloudinary

      // Step - 6 save these doctor's data in Database

      const doctorData = {
         name,
         email,
         image: imageUrl,
         password: hashedPassword,
         speciality,
         degree,
         experience,
         fees,
         about,
         address: JSON.parse(address),
         date: Date.now()
      }

      // Step - 7 Store data in Doctor's DB
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();

      res.json({
         success: true,
         message: "Doctor Added"
      })

   }
   // STep - 8 if any steps failed then this
   catch (error) {
      console.log(error);
      res.json({
         success: false,
         message: error.message,
      })

   }
}

//  Step - 9  - API for Admin login so that only admin can add doctors

// before doing it add ADMIN SECRET in .env and jwt for token
const loginAdmin = async (req, res) => {

   try {

      // Step - 10 we receieve emailId & password from the request  body and matched with Admin Password & emailId from env
      const { email, password } = req.body;
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

         const token = jwt.sign(email + password, process.env.JWT_SECRET)
         res.json({
            success: true,
            token // using this token we are allow admin to login admin panel
         })
      }
      //  
      else {
         res.json({
            success: false,
            message: "Invalid Credentials"
         })
      }
   }
   catch (error) {
      res.json({
         success: false,
         messgae: error.message,
      })
   }
}

// http://localhost:4000/api/admin/add-doctor -> body -> Doctor's data -> Failed , because you are not an admin
// http://localhost:4000/api/admin/login -> email & password from env -> token generated -> token added in header as atoken(admin token) 
// then http://localhost:4000/api/admin/add-doctor -> POST request will be accepted

// API to get all doctors list for admin panel

const allDoctors = async (req, res) => {

   try {
      const doctors = await doctorModel.find({}).select('-password')
      res.json({
         success: true,
         doctors
      })
   }
   catch (error) {
      console.log(error)
      res.json({
         success: false,
         messsage: error.message
      })
   }
}

// API to get all appointments list
const appointmentsAdmin = async (req , res) => {
   try{
      const appointments = await appointmentModel.find({})
      res.json({success: true, appointments})
   }
   catch(error){
      console.log(error)
      res.json({success: false , message: error.message})
   }
}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
   try {
      const { appointmentId } = req.body
      const appointmentData = await appointmentModel.findById(appointmentId)

      // verify appointment user

      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

      // if we cancel the appointment then we have to release the occupied doctor's slots

      const { docId, slotDate, slotTime } = appointmentData
      const doctorData = await doctorModel.findById(docId)

      let slots_booked = doctorData.slots_booked

      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e != slotTime)
      await doctorModel.findByIdAndUpdate(docId, { slots_booked })

      res.json({ success: true, message: "Appointment Cancelled" })

   }
   catch (error) {
      console.log(error)
      res.json({ message: error.message })
   }
}

export { addDoctor, loginAdmin, allDoctors , appointmentsAdmin , appointmentCancel};