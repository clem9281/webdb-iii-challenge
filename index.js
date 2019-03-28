const express = require("express");
const helmet = require("helmet");

// routers
const cohorts = require("./routers/cohorts");
const students = require("./routers/students");

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => res.send("<h1>WebDB III</h1>"));
app.use("/api/cohorts", cohorts);
app.use("/api/students", students);

const port = process.env.PORT || 6500;
app.listen(port, console.log(`Server running on port ${port}`));
