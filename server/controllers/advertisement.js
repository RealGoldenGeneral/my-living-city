const passport = require('passport');

const express = require('express');
const advertisementRouter = express.Router();
const prisma = require('../lib/prismaClient');

advertisementRouter.post(
    '/create',
    passport.authenticate('jwt',{session:false}),
    async(req,res,next) => {
        const { email, id } = req.user;
        const { adType } = req.body;

        const theUser = await prisma.user.findFirst({where:{id:{equals:{id}}}})

        if
    }
)