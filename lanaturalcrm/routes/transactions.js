var express = require('express');
var router = express.Router();
const models = require('../models');
const { v4: uuidv4 } = require('uuid')
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`

/* GET users listing. */


router.get('/', async (req, res, next) => {
  const {transactionRef, date, description, base } = req.body
  try {
  
      const workerInfo = memberType === "contact" ? await models.Member.findAll({
        where: {
          firstname, lastname1, lastname2, memberType
        }
        // include: models.Tag, models.Notes.... etc
      })
      : memberType === "entity" ? await models.Member.findAll({
        where: {
          commercialName1, 
        }
      })
      : null
      res.status(200).send('hello, we here')
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat el membre que busques, revisa les dades oi"})
  }
})

router.post('/', async (req, res, next) => {
  const { data } = req.body
  console.log(data)

  try {
      const newMember = await models.Member.create({
        id: uuidv4(),
        firstname : data.firstname || null, 
        lastname1: data.lastname1 || null,
        lastname2: data.lastname2 || null,
        commercialName1: data.commercialName1 || null,
        commercialName2 : data.commercialName2 || null,
        pronouns: data.pronouns || null,
        role: data.role || null,
        officialId: data.officialId || null,
        email: data.email || null,
        address: data.address || null,
        city: data.city || null,
        postcode: data.postcode || null,
        phoneNumber: data.phoneNumber || null,
        authorizationImg: data.authorizationImg || null,
        // memberType: data.memberType.label || null
      })
      // do we need to add fields ?
      res.status(200).send(newMember)
  } catch (err) {
    res.status(500).send(err.message)
  }
})



module.exports = router;
