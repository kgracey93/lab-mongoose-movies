const express = require('express');
const { _router } = require('../app');
const router = express.Router();

const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  console.log('new celebrities page');
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render('celebrities/index', { celebritiesList: celebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new')
})

router.get('/celebrities/:id', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post('/celebrities', (req, res) => {
    const {name, occupation, catchPhrase} = req.body
    console.log(name, occupation, catchPhrase);
    Celebrity.create({
        name, 
        occupation,
        catchPhrase
    }).then((celebrity) => {
        console.log(`${celebrity.name} was added to the database`);
        res.redirect('/celebrities')
    }).catch(err => {
        console.log(err);
        res.render('/celebrities/new')
    })
})

router.post('/celebrities/:id/delete', (req, res) =>{
    Celebrity.deleteOne({_id: req.params.id})
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch(err => {
        console.log(err);
      })
})

module.exports = router;
