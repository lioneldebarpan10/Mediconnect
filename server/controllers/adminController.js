import validator from "validator"; // validate email and password
import bcrypt from "bcrypt"; // hashing
import { v2 as cloudinary } from 'cloudinary'; // image upload
import doctorModel from "../models/doctorModel.js" // for storng data in DB


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
      const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type: "image"})
      const imageUrl = imageUpload.secure_url  // image url of cloudinary

      // Step - 6 save these doctor's data in Database

      const doctorData = {
         name,
         email,
         image:imageUrl,
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
         success:true,
         message: "Doctor Added"
      })

   }
   catch (error) {
      console.log(error);
      res.json({
         success: false,
         message: error.message,
      })

   }
}
export default addDoctor;