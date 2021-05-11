const passport = require('passport');

const express = require('express');
const advertisementRouter = express.Router();
const prisma = require('../lib/prismaClient');

advertisementRouter.post(
    '/create',
    passport.authenticate('jwt',{session:false}),
    async(req,res,next) => {
        try{
            const { email, id } = req.user;
            const { adType } = req.body;

            const theUser = await prisma.user.findFirst({where:{id:{equals:{id}}}})

            if(theUser.userType=="ADMIN" || theUser.userType=="BUSINESS"){
                if(!adType){
                    return res.status(400).json({
                        message: 'An advertisement must has a type.',
                        details: {
                          errorMessage: 'Creating an advertisement must explicitly be supplied with a "adType" field.',
                          errorStack: '"adType" must be defined in the body with a valid id found in the database.',
                        }
                    })
                }
                
                if(adType!="BASIC"||adType!="EXTRA"){
                    return res.status(400).json({
                        message: 'adType is invalid.',
                        details: {
                          errorMessage: 'adType must be BASIC or EXTRA.',
                          errorStack: '"adType" must be assigned with BASIC or EXTRA.',
                        }
                      })
                }

                const {adTitle,adDuration,adPosition,imagePath,externalLink,published} = req.body;

                if(!adTitle){
                    return res.status(400).json({
                        message: 'An advertisement needs a title.',
                        details: {
                          errorMessage: 'Creating an advertisement must explicitly be supplied with a "adTitle" field.',
                          errorStack: '"adTitle" must be defined in the body with a valid id found in the database.',
                        }
                    })
                }

                if(!published || typeof published === 'boolean'){
                    return res.status(400).json({
                        message: 'An published filed must be provided',
                        details: {
                          errorMessage: 'Creating an idea must explicitly be supplied with a "published" field.',
                          errorStack: '"Published" must be defined in the body with a valid value.',
                        }
                    })
                }

                if(adTitle.length <= 2 || adTitle.length >=40){
                    return res.status(400).json({
                        message: 'adTitle size is invalid.',
                        details: {
                          errorMessage: 'adTitle length must be longer than 2 and shorter than 40.',
                          errorStack: '"adTitle" content size must be valid',
                        }
                    })
                }

                if(!adDuration){
                    return res.status(400).json({
                        message: 'adDuration must be provided.',
                        details: {
                          errorMessage: 'adDuration must be provided in the body with a valid length',
                          errorStack: '"adDuration" must be provided in the body with a valid lenght',
                        }
                    })
                }

                if(!adPosition){
                    return res.status(400).json({
                        message: 'adPosition is missing.',
                        details: {
                          errorMessage: 'Creating an advertisement must explicitly be supplied with a "adPosition" field.',
                          errorStack: '"adPosition" must be defined in the body with a valid position found in the database.',
                        }
                    })
                }

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
                })
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