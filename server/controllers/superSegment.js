const passport = require('passport');
const express = require('express');
const superSegmentRouter = express.Router();
const prisma = require('../lib/prismaClient');

const { isEmpty, isInteger, isString } = require('lodash');
const { UserType } = require('@prisma/client');

module.exports = superSegmentRouter;