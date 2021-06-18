const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    message: "Connected to api"
  })
})

router.use('/user', require('./User'));
router.use('/model', require('./Model'));
router.use('/uservehicle', require('./UserVehicle'));
router.use('/company', require('./Company'));

module.exports = router;