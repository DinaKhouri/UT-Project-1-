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

var recentList = [];

var emailList = {};

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

    // var coords = new google.maps.LatLng(myLat, myLong);

    // var mapOptions = {
    //   zoom: 11,
    //   center: coords,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    //};

    // map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // marker = new google.maps.Marker({ map: map, position: coords });
    // mapar.push(map);
    // markar.push(marker);
  }

  function failure() {}
});

// SEARCH BUTTON FUNCTION
// event listener for search-button that queries the database for user profiles that have the value of "on" for the selected option (optionText).
$(document).on("click", "#search-button", function(event) {
  console.log("search button clicked!");
  event.preventDefault();
  $("#result-list").html("");
  var userRef = firebase.database().ref("Users");

  // getting the text value of the drop-down menu selected option.
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

      $("#result-list").append(
        "<tr class='resultsclick' id='" +
          key +
          "' email='" +
          snapshot.val().email +
          "' password='" +
          snapshot.val().password +
          "'><td> <img class=' profile-img resultsPic' src=" +
          SRC +
          "></td><td>" +
          snapshot.val().username +
          "</td><td>" +
          "Needs " +
          optionText +
          "</td>"
      );
    });
});

// Optional design tool that highlights in red your current mouse target:
// 
// $('body').mousemove(function(event){
//   $(".red").removeClass("red");
//   $(event.target).addClass("red");
// });



// *********************************
// *********************************
// RESULTS TO FULL PROFILE FUNCTION
// *********************************
$(document).on("click", ".resultsclick", function(event) {
  console.log("clicked!");
  // window.location.replace("UserProfile.html");
  // mouse over animation
  var key = $(this).attr("id");
  console.log(key);

// var userRef = firebase.database().ref("Users");
//** let Bkey = $('#'+key).val();
// let okey = $(this).attr('id');
// database.ref("Users").child(Key).remove();
// $('#'+key).val()
  
  // need for this to be specific to clicked division, not all divisions
  
  // var key = $(".resultsclick").val().key;
  // var key = $(".resultsclick").text("id");
  // var email = $(".resultsclick").attr("email");
  // var password = $(".resultsclick").attr("password");

  
  // setTimeout(function(){ myWindow.close() }, 3000);  
  // console.log(okey);
  // console.log(email);
  // console.log(password);
  

  var userRef = firebase.database().ref("Users");
  userRef.orderByKey().equalTo(key).on("child_added", function(snapshot) {
    // var key = snapshot.key;
    var data = snapshot.val();
    var mail = snapshot.val().email;
    var user = snapshot.val().username;
    var age = snapshot.val().age;
    var phone = snapshot.val().phone;
    var story = snapshot.val().story;
    var image = snapshot.val().image;
    var lat = snapshot.val().lat;
    var long = snapshot.val().long;

    console.log(name);

    var newWindow;
    newWindow = window.open("", "newWindow", "width=600, height=900");

  var windowInsertVar = '';

    windowInsertVar += '\x3Cscript>';
    
    windowInsertVar += 'function resizeText(change) {';
    windowInsertVar += 'switch (change) {';
    windowInsertVar += 'case 1:';
    // windowInsertVar += 'document.getElementById(\'textToBeResized\').style.fontSize = "80%"\;';
    windowInsertVar += 'break\;';
    windowInsertVar += 'case 2:';
    // windowInsertVar += 'document.getElementById(\'textToBeResized\').style.fontSize = "120%"\;';
    windowInsertVar += 'break\;';
    windowInsertVar += 'default:';
    // windowInsertVar += 'alert(\'Error\')\;';
    windowInsertVar += '<title>User Profile</title>';
    windowInsertVar += 'break\;';
    windowInsertVar += '}';
    windowInsertVar += '}';
    windowInsertVar += '\x3C/script>';
    windowInsertVar += '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>'
    // windowInsertVar += '<link rel="stylesheet" type="text/css" href="style.css"></link>'
    // windowInsertVar += '<button onclick="resizeText(1)">-</button> Text size <button onclick="resizeText(2)">+</button>)\;';
    windowInsertVar += '<div id="windowHead"><h1>Austin Giving Connection</h1></div>';
    windowInsertVar += '<div class="container my-container"><div class="row"><div class="col-sm-4"><img class="profile-img row" height="400px" width="400px" src="' + image +'"/><h2 id="name-row">Username: '+ user + '</h2><h3 class="age row">Age: '+ age + '</h3><h3 class="phone row">Phone#: '+ phone + '</h3><h3 class="email row">Email: '+ mail + '</h3><h3 id="name-row">My Story: '+ story + '</h3></div></div></div>'
    windowInsertVar += '<button onclick=""><i class="fa fa-map-marker" style="font-size:20px;color:red" aria-hidden="true"></i> Find on Map</button>';
    // windowInsertVar += '<button onclick="', getSpot(lat, long) +'">get Spot</button>';
    // windowInsertVar += '<div class="container my-container"><div class="row"><div class="col-sm-4"><h2 id="name-row">Needs: '+ needs + '</h2>'

    // windowInsertVar += '$("#MapBtn").on("click", 

    function getSpot(lat, long) {
      console.log("getSpot button clicked!");
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
    };

    newWindow.document.write(windowInsertVar);
    newWindow.document.write('<html><head><title>User Profile</title><link rel="stylesheet" type="text/css" href="style.css"></head><body>');
    console.log(key);
  });
});

  // firebasePull(key);

  // function firebasePull(key) {
  //   // database.ref("Users").on("child_added", function(snapshot) {
  
  //       var userRef = firebase.database().ref("Users");
  //       userRef.orderByChild(key).equalTo(key).on("child_added", function(snapshot) {
        // var optionText = $("#red-sort option:selected").text();
        // console.log("this user needs " + optionText + ":", snapshot.val().username);
        

        // NEED
          // var mail = snapshot.val().email;
          // var user = snapshot.val().username;
          // var age = snapshot.val().age;
          // var name = snapshot.val().name;
          // var phone = snapshot.val().phone;
          // var story = snapshot.val().story;
          // var image = snapshot.val().image;
          // var lat = snapshot.val().lat;
          // var long = snapshot.val().long;

  
          //   var showUser = $("<p>");
          //   showUser.attr("class", "navbar-text navbar-right");
          //   showUser.text("Signed in as " + user);
          //   $(".Name").text(name);
          //   $(".age").text("Age:" + age);
          //   $(".phone").text("phone#:" + phone);
          //   $(".email").text("Email:" + email);
          //   $(".Story").text(story);
          //   $(".profile-img").attr("src", image);

            // NEED
  
            // $("#MapBtn").on("click", function() {
            //   var coords = new google.maps.LatLng(lat, long);
  
            //   var mapOptions = {
            //     zoom: 11,
            //     center: coords,
            //     mapTypeId: google.maps.MapTypeId.ROADMAP
            //   };
  
            //   map = new google.maps.Map(
            //     document.getElementById("map"),
            //     mapOptions
            //   );
            //   marker = new google.maps.Marker({ map: map, position: coords });
            //   mapar.push(map);
            //   markar.push(marker);
            // });

            // var myWindow = window.open("", "", "width=700, height=1000");
            // myWindow.document.write(key).html();
            // myWindow.document.write($(".resultsclick").html());
  
            // var logoutBtn = $("<button>");
            // logoutBtn.attr("class", "btn btn-default nav-item navbar-right");
            // logoutBtn.attr("id", "logout");
            // logoutBtn.text("Logout");
  
            // $("#userDisplay").append(logoutBtn, showUser);
  
            // console.log("You're logged in!");
          // })
  //       })
  //     };
  // }); 

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
  // console.log(myLatd);
  // console.log(myLongd);
  // myLatd;
  // myLongd;
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


// SIGN IN FUNCTION
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

  $(".Name").text(name);
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

  console.log("You created an account!");
}




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
        var user = snapshot.val().username;
        var age = snapshot.val().age;
        var name = snapshot.val().name;
        var phone = snapshot.val().phone;
        var story = snapshot.val().story;
        var image = snapshot.val().image;
        var lat = snapshot.val().lat;
        var long = snapshot.val().long;

        if (mail == email) {
          $("#userDisplay").empty();

          var showUser = $("<p>");
          showUser.attr("class", "navbar-text navbar-right");
          showUser.text("Signed in as " + user);
          $(".Name").text(name);
          $(".age").text("Age:" + age);
          $(".phone").text("phone#:" + phone);
          $(".email").text("Email:" + email);
          $(".Story").text(story);
          $(".profile-img").attr("src", image);

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
