const router = require('express').Router();
const Company = require('../models/company');

router.get('/all', (req, res) => {
  Company.find().exec((err, companies) => {
    if(err){
      res.status(404).json({
        error: 'No Company found',
        err
      })
    }
    res.status(200).json(companies);
  })
})

router.post('/add', (req, res) => {
  const company = new Company(req.body);
  company.save((err, result) => {
    if(err){
      return res.status(400).json({err});
    }
    return res.status(200).json({
        message: `Company created`
    })
  })
})


router.post('/delete/:companyId', (req, res) => {
  Company.findByIdAndDelete(req.params.companyId, (err, company) => {
    if(err) {
      res.status(404).json({err});
    }
    res.status(200).json({
      message: 'Company deleted successfully'
    })
  })
})

module.exports = router;