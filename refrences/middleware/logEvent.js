const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// console.log(
// const randomID = uuid();
//   `The time and date, is currently ${dates}`,
//   `This is a random ID ${randomID}`
// );

const logEvents = async (message, logFile) => {
  const dates = format(new Date(), "PPpp");
  const logItems = `${dates}\t${uuid()}\t${message}`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    } else {
      await fsPromises.appendFile(
        path.join(__dirname, "..", "logs", logFile),
        `${logItems}\n`
      );
      console.log("File appended");
    }
  } catch (err) {
    console.error(err);
  }
};

const loggerOfEvents = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(req.method, req.url, req.path);
  next();
};

module.exports = { loggerOfEvents, logEvents };
