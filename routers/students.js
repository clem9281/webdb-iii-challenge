const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const router = express.Router();
const db = knex(knexConfig.development);

router.route("/").get(async (req, res) => {
  try {
    const students = await db("students");
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry, we couldn't get the students at this time" });
  }
});

module.exports = router;
