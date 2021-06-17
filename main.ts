const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./routes/index"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 3000, 
	() => console.log("server on http://localhost:3000"));
