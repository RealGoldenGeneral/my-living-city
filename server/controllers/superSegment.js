const passport = require('passport');
const express = require('express');
const superSegmentRouter = express.Router();
const prisma = require('../lib/prismaClient');

const { isEmpty, isInteger, isString } = require('lodash');
const { UserType } = require('@prisma/client');

superSegmentRouter.post(
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

            if(theUser.userType==='ADMIN'){
                const {name,country,province} = req.body;

                if(!name||!isString(name)){
                    error+='A name is need for creating a super segment. ';
                    errorMessage+='super segment name must be provided as a string variable. ';
                    errorStack+='super segment name must be provided in the request body. ';
                }

                if(!country||!isString(country)){
                    error+='Country field is need for creating a super segment. ';
                    errorMessage+='super segment country field must be provided as a string variable. ';
                    errorStack+='country must be provided in the request body. ';
                }

                if(!province||!isString(province)){
                    error+='Province field is need for creating a super segment. ';
                    errorMessage+='Province field must be provided as a string variable. ';
                    errorStack+='province must be provided in the request body. ';
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

                const result = await prisma.superSegment.create({
                    data:{
                        name:name,
                        country:country,
                        province:province
                    }
                })

                res.status(200).json(result);
            }else{
                return res.status(403).json({
                    message: "You don't have the right to add a super segment!",
                    details: {
                      errorMessage: 'In order to create super a segment, you must be an admin or business user.',
                      errorStack: 'user must be an admin if they want to create a super segment',
                    }
                });
            }
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "An error occured while trying to create a segment.",
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }finally{
            await prisma.$disconnect();
        }
    }
);

superSegmentRouter.get(
    '/getAll',
    passport.authenticate('jwt',{session:false}),
    async(req,res) => {
        try{
            const superSegments = await prisma.superSegment.findMany();

            res.status(200).json(superSegments);
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "An error occured while trying to create a segment.",
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

module.exports = superSegmentRouter;