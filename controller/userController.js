const userSc = require("../schema/user_schema");
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    try {
      let dataToStore = await userSc.create(user);
      res.status(200).json(dataToStore);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          status: "error",
          message: "Email or username already exists",
        });
      } else {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong...",
    });
  }
}



exports.login = async (req, res) => {

  const { email, password } = req.body;


  const user = await userSc.findOne({ email });
  if (user == null) {
    res.status(400).send({
      "message": "Invalid email or password"
    })
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send(user);
    } else {
      res.send("Not allowed");
    }

  } catch (error) {
    res.status(500).send({
      "message": "Something went wrong..."
    })
  }
}

exports.getUser = async (req, res) => {

  let id = req.params.id;

  if (id === "all") {
    let data = await userSc.find();
    res.status(200).json(data);
  }
  else {
    let data = await userSc.findOne({ _id: id });
    if (data == null) {
      res.status(400).send({
        "message": "Invalid id"
      })
    }
    try {
      res.status(200).send(data);

    } catch (error) {
      res.status(500).send({
        "message": "Something went wrong..."
      })
    }

  }
}

exports.updateUser = async (req, res) => {
  // update api using patch

  let id = req.params.id;
  let updatedData = req.body;

  let options = { new: true };

  try {
      const data = await userSc.findByIdAndUpdate(id, updatedData, options);

      res.status(201).send(data);
  } catch (error) {
      res.status().send(error.message);
  }
}