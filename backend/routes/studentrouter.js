const multer= require('multer')
const fs=require('fs')
const { handleUpload } = require('../controllers/studentcontroller')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = 'uploads/';
      
  
      // Check if the directory exists, if not, create it recursively
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      cb(null, uploadDir); // Use the uploadDir as the destination
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
    }
  });
  
  const upload = multer({ storage: storage });


const route= require('express').Router()
route.post('/upload',upload.single('offerLetter'),handleUpload)


module.exports=route