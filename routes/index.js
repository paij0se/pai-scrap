var Router = require("express").Router;
var exec = require("child_process").exec;
var router = Router();
var rateLimit = require("express-rate-limit");
var limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    message: { out: "HTTP ERROR 429 to many requests" }
});
router.post("/url-sent", limiter, function (req, res) {
    var url = req.body.url;
    console.log("input: " + url);
    exec("URL=" + url + " ./multithreading", function (_, stdout, stderr) {
        res.send("<h1 align=\"center\">(jpg,png,gif,jpeg), scrapping: <h2 align=\"center\">" + url + "</h2></h1> <p align=\"center\">" + stdout + "</p>");
    });
});
module.exports = router;
