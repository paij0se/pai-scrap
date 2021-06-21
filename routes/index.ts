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
      res.send(
        `<h1 align="center">Error check your url:</h1> <h2 align="center">${url}</h2>  <h1 align="center">or there is not images in the DOM (Document Object Model) :( </h1>`
      );
    } else {
      res.send(
        `<h1 align="center">All the Images (jpg,png,gif,jpeg), scrapping: <h2 align="center">${url}</h2></h1> <p align="center">${stdout}</p>`
      );
    }
  });
});

module.exports = router;

