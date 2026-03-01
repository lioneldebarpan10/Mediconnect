import express from 'express'
import addDoctor from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

const adminRouter = express.Router()
// when this api hits we have to send the image in the form data
// with the filled name image then only middleware process the image and form data

adminRouter.post('/add-doctor' , upload.single("image") ,addDoctor)

export default adminRouter;

