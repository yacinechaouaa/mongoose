require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const port = 3000;

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("data connected");
  })
  .catch((err) => {
    console.log(err);
    console.error("error of connection ");
  });
app.listen(port, () => {
  console.log(` 
  is listening at http://localhost:${port}`);
});


var Schema = mongoose.Schema;

var personSchema = new Schema({
  name: String,
  age: Number,
  favouriteFoods: [String],
});

const Model = mongoose.Model;
const Person = mongoose.model("person", personSchema);

var person = new Person({
  name: "yassine-chaoua",
  age: 22,
  favoriteFoods: ["apple"],
});
person.save((err, data) => {
  if (err) {
    console.log(err);
  }
});
var createManyPeople = function (arrayOfPeople, done) {
  Model.create(arrayOfPeople, (err, data) =>
    err ? done(err) : done(null, data)
  );
};
var findPeopleByName = function (nameTofind, done) {
  var search = Person.find({ name: nameTofind });
  search.exec(function (err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};
var findPersonById = (Id, done) => {
  Person.findById(Id, (err, data) => (err ? done(err) : done(null, data)));
};
var findAndUpdate = function (nameToupdate, done) {
  var newage = 23;

  Person.findOneAndUpdate(
    { name: nameToupdate },
    { age: newage },
    { new: true },
    (err, data) => {
      if (err) {
        done(err);
      }
      done(null, data);
    }
  );
};
var removeById = function (Id, done) {
  Model.findByIdAndRemove(Id, (err, data) =>
    err ? done(err) : done(null, data)
  );
};
