const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const checkForNameAndCohortId = async (req, res, next) => {
  const { name, cohort_id } = req.body;
  //   make sure the name field is present in the request
  if (!name) {
    return res.status(400).json({
      error: "The student name is required"
    });
  }
  // cohort id doesn't need to be present, but if it is it needs to be an existing cohort
  try {
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
  } catch (error) {
    return res.status(500).json({
      error: "Sorry, we couldn't verify that the cohort you supplied exists"
    });
  }
  next();
};

module.exports = checkForNameAndCohortId;
