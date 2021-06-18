const Model = require("../models/model");
const user = require("../models/user");
const router = require("express").Router();

// All from a company
router.get("/all/:companyId", (req, res) => {
  const companyId = req.params.companyId;
  Model.find({company: companyId}, (err, model) => {
    if (err)
      return res.status(400).json({
        message: "Cannot find models",
        err,
      });

    res.status(200).json(model);
  });
});

router.post("/add/:companyId", (req, res) => {
  const model = new Model(req.body);
  model.company = req.params.companyId;
  model.save((err, model) => {
    if (err) {
      console.log(err);
      res.status(402).json(err);
    }
    res.status(200).json({ model });
  });
});

router.post("/delete/:companyId", (req, res) => {
  const { companyId } = req.params;

  Model.findByIdAndDelete(companyId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
    }
    res.status(200).json({
      message: "Model deleted successfully",
    });
  });
});

router.post("/update/:modelId", (req, res) => {
  const modelId = req.params.modelId;
  Model.findByIdAndUpdate(modelId, req.body, { new: true }, (err, updated) => {
    if (err) {
      res.status(400).json({
        message: "Cannot update model",
        err,
      });
    }

    res.status(200).json({ message: "Succesfully Updated" });
  });
});

module.exports = router;
