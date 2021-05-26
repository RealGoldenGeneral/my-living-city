const passport = require('passport');
const express = require('express');
const segmentRouter = express.Router();
const prisma = require('../lib/prismaClient');

const { isEmpty } = require('lodash');
const { UserType } = require('@prisma/client');

segmentRouter.post(
    '/create',
    passport.authenticate('jwt',{session:false}),
    async(req,res) => {
        try{
            let errorMessage,errorStack;
            //get email and user id from request
            const { email, id } = req.user;
            //find the requesting user in the database
            const theUser = await prisma.user.findUnique({
                where:{id:id},
                select:{userType:true}
            });

            if (theUser.userType == 'ADMIN'){

            }else{
                return res.status(403).json({
                    message: "You don't have the right to add a segment!",
                    details: {
                      errorMessage: 'In order to create an segment, you must be an admin or business user.',
                      errorStack: 'user must be an admin if they want to create a segment',
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
)