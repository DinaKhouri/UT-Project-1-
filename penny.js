// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDax84cQtw0wE1Ym3FXrnWDmDraES3M29I",
    authDomain: "image-upload-a9b56.firebaseapp.com",
    databaseURL: "https://image-upload-a9b56.firebaseio.com",
    projectId: "image-upload-a9b56",
    storageBucket: "",
    messagingSenderId: "301908414108"
};
 
firebase.initializeApp(config);

const storageService = firebase.storage();
const storageRef = storageService.ref();


document.querySelector(".file-select").addEventListener("change", handleFileUploadChange);

document.querySelector(".file-submit").addEventListener("click", handleFileUploadSubmit);

let selectedFile;
handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

handleFileUploadSubmit(e) {
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
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
