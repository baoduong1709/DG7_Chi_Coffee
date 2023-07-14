const express = require("express");
const route = require("./routes");
const app = express();
const port = 3001;
const db = require("./config/db");
const path = require("path");
const rootDirectory = path.join(__dirname, "resources", "views");
db.connect();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
route(app);
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
