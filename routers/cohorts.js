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

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();
      if (!cohort) {
        return res
          .status(404)
          .json({ error: "Sorry, we couldn't find a cohort at that id" });
      }
      res.status(200).json(cohort);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't find that cohort at this time" });
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await db("cohorts")
        .where({ id: req.params.id })
        .del();
      if (deleted === 0) {
        return res
          .status(404)
          .json({ error: "There is no cohort entry at that id" });
      }
      const cohorts = await db("cohorts");
      res.status(200).json(cohorts);
    } catch (error) {
      res.status(500).json({
        error: "Sorry, we could not delete that cohort entry at this time"
      });
    }
  });

module.exports = router;
