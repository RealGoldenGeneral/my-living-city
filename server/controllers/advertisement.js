const passport = require('passport');
const express = require('express');
const advertisementRouter = express.Router();
const prisma = require('../lib/prismaClient');

const fs = require('fs');

const { isEmpty } = require('lodash');
const { UserType } = require('@prisma/client');

const multer = require('multer');
const { advertisements } = require('../lib/prismaClient');

const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

//multer storage policy, including file destination and file naming policy
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
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
//For handling post request
advertisementRouter.post(
    '/create',
    passport.authenticate('jwt',{session:false}),
    async(req,res) => {
        //multer error handling method
        upload(req, res, function (err) {
            if(err){
                console.log(err);
                error+=err+' ';
                errorMessage+=err+' ';
                errorStack+=err+' ';
            }
        });
        try{
            //get email and user id from request
            const { email, id } = req.user;
            //find the requesting user in the database
            const theUser = await prisma.user.findUnique({
                where:{id:id},
                select:{userType:true}
            });

            //test to see if the user is an admin or business user
            if(theUser.userType=="ADMIN" || theUser.userType=="BUSINESS"){

                //if there's no object in the request body
                if(isEmpty(req.body)){
                    return res.status(400).json({
                        message: 'The objects in the request body are missing',
                        details: {
                            errorMessage: 'Creating an advertisement must supply necessary fields explicitly.',
                            errorStack: 'necessary fields must be provided in the body with a valid id found in the database.',
                        }
                    })
                }

                //decompose necessary fields from request body
                const {adType,adTitle,adDuration,adPosition,externalLink,published} = req.body;

                //console.log(adType,adTitle,adDuration,adPosition,externalLink,published);

                //if there's no adType in the request body
                if(!adType){
                    error+='An advertisement must has a type. ';
                    errorMessage+='Creating an advertisement must explicitly be supplied with a "adType" field. ';
                    errorStack+='adType must be defined in the body with a predefined value. ';
                }
                
                //if adType is not valid
                if(adType&&!(adType=="BASIC"||adType=="EXTRA")){
                    error+='adType is invalid. ';
                    errorMessage+='adType must be predefined value. ';
                    errorStack+='adType must be assigned with predfined value. ';
                }

                //if there's no adTitle field
                if(!adTitle){
                    error+='An advertisement needs a title. ';
                    errorMessage+='Creating an advertisement must explicitly supply a adTitle field. ';
                    errorStack+='adTitle must be defined in the body with a valid length. ';
                }

                //if the length of adTitle is not valid
                if(adTitle){
                    if(adTitle.length < 2 || adTitle.length >40){
                        error+='adTitle size is invalid. ';
                        errorMessage+='adTitle length must be longer than 2 and shorter than 40. ';
                        errorStack+='adTitle content size must be valid ';
                    }
                }

                //console.log(adTitle.length);
                
                //if there's no published field in the reqeust body or published field is not valid
                if(!published){
                    error+='An published filed must be provided. ';
                    errorMessage+='Creating an advertisement must explicitly supply a published field. ';
                    errorStack+='Published must be defined in the body with a valid value. ';
                }
                //published value container variable
                let thePublished = false;
                //Transfer the published variable into boolean value, if value can't be transfered into boolean, push error into error stack.
                if(published&&(published=='false'||published=='true')){
                    if(published=='true'){
                        thePublished = true;
                    }else{
                        thePublished = false;
                    }
                }else{
                    error+='published must be predefined values. ';
                    errorMessage+='Creating an advertisement must explicitly supply a valid published value. '
                    errorStack+='Published must be provided in the body with a valid value. ';
                }

                //if there's no adDuration field in the request body
                if(!adDuration || adDuration <= 0){
                    error+='adDuration must be provided. ';
                    errorMessage+='adDuration must be provided in the body with a valid length. ';
                    errorStack+='adDuration must be provided in the body with a valid lenght. ';
                }

                //if there's no adPosition field in the 
                if(!adPosition){
                    error+='adPosition is missing. ';
                    errorMessage+='Creating an advertisement must explicitly be supply a adPosition field. ';
                    errorStack+='"adPosition" must be provided in the body with a valid position found in the database. '
                }
                //if there's no external link provided in the request
                if(!externalLink){
                    error+='externalLink is missing. ';
                    errorMessage+='Creating an advertisement must explicitly be supply a externalLink field. ';
                    errorStack+='"adPosition" must be provided in the body with a valid externalLink.'
                }

                //Image path holder
                let imagePath = '';
                //if there's req.file been parsed by multer
                if(req.file){
                    //console.log(req.file);
                    imagePath = req.file.path;
                }else{
                    error+='adImage is missing. ';
                    errorMessage+='Creating an advertisement must explicitly be supply a adImage field. ';
                    errorStack+='"adPosition" must be provided in the body with a valid image.'
                }
                //If there's error in error holder
                if(error&&errorMessage&&errorStack){
                    //multer is a kind of middleware, if file is valid, multer will add it to upload folder. Following code are responsible for deleting files if error happened.
                    if(fs.existsSync(imagePath)){
                        fs.unlinkSync(imagePath);
                    }
                    let tempError = error;
                    let tempErrorMessage = errorMessage;
                    let tempErrorStack = errorStack;
                    error = '';
                    errorMessage = '';
                    errorStack = '';

                    return res.status(400).json({
                        message: tempError,
                        details: {
                          errorMessage: tempErrorMessage,
                          errorStack: tempErrorStack
                        },
                        reqBody: {
                            adType: adType,
                            adTitle:adTitle,
                            adDuration: adDuration,
                            externalLink: externalLink,
                            published: published
                        }
                    });
                }
                //Calculate the ending date of advertisement based on duration field.
                let endDate = addDays(new Date(), Number(adDuration));
                //create an advertisement object
                const createAnAdvertisement = await prisma.advertisements.create({
                    data:{
                        ownerId:id,
                        adTitle:adTitle,
                        duration: endDate,
                        adType:adType,
                        adPosition:adPosition,
                        imagePath:imagePath,
                        externalLink:externalLink,
                        published:thePublished
                    }
                });

                //sending user the successfull status with created advertisement object
                res.status(200).json(createAnAdvertisement);
            }else{
                return res.status(403).json({
                    message: "You don't have the right to add an advertisement!",
                    details: {
                      errorMessage: 'In order to create an advertisement, you must be an admin or business user.',
                      errorStack: 'user must be an admin or business if they want to create an advertisement',
                    }
                });
            }
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "An error occured while trying to create an Advertisement.",
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        } finally {
            await prisma.$disconnect();
        }
    }
);

module.exports = advertisementRouter;