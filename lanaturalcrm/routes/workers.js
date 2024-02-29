var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', async (req, res, next) => {
  const {firstname, lastname1, lastname2, pronouns, role, officialId, email} = req.body
  try {
    const workerInfo = await models.Worker.findAll({
      where: {
        firstname, lastname1, lastname2
      }
      // include: models.Tag, models.Notes.... etc
    })
    res.status(200).send(workerInfo)
  } catch (err) {
    res.status(500).send({message: err.message})
  }
})

router.get('/all', async (req, res, next) => {
  try {
    const allWorkers = await models.Worker.findAll({
      // attributes: []
    })
    res.status(200).send(allWorkers)
    // decide what to include
  } catch (err) {
    res.status(500).send({message: err.message})
  }
})

router.post('/', async (req, res, next) => {
   try {   
      /// this should be the auth.js file
      res.status(200).send({message: "it is not possible to post a worker, talk to your mailman"})
  } catch (err) {
    res.status(500).send({message: err.message})
  }
})


module.exports = router;
