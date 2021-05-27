const passport = require('passport');
const express = require('express');
const segmentRouter = express.Router();
const prisma = require('../lib/prismaClient');

const { isEmpty } = require('lodash');
const { UserType } = require('@prisma/client');



module.exports = segmentRouter;