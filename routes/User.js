const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/all", (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(404).json({
        err: "Users Not Found",
      });
    }
    res.status(200).json(users);
  });
});

router.post("/register", (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save user in DB",
        err
      });
    }
    res.json(user);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  //find the first occurence of the email STRICTLY
  User.findOne({ email }, (err, user) => {
    //Checking if no error or no user found
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exist",
      });
    }
    //DO authentication taking given password
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
    // WATCH TOKENS AGAIN , JWT AND EXPRESS-JWT
    //Create Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //Put Token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //Send response to FrontEnd
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
});

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if(err) {
      res.status(400).json({
        message: 'Unable to find user',
        err
      })
    }
    const { firstName, lastName, email, phone, password } = user;
    res.status(200).json({ firstName, lastName, email, phone, password });
  })
})

module.exports = router;
