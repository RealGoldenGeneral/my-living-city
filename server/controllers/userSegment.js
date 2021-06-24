const passport = require('passport');
const express = require('express');
const userSegmentRouter = express.Router();
const prisma = require('../lib/prismaClient');
const { isInteger } = require('lodash');
const { isEmpty } = require('lodash');
const { subSegments, user } = require('../lib/prismaClient');

userSegmentRouter.post(
    '/create',
    passport.authenticate('jwt',{session:false}),
    async(req,res)=>{
        try{
            let error = '';
            let errorMessage = '';
            let errorStack = '';
            //get email and user id from request
            const { email, id } = req.user;

            const exist = await prisma.userSegments.findFirst({
                where:{userId:id}
            });

            if(exist){
                return res.status(409).json("You are not allow to create another user segment!");
            }

            console.log(req.body);
            const {homeSegmentId,workSegmentId,schoolSegmentId,homeSubSegmentId,workSubSegmentId,schoolSubSegmentId} = req.body;

            if(homeSegmentId){
                if(!isInteger(homeSegmentId)){
                    error+='homeSegment Id must be integer.';
                    errorMessage+='homeSegment Id must be provided in request body as an integer.';
                    errorStack+='homeSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.segments.findUnique({
                        where: {segId:homeSegmentId}
                    });

                    if(!queryResult){
                        error+='homeSegmend Id doesn\'t exist in the database!';
                        errorMessage+='homeSegment Id must be provided with a existing segment id in the database.';
                        errorStack+='homeSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(workSegmentId){
                if(!isInteger(workSegmentId)){
                    error+='workSegment Id must be integer.';
                    errorMessage+='workSegment Id must be provided in request body as an integer.';
                    errorStack+='workSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.segments.findUnique({
                        where: {segId:workSegmentId}
                    });

                    if(!queryResult){
                        error+='workSegmend Id doesn\'t exist in the database!';
                        errorMessage+='workSegment Id must be provided with a existing segment id in the database.';
                        errorStack+='workSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(schoolSegmentId){
                if(!isInteger(schoolSegmentId)){
                    error+='schoolSegment Id must be integer.';
                    errorMessage+='schoolSegment Id must be provided in request body as an integer.';
                    errorStack+='schoolSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.segments.findUnique({
                        where: {segId:schoolSegmentId}
                    });

                    if(!queryResult){
                        error+='schoolSegmend Id doesn\'t exist in the database!';
                        errorMessage+='schoolSegment Id must be provided with a existing segment id in the database.';
                        errorStack+='schoolSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(homeSubSegmentId){
                if(!homeSegmentId){
                    error+='homeSegmend Id must be provide if request body contains homeSubSegmentId.';
                    errorMessage+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                    errorStack+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                }

                if(!isInteger(homeSubSegmentId)){
                    error+='homeSubSegment Id must be integer.';
                    errorMessage+='homeSubSegment Id must be provided in request body as an integer.';
                    errorStack+='homeSubSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.subSegments.findFirst({
                        where:{id:homeSubSegmentId,segId:homeSegmentId}
                    });

                    if(!queryResult){
                        error+='homeSubSegment Id doesn\'t exist in the database!';
                        errorMessage+='homeSubSegement Id must be provided with a existing segment id in the database.';
                        errorStack+='homeSubSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(workSubSegmentId){
                if(!workSegmentId){
                    error+='workSegmend Id must be provide if request body contains homeSubSegmentId.';
                    errorMessage+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                    errorStack+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                }

                if(!isInteger(workSubSegmentId)){
                    error+='workSubSegment Id must be integer.';
                    errorMessage+='workSubSegment Id must be provided in request body as an integer.';
                    errorStack+='workSubSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.subSegments.findFirst({
                        where:{id:workSubSegmentId,segId:workSegmentId}
                    });

                    if(!queryResult){
                        error+='workSubSegment Id doesn\'t exist in the database!';
                        errorMessage+='workSubSegement Id must be provided with a existing segment id in the database.';
                        errorStack+='workSubSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(schoolSubSegmentId){
                if(!schoolSegmentId){
                    error+='homeSegmend Id must be provide if request body contains homeSubSegmentId.';
                    errorMessage+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                    errorStack+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                }

                if(!isInteger(schoolSubSegmentId)){
                    error+='homeSubSegment Id must be integer.';
                    errorMessage+='homeSubSegment Id must be provided in request body as an integer.';
                    errorStack+='homeSubSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.subSegments.findFirst({
                        where:{id:schoolSubSegmentId,segId:schoolSegmentId}
                    });

                    if(!queryResult){
                        error+='schoolSubSegment Id doesn\'t exist in the database!';
                        errorMessage+='schoolSubSegement Id must be provided with a existing segment id in the database.';
                        errorStack+='schoolSubSegment Id must be provided with a existing segment id in the database.';
                    }
                }
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

            const result = await prisma.userSegments.create({
                data:{
                    userId:id,
                    homeSegmentId:homeSegmentId,
                    workSegmentId:workSegmentId,
                    schoolSegmentId:schoolSegmentId,
                    homeSubsegmentId:homeSubSegmentId,
                    workSubSegmentId:workSubSegmentId,
                    schoolSubSegmentId:schoolSubSegmentId
                }
            })

            res.status(200).json(result);
            
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "An error occured while trying to create a userSegment.",
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

userSegmentRouter.get(
    '/getMySegment',
    passport.authenticate('jwt',{session:false}),
    async(req,res)=>{
        try{
            //get email and user id from request
            const { email, id } = req.user;

            const result = await prisma.userSegments.findFirst({
                where:{userId:id}
            })

            if(!result){
                res.status(404).json("user segment not found!");
            }

            res.status(200).json(result);
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "An error occured while trying to retrieve a userSegment.",
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }
    }
)

userSegmentRouter.delete(
    '/delete',
    passport.authenticate('jwt',{session:false}),
    async(req,res)=>{
        try{
            //get email and user id from request
            const { email, id } = req.user;

            const exist = await prisma.userSegments.findFirst({
                where:{userId:id}
            })

            if(!exist){
                return res.status(400).json("You don't have a user segment to delete!");
            }

            const deleteId = exist.id;

            await prisma.userSegments.delete({
                where:{id:deleteId}
            })

            res.sendStatus(204);
            
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "An error occured while trying to delete a userSegment.",
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

userSegmentRouter.put(
    '/update',
    passport.authenticate('jwt',{session:false}),
    async(req,res)=>{
        try{
            let error = '';
            let errorMessage = '';
            let errorStack = '';

            //get email and user id from request
            const { email, id } = req.user;

            const exist = await prisma.userSegments.findFirst({
                where:{userId:id}
            })

            if(!exist){
                return res.status(400).json("You don't have a user segment to update!");
            }

            const updateId = exist.id;

            const {homeSegmentId,workSegmentId,schoolSegmentId,homeSubSegmentId,workSubSegmentId,schoolSubSegmentId} = req.body;
            
            if(homeSegmentId){
                if(!isInteger(homeSegmentId)){
                    error+='homeSegment Id must be integer.';
                    errorMessage+='homeSegment Id must be provided in request body as an integer.';
                    errorStack+='homeSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.segments.findUnique({
                        where: {segId:homeSegmentId}
                    });

                    if(!queryResult){
                        error+='homeSegmend Id doesn\'t exist in the database!';
                        errorMessage+='homeSegment Id must be provided with a existing segment id in the database.';
                        errorStack+='homeSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(workSegmentId){
                if(!isInteger(workSegmentId)){
                    error+='workSegment Id must be integer.';
                    errorMessage+='workSegment Id must be provided in request body as an integer.';
                    errorStack+='workSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.segments.findUnique({
                        where: {segId:workSegmentId}
                    });

                    if(!queryResult){
                        error+='workSegmend Id doesn\'t exist in the database!';
                        errorMessage+='workSegment Id must be provided with a existing segment id in the database.';
                        errorStack+='workSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(schoolSegmentId){
                if(!isInteger(schoolSegmentId)){
                    error+='schoolSegment Id must be integer.';
                    errorMessage+='schoolSegment Id must be provided in request body as an integer.';
                    errorStack+='schoolSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.segments.findUnique({
                        where: {segId:schoolSegmentId}
                    });

                    if(!queryResult){
                        error+='schoolSegmend Id doesn\'t exist in the database!';
                        errorMessage+='schoolSegment Id must be provided with a existing segment id in the database.';
                        errorStack+='schoolSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(homeSubSegmentId){
                if(!homeSegmentId){
                    error+='homeSegmend Id must be provide if request body contains homeSubSegmentId.';
                    errorMessage+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                    errorStack+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                }

                if(!isInteger(homeSubSegmentId)){
                    error+='homeSubSegment Id must be integer.';
                    errorMessage+='homeSubSegment Id must be provided in request body as an integer.';
                    errorStack+='homeSubSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.subSegments.findFirst({
                        where:{id:homeSubSegmentId,segId:homeSegmentId}
                    });

                    if(!queryResult){
                        error+='homeSubSegment Id doesn\'t exist in the database!';
                        errorMessage+='homeSubSegement Id must be provided with a existing segment id in the database.';
                        errorStack+='homeSubSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(workSubSegmentId){
                if(!workSegmentId){
                    error+='workSegmend Id must be provide if request body contains homeSubSegmentId.';
                    errorMessage+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                    errorStack+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                }

                if(!isInteger(workSubSegmentId)){
                    error+='workSubSegment Id must be integer.';
                    errorMessage+='workSubSegment Id must be provided in request body as an integer.';
                    errorStack+='workSubSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.subSegments.findFirst({
                        where:{id:workSubSegmentId,segId:workSegmentId}
                    });

                    if(!queryResult){
                        error+='workSubSegment Id doesn\'t exist in the database!';
                        errorMessage+='workSubSegement Id must be provided with a existing segment id in the database.';
                        errorStack+='workSubSegment Id must be provided with a existing segment id in the database.';
                    }
                }
            }

            if(schoolSubSegmentId){
                if(!schoolSegmentId){
                    error+='homeSegmend Id must be provide if request body contains homeSubSegmentId.';
                    errorMessage+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                    errorStack+='In order to assign user a subsegment, segmentId must be provided with sub segment id.';
                }

                if(!isInteger(schoolSubSegmentId)){
                    error+='homeSubSegment Id must be integer.';
                    errorMessage+='homeSubSegment Id must be provided in request body as an integer.';
                    errorStack+='homeSubSegment Id must be provided in request body as an integer.';
                }else{
                    const queryResult = await prisma.subSegments.findFirst({
                        where:{id:schoolSubSegmentId,segId:schoolSegmentId}
                    });

                    if(!queryResult){
                        error+='schoolSubSegment Id doesn\'t exist in the database!';
                        errorMessage+='schoolSubSegement Id must be provided with a existing segment id in the database.';
                        errorStack+='schoolSubSegment Id must be provided with a existing segment id in the database.';
                    }
                }
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

            const result = await prisma.userSegments.update({
                where:{id:updateId},
                data:{
                    homeSegmentId:homeSegmentId,
                    workSegmentId:workSegmentId,
                    schoolSegmentId:schoolSegmentId,
                    homeSubsegmentId:homeSubSegmentId,
                    workSubSegmentId:workSubSegmentId,
                    schoolSubSegmentId:schoolSubSegmentId
                }
            })

            res.status(200).json(result);

        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "An error occured while trying to update a userSegment.",
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

module.exports = userSegmentRouter;