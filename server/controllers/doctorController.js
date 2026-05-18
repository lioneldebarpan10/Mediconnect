import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import appointmentModel from "../models/appointmentModel.js"
import jwt from "jsonwebtoken"

// we need this in admin and doctor dashboard
const changeAvailability = async (req, res) => {
   try {

      const { docId } = req.body
      const docData = await doctorModel.findById(docId)
      await doctorModel.findByIdAndUpdate(
         docId,
         { available: !docData.available }
      )
      res.json({
         success: true,
         message: "Availibility Changed"
      })
   }
   catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: error.message
      })
   }
}

// API to fetch doctor list in Dashboard
const doctorList = async (req, res) => {
   try {
      const doctors = await doctorModel.find({}).select(['-password', '-email'])
      res.json({
         success: true,
         doctors
      })
   }
   catch (error) {
      console.log(error)
      res.json({
         success: false,
         message: error.message
      })
   }
}

// API to login doctor
const loginDoctor = async (req, res) => {
   try {
      const { email, password } = req.body

      const user = await doctorModel.findOne({ email })
      if (!user) {
         return res.json({ success: false, message: "Invalid Credentials" })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
         return res.json({ success: true, token })

      }
      else {
         return res.json({ success: false, message: "Invalid Credentials" })
      }

   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })

   }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {

   try {
      const docId  = req.docId
      const appointments = await appointmentModel.find({ docId })
      res.json({ success: true, appointments })
      
   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
   try {
      const { docId, appointmentId } = req.body
      const appointmentData = await appointmentModel.find(appointmentId)
      if (appointmentData && appointmentData.docId === docId) {
         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
         return res.json({success: true , message: "Appointment cancelled"})
      }
      res.json({success: false , message: "Appointment cancelled"})

   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor , appointmentCancel}