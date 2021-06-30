var Router = require("express").Router;
var exec = require("child_process").exec;
var router = Router();
router.post("/url-sent", function (req, res) {
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
