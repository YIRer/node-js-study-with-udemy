const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  } else {
    geocode(
      req.query.address,
      (err, { latitude, longitude, location } = {}) => {
        if (err) {
          return res.send(err);
        }

        forecast(latitude, longitude, (err, data) => {
          if (err) {
            return res.send(err);
          }

          return res.send({
            forecast: data.weather_descriptions.join(),
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "You must provide a search term" });
  } else {
    res.send({ products: [] });
  }
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
