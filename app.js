const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("", {
  useNewUrlParser: true
});




const itemSchema = {
  number: Number,
  picture: String,
  divice_id: Number,
  channel_id: Number,
  captured_at: String,
  matadata_id: String,
  status: Number
}

const Item = mongoose.model("Item", itemSchema);

const item1 = {
  number: 1,
  picture: "https://fakeimg.pl/40x40/ff0000",
  divice_id: 2,
  channel_id: 1,
  captured_at: "123123123",
  matadata_id: "123123",
  status: 0
}
const item2 = {
  number: 1,
  picture: "https://fakeimg.pl/40x40/ff0000",
  divice_id: 2,
  channel_id: 1,
  captured_at: "123123123",
  matadata_id: "123123",
  status: 0
}
const itemsave1 = new Item(item1);
const itemsave2 = new Item(item2);
itemsave1.save()
itemsave2.save()


app.get("/", function(req, res) {
  Item.find({}, function(err, itemFound) {
    if (!err) {
      res.render("home", {
        startingContent: itemFound
      })

    } else {
      console.log(err)
    }

  })
})


app.get("/add", function(req, res) {
  res.render("add")
})


app.get("/update/:id", function(req, res) {
  Item.findOne({
    _id: req.params.id
  }, function(err, itemFound2) {
    if (!err) {
      res.render("edit", {
        startingContent: itemFound2
      })

    } else {
      console.log(err)
    }
  })
})

app.post("/update/:id", function(req, res) {
  Item.updateOne({
      _id: req.params.id
    }, {
      $set: req.body
    },
    function(err) {
      if (!err) {
        console.log("Update completed ")
      } else {
        console.log(req.body)
      }
    }
  )
  res.redirect("/")

})




app.post("/delete/:id", function(req, res) {
  const itemid = req.params.id;
  // console.log(itemid)
  // Item.findOneAndRemove({ _id: itemid })

  Item.deleteOne({
    _id: itemid
  }, function(err) {
    if (!err) {
      res.redirect("/")
    } else {
      console.log(err)
    }
  })

})









app.post("/", function(req, res) {
  const newone = new Item({
    number: Math.floor(Math.random()*1000),
    picture: req.body.photo,
    divice_id: req.body.divice_id,
    channel_id: req.body.channel_id,
    captured_at: req.body.captured_at,
    matadata_id: req.body.matadata_id
  });
  newone.save()
  res.redirect("/")

})


app.listen(3000, function(req, res) {


  console.log("server started")

})
