const { Router } = require("express");
const { exec } = require("child_process");
const router = Router();

router.post("/message-sent", (req, res) => {
  const { url } = req.body;
  console.log(url);
  exec("./multithreading", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout:\n${stdout}`);
  });
});

module.exports = router;
