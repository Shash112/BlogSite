//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://shashank-admin:shashankadmin@atlascluster.nsjn1ok.mongodb.net/blogSite");

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const IntroContent = mongoose.model("IntroContent", postSchema);

const POST = mongoose.model("POST", postSchema);

const defaultdata = [{
  title:"Home",
  content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
},{
  title:"About",
  content:"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
},{
  title:"Contact",
  content:"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
}]



IntroContent.find().then((content)=>{
  if (content.length === 0){
    IntroContent.insertMany(defaultdata).then((response)=>{
      console.log(response);
    })
  }
})

app.get("/", function(req, res){
  POST.find().then((posts)=>{
    IntroContent.findOne({title: "Home"}).then((response)=>{
      res.render("home", {homeContent: response,posts: posts});
    })
  })
})


app.get("/about", function(req, res){
  IntroContent.findOne({title: "About"}).then((response)=>{
    res.render("about", {aboutText: response});
  })
});

app.get("/contact", function(req, res){
  IntroContent.findOne({title: "Contact"}).then((response)=>{
    res.render("contact", {contactText: response});
  })
});

app.get("/compose", function(req, res){
  res.render("compose")
});

app.get("/posts/:postTopic", function(req, res){
  const requestedPost = req.params.postTopic;
  POST.findOne({_id: requestedPost}).then((data)=>{
    if (data != null){
      console.log("Match")
      res.render("post", {post: data})
    }else{
      console.log("not a Match.");
    }
  })
});

app.post("/compose", function(req, res){
  POST.create({
    title: _.capitalize(req.body.title),
    content: req.body.post
  }).then(()=>{
    res.redirect("/");
  })
});











app.listen(process.env.PORT|| 3000, function() {
  console.log("Server started on port 3000");
});
