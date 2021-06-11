const passport = require('passport');
const express = require('express');
const userSegmentRequestRouter = express.Router();
const prisma = require('../lib/prismaClient');
const { isString, isEmpty } = require('lodash');

userSegmentRequestRouter.post(
    '/create',
    passport.authenticate('jwt',{session:false}),
    async(req,res) => {
        try{
            let error = '';
            let errorMessage = '';
            let errorStack = '';

            const {id} = req.user;

            //if there's no object in the request body
            if(isEmpty(req.body)){
                return res.status(400).json({
                    message: 'The objects in the request body are missing',
                    details: {
                        errorMessage: 'Creating a segment request must supply necessary fields explicitly.',
                        errorStack: 'necessary fields must be provided in the body with valid values',
                    }
                })
            }

            const {country,province,segmentName,subSegmentName} = req.body;

            if(!country||!isString(country)){
                error+='country field is not in the request body. ';
                errorMessage+='Creating a segment request must explicitly be supplied with a valid contry field.'
                errorStack+='country must be provided in the body with a valid value. '
            }

            if(!province||!isString(province)){
                error+='province field is not in the request body. ';
                errorMessage+='Creating a segment request must explicitly be supplied with a valid province field. ';
                errorStack+='province must be provided in the body with a valid value. ';
            }

            if(!segmentName||!isString(segmentName)){
                error+='segmentName field is not in the request body. ';
                errorMessage+='Creating a segment request must explicitly be supplied with a valid segmentName field. ';
                errorStack+='segmentName must be provided in the body with a valid value. ';
            }

            //If there's error in error holder
            if(error||errorMessage||errorStack){
                return res.status(400).json({
                    message: error,
                    details: {
                      errorMessage: errorMessage,
                      errorStack: errorStack
                    }
                });
            }

            const result = await prisma.segmentRequest.create({
                data:{
                    userId:id,
                    country:country,
                    province:province,
                    segmentName:segmentName,
                    subSegmentName:subSegmentName
                }
            })

            res.status(200).json(result);

        }catch(error){
            res.status(400).json({
                message: error.message,
                details: {
                  errorMessage: error.message,
                  errorStack: error.stack,
                }
            });
        }finally{
            await prisma.$disconnect();
        }
    }
)

module.exports = userSegmentRequestRouter;