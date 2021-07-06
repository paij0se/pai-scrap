var Router = require("express").Router;
var exec = require("child_process").exec;
var router = Router();
var rateLimit = require("express-rate-limit");
var limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    message: ({ out: "HTTP ERROR 429 to many requests" })
});
router.post("/url-sent", limiter, function (req, res) {
    var url = req.body.url;
    console.log(url);
    exec("URL=" + url + " ./multithreading", function (error, stdout, stderr) {
        if (error) {
            console.error("error: " + error.message);
            return;
        }
        if (stderr) {
            console.error("stderr: " + stderr);
            return;
        }
        console.log("" + stdout);
        res.send("<h1 align=\"center\">(jpg,png,gif,jpeg), scrapping: <h2 align=\"center\">" + url + "</h2></h1> <p align=\"center\">" + stdout + "</p>");
    });
});
module.exports = router;
