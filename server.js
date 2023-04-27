const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");

const {
  loggerOfEvents,
  logEvents,
} = require("./refrences/middleware/logEvent");
const corsOptions = require("./refrences/config/corsOptions");

const PORT = process.env.PORT || 1000;

// custom middleware
// Used for logging events
app.use(loggerOfEvents);

// CROSS ORIGIN RESOURCE SHARING
app.use(cors(corsOptions));

// middleware for accessing all the files in a path
app.use(express.static(path.join(__dirname, "refrences", "public")));

//  middleware that allows the parsing of json data
app.use(express.json());

// server all routes
app.use("/", require("./refrences/routes/root"));
app.use("/employees", require("./refrences/routes/api/employees"));

// Handle all non existing routes
app.all(`*`, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "refrences", "public", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 NOT FOUND" });
  } else {
    res.type(txt).send("404 PAGE NOT FOUND");
  }
});

app.use((err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
  next();
});

app.listen(PORT, console.log(`Server runnning on port ${PORT}`));
