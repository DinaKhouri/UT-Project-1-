// Google API added in the html

// Initialize Firebase
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

var username = "Guest";

//google coordinates
var myLatd;
var myLongd;
//Google maps function
$(".show").on("click", function() {
  x = navigator.geolocation;

  x.getCurrentPosition(success, failure);

  function success(position) {
    myLat = position.coords.latitude;
    myLong = position.coords.longitude;

    myLatd = myLat;
    myLongd = myLong;
  }

  function failure() {}
});

// SEARCH BUTTON FUNCTION
// Event listener for search-button that queries the database for user profiles that have the value of "on" for the selected option (optionText)
$(document).on("click", "#search-button", function(event) {
  console.log("search button clicked!");
  event.preventDefault();
  $(".result").html(
    "<table class='table'><thead><tr><th scope='col'> Picture</th><th scope='col'> Username</th><th scope='col'> Needs</th><th scope='col'> Profile</th></tr></thead><tbody id='result-list'></tbody></table>"
  );
  var userRef = firebase.database().ref("Users");

  // Getting the text value of the drop-down menu selected option.
  var optionText = $("#red-sort option:selected")
    .text()
    .toLowerCase()
    .trim();
  // console.log(
  //   "(Outside child_added scope) Selected Option Text: " + optionText
  // )

  userRef
    .orderByChild(optionText)
    .equalTo("on")
    .on("child_added", function(snapshot) {
      var optionText = $("#red-sort option:selected").text();
      console.log(
        "this user needs " + optionText + ":",
        snapshot.val().username
      );
      console.log(snapshot);
      // $("#append-search").html("user " + snapshot.key + " " + name);
      var key = snapshot.key;
      var data = snapshot.val();
      console.log(data);
      // var profImage = $("<img>").attr("src", data.image);
      var SRC = data.image;
      // console.log("this is the image", profImage);
      console.log(SRC);
      // "<img src=snapshot.val().image + '.jpg'>";

      // append snapshot values to tbody

      $(".result").append(
        "<tr class='resultsclick' id='" +
          key +
          "'><td><img class='profile-img resultsPic' src=" +
          SRC +
          "></td><td class='nametd '>" +
          snapshot.val().username +
          "</td><td class='needstd'>" +
          "Needs " +
          optionText +
          "</td><td>" +
          "<button type='button' id='popupBtn' class=' btn btn-lg btn-primary'  data-toggle='modal' data-target='#popupmodal'" +
          "name='" +
          snapshot.val().username +
          "' age='" +
          snapshot.val().age +
          "' phone='" +
          snapshot.val().phone +
          "' lat='" +
          snapshot.val().lat +
          "' long='" +
          snapshot.val().long +
          "' story='" +
          snapshot.val().story +
          "' email='" +
          snapshot.val().email +
          "' image='" +
          snapshot.val().image +
          "'>View Profile</td></button></tr><br>"
      );
    });
});

$(document).on("click", "#popupBtn", function(event) {
  //grab info from button attributes
  var name = $(this).attr("name");
  var age = $(this).attr("age");
  var phone = $(this).attr("phone");
  var lat = $(this).attr("lat");
  var long = $(this).attr("long");
  var story = $(this).attr("story");
  var email = $(this).attr("email");
  var image = $(this).attr("image");
  console.log(lat);
  console.log(long);
  console.log(story);
  //show info in html
  $(".Name").text(name);
  $(".age").text("Age:" + age);
  $(".phone").text(phone);
  $(".email").text(email);
  $(".Story").text(story);
  $(".profile-imgpop").attr("src", image);

  $("#MapBtnpopup").on("click", function() {
    var coords = new google.maps.LatLng(lat, long);

    var mapOptions = {
      zoom: 11,
      center: coords,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    marker = new google.maps.Marker({ map: map, position: coords });
    mapar.push(map);
    markar.push(marker);
  });
});

// CREATE ACCOUNT ACTION
$(document.body).on("click", "#create", function() {
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

  var shoes = $("input:checkbox[name=shoes]:checked").val() || null;
  var tissues = $("input:checkbox[name=tissues]:checked").val() || null;
  var towels = $("input:checkbox[name=towels]:checked").val() || null;
  var blanket = $("input:checkbox[name=blanket]:checked").val() || null;
  var shirt = $("input:checkbox[name=shirt]:checked").val() || null;
  var toiletries = $("input:checkbox[name=toiletries]:checked").val() || null;
  var socks = $("input:checkbox[name=socks]:checked").val() || null;
  var pots = $("input:checkbox[name=pots]:checked").val() || null;
  var bed = $("input:checkbox[name=bed]:checked").val() || null;
  var toaster = $("input:checkbox[name=toaster]:checked").val() || null;

  if (create(email, password) == false) {
    console.log("Login failed");

    return;
  } else {
    firebaseCreate(
      email,
      password,
      username,
      age,
      phone,
      story,
      image,
      myLatd,
      myLongd,
      shoes,
      tissues,
      towels,
      blanket,
      shirt,
      toiletries,
      socks,
      pots,
      bed,
      toaster
    );
  }
  $("#modalwindow").modal("hide");
});

// SIGN IN ACTION
$(document.body).on("click", "#signin", function() {
  var email = $("#emailLogin")
    .val()
    .trim();
  var password = $("#passwordLogin")
    .val()
    .trim();

  if (login(email, password) == false) {
    console.log("Login failed");

    return;
  } else {
    firebaseLogin(email, password);
    $("#modalwindow").modal("hide");
  }
});

// LOGOUT FUNCTION
$(document.body).on("click", "#logout", function() {
  if (logout(email, password) == false) {
    console.log("Logout failed");

    return;
  } else {
    window.location.replace("index.html");
    $("#userDisplay").empty();

    username = "Guest";

    var showUser = $("<p>");
    showUser.attr("class", "navbar-text navbar-right");
    showUser.text("Signed in as Guest");

    $("#userDisplay").append(showUser);

    console.log("You're logged out!");
  }
});


// FIREBASE ACCOUNT CREATE FUNCTION
function firebaseCreate(
  email,
  password,
  username,
  age,
  phone,
  story,
  image,
  myLatd,
  myLongd,
  shoes,
  tissues,
  towels,
  blanket,
  shirt,
  toiletries,
  socks,
  pots,
  bed,
  toaster
) {
  var user = {
    email: email,
    password: password,
    username: username,
    age: age,
    phone: phone,
    story: story,
    image: image,
    lat: myLatd,
    long: myLongd,
    shoes: shoes,
    tissues: tissues,
    towels: towels,
    blanket: blanket,
    shirt: shirt,
    toiletries: toiletries,
    socks: socks,
    pots: pots,
    bed: bed,
    toaster: toaster
  };

  database.ref("Users").push(user);

  $("#userDisplay").empty();

  var showUser = $("<p>");
  showUser.attr("class", "navbar-text navbar-right");
  showUser.text("Signed in as " + username);

  //show profile data

  $(".Name").text(username);
  $(".age").text("Age:" + age);
  $(".phone").text("phone#:" + phone);
  $(".email").text("Email:" + email);
  $(".Story").text(story);
  $(".profile-img").attr("src", image);

  $("#MapBtn").on("click", function() {
    x = navigator.geolocation;

    x.getCurrentPosition(success, failure);

    function success(position) {
      myLat = position.coords.latitude;
      myLong = position.coords.longitude;

      var coords = new google.maps.LatLng(myLat, myLong);

      var mapOptions = {
        zoom: 11,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      marker = new google.maps.Marker({ map: map, position: coords });
      mapar.push(map);
      markar.push(marker);
    }

    function failure() {}
  });
  var logoutBtn = $("<button>");
  logoutBtn.attr("class", "btn btn-default nav-item navbar-right");
  logoutBtn.attr("id", "logout");
  logoutBtn.text("Logout");

  $("#userDisplay").append(logoutBtn, showUser);
  $("#createBtn").hide();
  $("#loginBtn").hide();
  console.log("You created an account!");
}

  // PROFILE EDIT ACTION / FUNCTION
  // 1. Connect with Edit Account Modal.
  // 2. Save the input in each field to variables.
  // 3. Push those variables to the database as an .update function.
  // 4. Append the new changes to the UserProfile.html and close the window.
  // Submitchanges = id of edit account submit button.
  // UPDATE: must set the ID of something arbitrary to the user.key on SIGN in.  
  // This way, you can reference the id in the Submitchanges event as a way to select that user in the database.

  $(document.body).on("click", "#Submitchanges", function() {
    console.log("Edit Account Submit Clicked!")
    // event.preventDefault();
    var userRef = firebase.database().ref("Users");

    var keyE = $(".profile-img").attr("id");
    console.log(keyE);

    var email = $("#emailE")
      .val()
      .trim();
    var password = $("#passwordE")
      .val()
      .trim();
    var username = $("#usernameE")
      .val()
      .trim();
    var age = $("#age-inputE")
      .val()
      .trim();
    var phone = $("#phone-inputE")
      .val()
      .trim();
    var story = $("#story-inputE")
      .val()
      .trim();
    var image = $("#image-inputE")
      .val()
      .trim();
  
    var shoes = $("input:checkbox[name=shoes]:checked").val() || null;
    var tissues = $("input:checkbox[name=tissues]:checked").val() || null;
    var towels = $("input:checkbox[name=towels]:checked").val() || null;
    var blanket = $("input:checkbox[name=blanket]:checked").val() || null;
    var shirt = $("input:checkbox[name=shirt]:checked").val() || null;
    var toiletries = $("input:checkbox[name=toiletries]:checked").val() || null;
    var socks = $("input:checkbox[name=socks]:checked").val() || null;
    var pots = $("input:checkbox[name=pots]:checked").val() || null;
    var bed = $("input:checkbox[name=bed]:checked").val() || null;
    var toaster = $("input:checkbox[name=toaster]:checked").val() || null;

    // database.ref("Users").update(user)
   
// .updateChildrenAsync
    userRef.child(keyE).update({
      email: email,
      password: password,
      username: username,
      age: age,
      phone: phone,
      story: story,
      image: image,
      lat: myLatd,
      long: myLongd,
      shoes: shoes,
      tissues: tissues,
      towels: towels,
      blanket: blanket,
      shirt: shirt,
      toiletries: toiletries,
      socks: socks,
      pots: pots,
      bed: bed,
      toaster: toaster
    });
  
// console.log(username);
// console.log(phone);
    // updating navbar login info
    $("#userDisplay").empty();
    var showUser = $("<p>");
    showUser.attr("class", "navbar-text navbar-right");
    showUser.text("Signed in as " + username);

    // updating data on html
    $(".Name").text(username);
    $(".age").text("Age:" + age);
    $(".phone").text("phone#:" + phone);
    $(".email").text("Email:" + email);
    $(".Story").text(story);
    $(".profile-img").attr({
      "src": image,
    });

  });


// FIREBASE LOGIN FUNCTION
function firebaseLogin(email, password) {
  database.ref("Users").on(
    "child_added",
    function(snapshot) {
      if (
        snapshot.child("email").exists() &&
        snapshot.child("username").exists()
      ) {
        var mail = snapshot.val().email;
        var username = snapshot.val().username;
        var age = snapshot.val().age;
        var name = snapshot.val().name;
        var phone = snapshot.val().phone;
        var story = snapshot.val().story;
        var image = snapshot.val().image;
        var lat = snapshot.val().lat;
        var long = snapshot.val().long;
        var key = snapshot.key;
        console.log(age, username);
        // console.log(snapshot.val().key);
        // console.log(snapshot.key);

        if (mail == email) {
          $("#userDisplay").empty();

          var showUser = $("<p>");
          showUser.attr("class", "navbar-text navbar-right");
          showUser.text("Signed in as " + username);
          $(".Name").text(username);
          $(".age").text("Age:" + age);
          $(".phone").text("phone#:" + phone);
          $(".email").text("Email:" + email);
          $(".Story").text(story);
          $(".profile-img").attr({
            "src": image,
            "id": key
          });

          $("#MapBtn").on("click", function() {
            var coords = new google.maps.LatLng(lat, long);

            var mapOptions = {
              zoom: 11,
              center: coords,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(
              document.getElementById("map"),
              mapOptions
            );
            marker = new google.maps.Marker({ map: map, position: coords });
            mapar.push(map);
            markar.push(marker);
          });

          var logoutBtn = $("<button>");
          logoutBtn.attr("class", "btn btn-default nav-item navbar-right");
          logoutBtn.attr("id", "logout");
          logoutBtn.text("Logout");

          $("#userDisplay").append(logoutBtn, showUser);
          $("#createBtn").hide();
          $("#loginBtn").hide();
          console.log("You're logged in!");
        }
      }
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
}

function create(email, password, username) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(
        "User login failed due to " + errorCode,
        errorMessage + ". Please try again!"
      );

      return false;

      // ...
    });
}

function login(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode, errorMessage);

      alert("User login failed due to " + errorCode, errorMessage);

      return false;
    });
}

function logout(email, password) {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      console.log(error);
      // An error happened.
      return false;
    });
}

// user login code ends here

// check if email is properly formatted
function checkEmail(email) {
  var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (email.search(emailRegEx) == -1) {
    return false;
  } else {
    return true;
  }
}
