const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

const staticDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(staticDirectoryPath));

hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "user name" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "user name" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", text: "This is some helpful text." });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    errorMessage: "Help article not found",
    name: "user name",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "user name",
  });
});

app.listen(3000, () => {
  console.log("Sever is up on part 3000.");
});
