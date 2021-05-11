const passport = require('passport');

const express = require('express');
const advertisementRouter = express.Router();
const prisma = require('../lib/prismaClient');
const { isEmpty } = require('lodash');

advertisementRouter.post(
    '/create',
    passport.authenticate('jwt',{session:false}),
    async(req,res,next) => {
        try{

            if(isEmpty(req.body)){
                return res.status(400).json({
                    message: 'The objects in the request body are missing',
                    details: {
                        errorMessage: 'Creating an advertisement must explicitly be supplied with necessary fields.',
                        errorStack: 'necessary fields must be defined in the body with a valid id found in the database.',
                    }
                })
            }

            //get email and user id from request
            const { email, id } = req.user;
            //get adType from request body
            const { adType } = req.body;

            //find the requesting user in the database
            const theUser = await prisma.user.findFirst({where:{id:{equals:{id}}}})

            //test to see if the user is an admin or business user
            if(theUser.userType=="ADMIN" || theUser.userType=="BUSINESS"){
                //if there's no adType in the request body
                if(!adType){
                    return res.status(400).json({
                        message: 'An advertisement must has a type.',
                        details: {
                          errorMessage: 'Creating an advertisement must explicitly be supplied with a "adType" field.',
                          errorStack: '"adType" must be defined in the body with a valid id found in the database.',
                        }
                    })
                }
                
                //if adType is not valid
                if(adType!="BASIC"||adType!="EXTRA"){
                    return res.status(400).json({
                        message: 'adType is invalid.',
                        details: {
                          errorMessage: 'adType must be BASIC or EXTRA.',
                          errorStack: '"adType" must be assigned with BASIC or EXTRA.',
                        }
                      })
                }

                //decompose necessary fields from request body
                const {adTitle,adDuration,adPosition,imagePath,externalLink,published} = req.body;

                //if there's no adTitle field
                if(!adTitle){
                    return res.status(400).json({
                        message: 'An advertisement needs a title.',
                        details: {
                          errorMessage: 'Creating an advertisement must explicitly be supplied with a "adTitle" field.',
                          errorStack: '"adTitle" must be defined in the body with a valid id found in the database.',
                        }
                    })
                }

                //if there's no published field in the reqeust body or published field is not valid
                if(!published || typeof published === 'boolean'){
                    return res.status(400).json({
                        message: 'An published filed must be provided',
                        details: {
                          errorMessage: 'Creating an idea must explicitly be supplied with a "published" field.',
                          errorStack: '"Published" must be defined in the body with a valid value.',
                        }
                    })
                }

                //if the content size of adTitle is not valid
                if(adTitle.length <= 2 || adTitle.length >=40){
                    return res.status(400).json({
                        message: 'adTitle size is invalid.',
                        details: {
                          errorMessage: 'adTitle length must be longer than 2 and shorter than 40.',
                          errorStack: '"adTitle" content size must be valid',
                        }
                    })
                }

                //if there's no adDuration field in the request body
                if(!adDuration){
                    return res.status(400).json({
                        message: 'adDuration must be provided.',
                        details: {
                          errorMessage: 'adDuration must be provided in the body with a valid length',
                          errorStack: '"adDuration" must be provided in the body with a valid lenght',
                        }
                    })
                }

                //if there's no adPosition field in the 
                if(!adPosition){
                    return res.status(400).json({
                        message: 'adPosition is missing.',
                        details: {
                          errorMessage: 'Creating an advertisement must explicitly be supplied with a "adPosition" field.',
                          errorStack: '"adPosition" must be defined in the body with a valid position found in the database.',
                        }
                    })
                }

                //create an advertisement object
                const createAnAdvertisement = await prisma.advertisement.create({
                    data:{
                        ownerId:id,
                        adTitle:adTitle,
                        adDuration:adDuration,
                        adType:adType,
                        imagePath:imagePath,
                        externalLink:externalLink,
                        published:published
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
                message: "An error occured while trying to create an Idea.",
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        } finally {
            await prisma.$disconnect();
        }
    }
)

module.exports = advertisementRouter;