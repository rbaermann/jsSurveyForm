//Global
const express = require("express");
const app = express();
const session = require("express-session");
const port = 8000;

//Use
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended : true }));
app.use(session({
    secret : "anything",
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge : 60000 }
}));

//Set
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Get/Post
app.get("/", (req, res) => {
    res.render("Index");
});

app.post("/processing", (req, res) => {
    req.session.results = req.body;
    console.log(req.body);
    res.redirect("/result");
});

app.get("/result", (req, res) => {
    res.render("Result", { Result : req.session.results });
});

//Listen
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});