const passport = require('passport');
const express = require('express');
const subSegmentRouter = express.Router();
const prisma = require('../lib/prismaClient');

const { isEmpty, isNumber } = require('lodash');
const { UserType } = require('@prisma/client');


subSegmentRouter.post(
    '/create',
    passport.authenticate('jwt',{session:false}),
    async(req,res) => {
        try{
            let error = '';
            let errorMessage = '';
            let errorStack = '';
            //get email and user id from request
            const { email, id } = req.user;
            //find the requesting user in the database
            const theUser = await prisma.user.findUnique({
                where:{id:id},
                select:{userType:true}
            });
            //User must be admin to create subsegment
            if(theUser.userType == 'ADMIN'){
                const {segId,name,lat,lon} = req.body;

                //if there's no object in the request body
                if(isEmpty(req.body)){
                    return res.status(400).json({
                        message: 'The objects in the request body are missing',
                        details: {
                            errorMessage: 'Creating a subsegment must supply necessary fields explicitly.',
                            errorStack: 'necessary fields must be provided in the body with valid values',
                        }
                    })
                }
                //if sedId is missing
                if(!segId){
                    error+='A subsegment must has a segId field. ';
                    errorMessage+='Creating a subsegment must explicitly be supplied with a segId field. ';
                    errorStack+='segId must be provided in the body with a valid value. ';
                }else{
                    //if segId provided, check whether can be found in the database
                    const theSeg = await prisma.segments.findUnique({
                        where:{
                            segId:segId
                        }
                    });
                    //if the segId can't be found in the database
                    if(!theSeg){
                        error+='A subsegment must has a segId which matches one exising segment\'s segId';
                        errorMessage+='Creating a subsegment must explicitly be supplied with a segId value which can be found in segment table. ';
                        errorStack+='segId must be provided in the body with a valid value. ';
                    }
                }

                //if name field is not provided
                if(!name){
                    error+='A subsegment must has a name field. ';
                    errorMessage+='Creating a subsegment must explicitly be supplied with a name field. ';
                    errorStack+='name must be provided in the body with a valid value. ';
                }

                //if lat is not provided or lat is not valid
                if(!lat || !isNumber(lat)){
                    error+='A subsegment must has a lat field with a valid value. ';
                    errorMessage+='Creating a subsegment must explicitly be supplied with a lat field. ';
                    errorStack+='lat must be provided in the body with a valid value. ';
                }

                //if lon is not provided or lon is not valid
                if(!lon || !isNumber(lon)){
                    error+='A subsegment must has a lon field with a valid value. ';
                    errorMessage+='Creating a subsegment must explicitly be supplied with a lon field. ';
                    errorStack+='lon must be provided in the body with a valid value. ';
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

                const result = await prisma.subSegments.create({
                    data:{
                        segRef:{
                            connect:{segId:segId}
                        },
                        name:name,
                        lat:lat,
                        lon:lon
                    }
                });

                res.status(200).json(result);

            }else{
                return res.status(403).json({
                    message: "You don't have the right to add a subsegment!",
                    details: {
                      errorMessage: 'In order to create a subsegment, you must be an admin or business user.',
                      errorStack: 'user must be an admin if they want to create a subsegment',
                    }
                });
            }
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "An error occured while trying to update an Advertisement.",
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


module.exports = subSegmentRouter;