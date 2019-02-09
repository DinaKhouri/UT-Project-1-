// replace with our own firebase config copy&paste
// Google API added in the html
// var mapar = {};
// var markerar = {};
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
    var coords = new google.maps.LatLng(myLat, myLong);

    var mapOptions = {
      zoom: 11,
      center: coords,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    marker = new google.maps.Marker({ map: map, position: coords });
    // mapar.push(map);
    // markar.push(marker);
  }

  function failure() {}
});

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

var recentList = [];

var emailList = {};

var username = "Guest";

// -------------------------------------------------------------------------------------------------------

// display searches code begins here

database.ref("Searches").on(
  "child_added",
  function(snapshot) {
    if (snapshot.child("search").exists()) {
      var searchItem = snapshot.val().search;

      recentList.push(searchItem);

      displaySearches();
    }
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

// event listener for search-button that queries the database for user profiles that have the value of "on" for the selected option (optionText).
$(document).on("click", "#search-button", function(event) {
  console.log("button clicked!");
  event.preventDefault();
  var userRef = firebase.database().ref("Users");

  // getting the text value of the drop-down menu selected option.
  var optionText = $("#red-sort option:selected")
    .text()
    .toLowerCase();
  console.log(
    "(Outside child_added scope) Selected Option Text: " + optionText
  );

  userRef
    .orderByChild(optionText)
    .equalTo("on")
    .on("child_added", function(snapshot) {
      var optionText = $("#red-sort option:selected").text();
      console.log("this user needs " + optionText, snapshot.val().username);
      var key = snapshot.key;
      console.log(
        "------------------",
        userRef.GetReference("Users").orderByChild(key)
      );
      console.log(snapshot);
      // $("#append-search").html("user " + snapshot.key + " " + name);
    });
});

// -------------------------------------------------------------------------------------------------------

// user login code starts here

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
  console.log(myLatd);
  console.log(myLongd);
  // myLatd;
  // myLongd;
  var shoes = $("input:checkbox[name=shoes]:checked").val() || null;
  var tissues = $("input:checkbox[name=tissues]:checked").val() || null;
  var towels = $("input:checkbox[name=towels]:checked").val() || null;
  var blanket = $("input:checkbox[name=blanket]:checked").val() || null;
  var shirt = $("input:checkbox[name=shirt]:checked").val() || null;
  var toiliteries =
    $("input:checkbox[name=toiliterries]:checked").val() || null;
  var canOpener = $("input:checkbox[name=canOpener]:checked").val() || null;
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
      toiliteries,
      canOpener,
      pots,
      bed,
      toaster
    );
  }
});

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
  }
});

$(document.body).on("click", "#logout", function() {
  if (logout(email, password) == false) {
    console.log("Logout failed");

    return;
  } else {
    $("#userDisplay").empty();

    username = "Guest";

    var showUser = $("<p>");
    showUser.attr("class", "navbar-text navbar-right");
    showUser.text("Signed in as Guest");

    $("#userDisplay").append(showUser);

    console.log("You're logged out!");
  }
});

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
  toiliteries,
  canOpener,
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
    toiliteries: toiliteries,
    canOpener: canOpener,
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
  //travis u can add this to your code when u are done
  $(".Name").text(name);
  $(".age").text("Age:" + age);
  $(".phone").text("phone#:" + phone);
  $(".email").text("Email:" + email);
  $(".Story").text(story);
  $(".profile-img").attr("src", image);

  var logoutBtn = $("<button>");
  logoutBtn.attr("class", "btn btn-default nav-item navbar-right");
  logoutBtn.attr("id", "logout");
  logoutBtn.text("Logout");

  $("#userDisplay").append(logoutBtn, showUser);

  console.log("You created an account!");
}

function firebaseLogin(email, password) {
  database.ref("Users").on(
    "child_added",
    function(snapshot) {
      if (
        snapshot.child("email").exists() &&
        snapshot.child("username").exists()
      ) {
        var mail = snapshot.val().email;
        var user = snapshot.val().username;

        if (mail == email) {
          $("#userDisplay").empty();

          var showUser = $("<p>");
          showUser.attr("class", "navbar-text navbar-right");
          showUser.text("Signed in as " + user);

          var logoutBtn = $("<button>");
          logoutBtn.attr("class", "btn btn-default nav-item navbar-right");
          logoutBtn.attr("id", "logout");
          logoutBtn.text("Logout");

          $("#userDisplay").append(logoutBtn, showUser);

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

// -------------------------------------------------------------------------------------------------------

// feedback code begins here

// subit button on the modal form
$(document.body).on("click", "#submitFeedback", function() {
  var name = $("#feedbackName")
    .val()
    .trim();
  var email = $("#feedbackEmail")
    .val()
    .trim();
  var message = $("#feedbackMessage")
    .val()
    .trim();
  // push to check function
  runCheck(name, email, message, age, phone, story, image);
});

$(document.body).on("click", "#cancelModal", function() {
  $("#feedbackName").val("");
  $("#feedbackEmail").val("");
  $("#feedbackMessage").val("");
});

// hiding the alert and thank messages after a user closes the modal and reopens it again
$(document.body).on("click", "#responseBtn", function() {
  // grabbing elements by their ids
  var alertMsg = document.getElementById("alertMessage");
  var thankMsg = document.getElementById("thankMessage");

  // checking if alert display is block
  if (alertMsg.style.display === "block") {
    // changes to none if true
    alertMsg.style.display = "none";
  }

  // checking if thank display is block
  if (thankMsg.style.display === "block") {
    // changes to none if true
    thankMsg.style.display = "none";
  }
});

// check function with name, email, and message and arguments
function runCheck(name, email, message) {
  // grab alert message element
  var alertMsg = document.getElementById("alertMessage");
  // grab thank message
  var thankMsg = document.getElementById("thankMessage");

  // if checkname fn returns false
  if (name == "" || message == "") {
    // display block
    alertMsg.style.display = "block";

    // check thank msg
    if (thankMsg.style.display == "block") {
      thankMsg.style.display = "none";
    }

    // end function
    return;
  }

  // check if entered email
  else if (email != "") {
    //if so, if checkemail returns false
    if (!checkEmail(email)) {
      // display block
      alertMsg.style.display = "block";

      // check thank msg
      if (thankMsg.style.display == "block") {
        thankMsg.style.display = "none";
      }

      return;
    }

    // if it returns true
    else {
      // push values
      submitFeedback(name, email, message, age, phone, story);
    }
  }

  // if no email
  else {
    // push values to submit fn
    submitFeedback(name, email, message, age, phone, story);
  }
}

// check if email is properly formatted
function checkEmail(email) {
  var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (email.search(emailRegEx) == -1) {
    return false;
  } else {
    return true;
  }
}

// name email and message as arguements
function submitFeedback(name, email, message) {
  // grab alert message element
  var alertMsg = document.getElementById("alertMessage");
  // grab thank message
  var thankMsg = document.getElementById("thankMessage");

  if (alertMsg.style.display == "block") {
    alertMsg.style.display = "none";
  }
  // display block
  thankMsg.style.display = "block";

  var feedbackData = {
    name: name,
    email: email,
    message: message
  };

  // push info to database
  database.ref("Feedback").push(feedbackData);

  // clear text boxes
  $("#feedbackName").val("");
  $("#feedbackEmail").val("");
  $("#feedbackMessage").val("");

  // end function
  return;
}
