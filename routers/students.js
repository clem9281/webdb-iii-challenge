const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const router = express.Router();
const db = knex(knexConfig.development);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const students = await db("students");
      res.status(200).json(students);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't get the students at this time" });
    }
  })
  .post(async (req, res) => {
    const { name, cohort_id } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "The student name is required"
      });
    }
    try {
      //  for fun: check and make sure you are only adding a student to an existing cohort
      if (cohort_id) {
        const cohort = await db("cohorts")
          .where({ id: cohort_id })
          .first();
        if (!cohort) {
          return res
            .status(400)
            .json({ error: "The supplied cohort id must exist" });
        }
      }
      const newStudentId = await db("students").insert(req.body);
      const newStudent = await db("students")
        .where({ id: newStudentId[0] })
        .first();
      res.status(201).json(newStudent);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we could not add a new student at this time" });
    }
  });

module.exports = router;
