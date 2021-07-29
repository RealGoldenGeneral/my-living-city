const passport = require('passport');
const express = require('express');
const avatarRouter = express.Router();
const prisma = require('../lib/prismaClient');
const fs = require('fs');
const multer = require('multer');

//multer storage policy, including file destination and file naming policy
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/avatarImages');
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + '-' + file.originalname);
    }
});

//file filter policy, only accept image file
const theFileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/tiff' || file.mimetype === 'image/webp' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        cb(new Error('file format not supported'),false);
    }
}
//const variable for 2MB max file size in bytes
const maxFileSize = 2097152;
//multer upload project, setting receiving mode and which key components to use
const upload = multer({
  storage:storage,
  limits:{fileSize:maxFileSize},
  fileFilter:theFileFilter
}).single("image");

//make this get the userId and add it to the image name;
avatarRouter.get(
    '/',
    passport.authenticate('jwt',{session:false}),
    async (req, res, next) => {
      try {
        const { id } = req.user;
        //find the requesting user in the database
        const foundUser = await prisma.user.findUnique({
            where:{id:id}
        });
        res.json({
          route: 'welcome to Avatar Router'
        })
      } catch (error) {
              res.status(400).json({
                  message: error.message,
          details: {
            errorMessage: error.message,
            errorStack: error.stack,
          }
              });
      }
    }
  )

  avatarRouter.post(
    '/image',
    passport.authenticate('jwt',{session:false}),
    async (req, res, next) => {
      
      try {
        let imagePath = '';
        //if there's req.file been parsed by multer
        if(req.file){
            //console.log(req.file);
            imagePath = req.file.path;
            console.log(imagePath);
        }
        upload(req, res, function (error) {
          if(error){
            throw error;
          }
      });
        const{id}=req.user;
        const result = await prisma.user.update({
          where: { id:id},
          data: {imagePath:imagePath}
        });
        res.status(200).json(result);
      } catch (error) {
          res.status(400).json({
            message: error.message,
            details: {
              errorMessage: error.message,
              errorStack: error.stack,
            }
          });
      }
    }
  )
  
  module.exports = avatarRouter;