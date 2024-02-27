var express = require('express');
var router = express.Router();
const models = require('../models');

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`

/* GET users listing. */


router.get('/', async (req, res, next) => {
  const {email, address, postcode, city, telephone, authorization_img, memberType} = req.body
  try {

  } catch (err) {
    res.status(500).send({message: err.message})
  }
})
module.exports = router;
