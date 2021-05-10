const passport = require('passport');

const express = require('express');
const advertisementRouter = express.Router();
const prisma = require('../lib/prismaClient');