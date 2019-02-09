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

//storageService is a reference to firebase storage service — it allows you to use all of the methods they make available for storing data and files.
const storageService = firebase.storage();
//storageRef is a reference to actual instantiation of that service — it will lead you to our specific database and root file location where things get uploaded.
const storageRef = storageService.ref();



//handlers to make sure things happen 
console.log(document.querySelector(".file-select"));
$("#file-select").change(handleFileUploadChange);
document.querySelector(".file-submit").addEventListener("click", handleFileUploadSubmit);
// function gets triggered any time someone selects a new file via the upload via the Choose File upload button. 
var selectedFile;
function handleFileUploadChange(e) {
  //selectedFile will keep track of whatever file user has input via the Choose File button.
selectedFile = e.target.files[0]
console.log("selectedFile", selectedFile);
};
//function to manage the submission
function handleFileUploadSubmit(e) {
    console.log("selectedFile.name", selectedFile.name);
  const uploadTask = storageRef.child(`assets/images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on('state_changed', (snapshot) => {
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
     console.log('success');
  });
}