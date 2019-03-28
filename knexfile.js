// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/lambdaSchool.sqlite3"
    },
    useNullAsDefault: true
  }
};
