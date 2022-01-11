const router = require("express").Router();
const async = require("hbs/lib/async");
const CelebrityModel = require("./../models/Celebrity.model");


//Celebrities list
router.get("/celebrities-list", (req, res, next) => {
  CelebrityModel.find()
    .then((celebs) => {
      res.render("celebrities/celebrities", { celebs })
    })
    .catch((err) => console.log(err))
});

//Create new celebrity
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity")
});

router.post("/create", async (req, res, next) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }

  try {
    await CelebrityModel.create(newCelebrity);
    res.redirect("/celebrities-list");
  } catch (err) {
    next(err);
  }
});

module.exports = router;