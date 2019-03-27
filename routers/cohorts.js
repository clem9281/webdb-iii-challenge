const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const router = express.Router();
const db = knex(knexConfig.development);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const cohorts = await db("cohorts");
      res.status(200).json(cohorts);
    } catch (error) {
      res.status(500).json({ error: "Whoops, something went wrong" });
    }
  })
  .post(async (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({ error: "The cohort name is required" });
    }
    try {
      const newCohortId = await db("cohorts").insert(req.body);
      const newCohort = await db("cohorts")
        .where({ id: newCohortId[0] })
        .first();
      res.status(201).json(newCohort);
    } catch (error) {
      res.status(500).json({ error: "Sorry, we couldn't add that cohort" });
    }
  });

module.exports = router;
