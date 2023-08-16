const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Defining path
const pathDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");
app.use(express.static(pathDir));
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Mononita" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Mononita" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Mononita" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please enter address.." });
  }

  geocode(
    req.query.address,
    (error, { Latitude, Longitude, Location } = {}) => {
      if (error) return res.send({ error });

      forecast(Latitude, Longitude, (error, locdata) => {
        if (error) return res.send({ error });
        res.send({ Location, forecast: locdata, address: req.query.address });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    title: "Error!",
    message: "Help article not found",
    name: "Mononita",
  });
});

app.get("*", (req, res) => {
  res.render("404Page", {
    title: "Error!",
    message: "Page not found",
    name: "Mononita",
  });
});
app.listen(3000, () => {
  console.log("Server is up at port 3000!");
});
