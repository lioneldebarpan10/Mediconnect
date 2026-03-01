import jwt from 'jsonwebtoken';

// Admin Authentication middleware

const authAdmin = async (req, res, next) => {

   try {

      // Step -1 verify the token and if in the header there is token then only
      // allow user to make the API call
      const { atoken } = req.headers; // atoken = admin token
      // if token is not available
      if (!atoken) {
         return res.json({
            success: false,
            messgae: "Not Authorized Login again"
         })
      }
      // Step - 2 if token is there then decode it
      const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

      if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
         return res.json({
            success: false,
            messgae: "Not Authorized Login again"
         })
      }

      // if decoded token matched with concatenated email & password then simply call callback fucntion
      next();

   }
   catch (error) {
      console.log(error);
      res.json({
         success: false,
         message: error.message,
      })
   }
}

export default authAdmin;