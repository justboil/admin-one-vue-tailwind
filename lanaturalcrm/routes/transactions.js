var express = require('express');
var router = express.Router();
const models = require('../models');
const { v4: uuidv4 } = require('uuid')
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`

/* GET users listing. */


router.get('/', async (req, res, next) => {
  const { transactionRef, date, description, base } = req.body
  try {
  
      const allTransactions = await models.Transaction.findAll({

        include: [
          {
            model: models.Transaction_Category,
            attributes: ["category"],
          },
          {
            model: models.Transaction_TipusIVA,
            attributes: ["tipusIVA"],
          },
          {
            model: models.Project,
            attributes: ["name"],
          },
        ],

      })
      res.status(200).send(allTransactions)
  } catch (err) {
    res.status(500).send({message: "no s'ha trobat la transaction que busques, revisa les dades oi"})
  }
})

module.exports = router;
