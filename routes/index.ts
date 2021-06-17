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
    res.write(`<p>${stdout}</p>`);
  });
});

module.exports = router;
