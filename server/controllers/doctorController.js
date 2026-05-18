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
      const docId = req.docId
      const appointments = await appointmentModel.find({ docId })
      res.json({ success: true, appointments })

   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}
// API to mark the appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
   try {
      const { docId, appointmentId } = req.body
      const appointmentData = await appointmentModel.findById(appointmentId)

      if (appointmentData && appointmentData.docId === docId) {
         await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
         return res.json({ success: true, message: 'Appointment completed' })
      }
      else {
         return res.json({ success: false, message: 'Mark failed' })
      }
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
      const appointmentData = await appointmentModel.findById(appointmentId)

      if (appointmentData && appointmentData.docId === docId) {
         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
         return res.json({ success: true, message: "Appointment cancelled" })
      }
      else {
         return res.json({ success: false, message: "Cancellation Failed" })
      }

   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

// API to get dashboard data for doctor
const dashboardDataDoctor = async (req, res) => {
   try {
      const docId = req.docId;
      const appointments = await appointmentModel.find({ docId });
      let earnings = 0;
      appointments.map((item) => {
         if (item.isCompleted || item.payment) {
            earnings += item.amount;
         }
      })

      let patients = []
      appointments.map((item) => {
         if (!patients.includes(item.userId)) {
            patients.push(item.userId);
         }
      })

      const dashData = {
         earnings,
         appointments: appointments.length,
         patients: patients.length,
         latestAppointments: appointments.reverse().slice(0, 5)
      }
      res.json({ success: true, dashData })

   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

// API to get the doctor profile for doctor panel
const doctorProfile = async (req, res) => {
   try {
      const { docId } = req.body
      const profileData = await doctorModel.findById(docId).select('-password')
      res.json({ success: true, profileData })
   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

// API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
   try {
      const { docId, fees, address, available } = req.body
      await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
      res.json({ success: true, message: 'Profile updated' })
   }
   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, dashboardDataDoctor, doctorProfile, updateDoctorProfile }