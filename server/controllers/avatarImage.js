const passport = require('passport');
const express = require('express');
const advertisementRouter = express.Router();
const prisma = require('../lib/prismaClient');

const fs = require('fs');

//const { isEmpty } = require('lodash');
//const { UserType } = require('@prisma/client');

const multer = require('multer');

// const addDays = (date, days) => {
//     let result = new Date(date);
//     result.setDate(result.getDate() + days);
//     return result;
//   }

//multer storage policy, including file destination and file naming policy
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./avatarImages');
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + '-' + file.originalname);
    }
});

//file filter policy, only accept image file
const theFileFilter = (req,file,cb) =>{
    console.log(file);
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/tiff' || file.mimetype === 'image/webp' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        cb(new Error('file format not supported'),false);
    }
}
//const variable for 10MB max file size in bytes
const maxFileSize = 10485760;
//multer upload project, setting receiving mode and which key components to use
const upload = multer({storage:storage,limits:{fileSize:maxFileSize},fileFilter:theFileFilter}).single('adImage');
//Error information holder
let error = '';
let errorMessage = '';
let errorStack = '';