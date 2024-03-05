var express = require('express');
var router = express.Router();
const models = require('../models');
const { v4: uuidv4 } = require('uuid')
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`

/* GET users listing. */


router.get('/', async (req, res, next) => {
  const {firstname, lastname1, lastname2, memberType} = req.body
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

router.get('/totis', async (req, res, next) => {

  try {
  
      const workerInfo = await models.Member.findAll(
       { attributes: ['firstname', 'lastname1', 'commercialName1']}
        // include:{ models.Tag, models.Notes}.... etc
    )
  
      res.status(200).send(workerInfo)
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat el membre que busques, revisa les dades oi"})
  }
})

router.post('/', async (req, res, next) => {
  const { data } = req.body
  console.log(data.authorizationImg)
  console.log(data.memberType.label)

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
        memberType: data.memberType || null // ojo que estem hardcoding the enum values al frontend
      })
      // do we need to add fields ?
      res.status(200).send(newMember)
  } catch (err) {
    res.status(500).send(err.message)
  }
})



module.exports = router;
