const { Router } = require("express");
const { exec } = require("child_process");
const router = Router();

router.post("/url-sent", (req, res) => {
  const { url } = req.body;
  console.log(url);
  exec(`URL=${url} ./multithreading`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`${stdout}`);
    if (stdout === "") {
      res.write(
        `<h1 align="center">Error check your url: ${url}, or there is not images in the DOM (Document Object Model) :( </h1>`
      );
    } else {
      res.write(
        `<h1 align="center">All the Images (jpg,png,gif), scrapping: ${url}</h1> <p align="center">${stdout}</p>`
      );
    }
  });
});

module.exports = router;

