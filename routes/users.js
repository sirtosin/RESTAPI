const express = require("express");
const router = express.Router();
// Load User model
const User = require("../models/User");
//const multer = require("multer");

//define storage for the images

// const storage = multer.diskStorage({
//   //destination for files
//   destination: function (request, file, callback) {
//     callback(null, "./public/uploads/images");
//   },

//   //add back the extension
//   filename: function (request, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   },
// });

// //upload parameters for multer
// const upload = multer({
//   storage: storage,
//   limits: {
//     fieldSize: 1024 * 1024 * 3,
//   },
// });

// add product
router.post("/item", async (req, res) => {
  const { name, desc, price, image, qty, inCart } = req.body;
  //const image = req.file.filename;
  console.log(req.body);

  const newUser = new User({
    name,
    desc,
    price,
    image,
    qty,
    inCart,
  });
  try {
    const result = await newUser.save();
    res.send("successfull");
  } catch (error) {
    console.log(error);
  }
  //res.send(newUser);
});

//get all products and single product
router.get("/", (req, res) => {
  //all user
  User.find()
    .then((user) => res.send(user))
    .catch((err) => res.send(err.message));
});

//single product
router.get("/:id", async (req, res) => {
  //console.log(req.params.id);
  try {
    const single = await User.findById(req.params.id);
    res.send(single);
  } catch (err) {
    console.log(err);
  }
});

//update product info
router.put("/:id", async (req, res) => {
  try {
    const { name, desc, price, image, qty } = req.body;
    const update = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: { name },
      }
    );
    res.json(update);
  } catch (error) {
    console.log(error);
  }
});

//delete user
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((product) => {
      if (!product) {
        res.status(405).send({
          message: `cannot delete product with ID ${id}, product not found!!!`,
        });
      } else {
        return res.send("deleted");
      }
    })
    .catch((err) => res.send(err.message));
});

module.exports = router;
