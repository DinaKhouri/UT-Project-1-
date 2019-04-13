var config = {
  apiKey: "AIzaSyAWuF94b-EoeNn7avtftZ0sN9AD3MaOiPo",
  authDomain: "ut-project-1-c4752.firebaseapp.com",
  databaseURL: "https://ut-project-1-c4752.firebaseio.com",
  projectId: "ut-project-1-c4752",
  storageBucket: "ut-project-1-c4752.appspot.com",
  messagingSenderId: "867695568882"
};
firebase.initializeApp(config);

var database = firebase.database();
$("#create").on("click", function(event) {
  event.preventDefault();
  //inputs
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();
  var username = $("#username")
    .val()
    .trim();
  var age = $("#age-input")
    .val()
    .trim();
  var phone = $("#phone-input")
    .val()
    .trim();
  var story = $("#story-input")
    .val()
    .trim();
  var image = $("#image-input")
    .val()
    .trim();

  var UserInfo = {
    email: email,
    password: password,
    username: username,
    age: age,
    phone: phone,
    story: story,
    image: image
  };
  // Pushes the train input to the database
  database.ref().push(UserInfo);
  //cleare inputs
  $("#email").val("");
  $("#password").val("");
  $("#username").val("");
  $("#age-input").val("");
  $("#phone-input").val("");
  $("#story-input").val("");
  $("#image-input").val("");
  //show profile info
  $(".Name").text(name);
  $(".age").text("Age:" + age);
  $(".phone").text("phone#:" + phone);
  $(".email").text("Email:" + email);
  $(".Story").text(story);
});

$(".submit-edit").on("click", function(event) {
  event.preventDefault();
  //inputs
  var name = $("#name-input")
    .val()
    .trim();
  var email = $("#email-input")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();
  var username = $("#username")
    .val()
    .trim();
  var age = $("#age-input")
    .val()
    .trim();
  var phone = $("#phone-input")
    .val()
    .trim();
  var story = $("#story-input")
    .val()
    .trim();
  var image = $("#image-input")
    .val()
    .trim();

  var UserInfo = {
    email: email,
    password: password,
    username: username,
    age: age,
    phone: phone,
    story: story,
    image: image
  };
  // Pushes the train input to the database
  database.ref().push(UserInfo);
  //cleare inputs
  $("#email").val("");
  $("#password").val("");
  $("#username").val("");
  $("#age-input").val("");
  $("#phone-input").val("");
  $("#story-input").val("");
  $("#image-input").val("");
  //show profile info
  $(".Name").text(name);
  $(".age").text("Age:" + age);
  $(".phone").text("phone#:" + phone);
  $(".email").text("Email:" + email);
  $(".Story").text(story);
});
