const router = require("express").Router();
const UserVehicle = require("../models/uservehicle");
const User = require("../models/user");
const uservehicle = require("../models/uservehicle");

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      return res.status(404).json({
        message: "User not found",
        err,
      });
    }
    uservehicle.find({ user: userId })
    .exec((err, vehicles) => {
      if (err) return res.status(400).json({ error: "Error occured" });

      res.status(200).json(vehicles);
    });
  });
});

router.post("/add/:userId/:companyId", async (req, res) => {
  const { userId, companyId } = req.params;
  const vehicle = new UserVehicle(req.body);
  vehicle.company = companyId;
  vehicle.user = userId;
  console.log(vehicle);

  vehicle.save((err, result) => {
    if (err)
      return res.status(400).json({
        error: "Error occured",
        err,
      });

    res.status(200).json({
      message: "Success",
    });
  });
});

module.exports = router;
