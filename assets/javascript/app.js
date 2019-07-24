//Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBE9utw_0Q4tAzdJ7_FI8ndbliGXXjDtEU",
    authDomain: "train-schedule-52dfc.firebaseapp.com",
    databaseURL: "https://train-schedule-52dfc.firebaseio.com",
    projectId: "train-schedule-52dfc",
    storageBucket: "",
    messagingSenderId: "525757630439",
    appId: "1:525757630439:web:c9f1abe0b1ee5048"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    
    var trainName = $("#train-name-input").val().trim();
    var traiDestination = $("#destination-input").val().trim();
    var trainFrequency = moment($("#frequency-input").val().trim(), "mm").format("mm");
    var trainFirstTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");

   
    var newTrain = {
        name: trainName,
        destination: traiDestination,
        frequency: trainFrequency,
        firstTime: trainFirstTime
    };

    
    database.ref().push(newTrain);
    alert("Train added");

    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
});
  

database.ref().on("child_added", function(childSnapshot) {
    
    var trainName = childSnapshot.val().name;
    var traiDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainFrequencyInSecs = parseInt(childSnapshot.val().frequency)*60;
    var trainFirstTime = moment(childSnapshot.val().firstTime, "HH:mm").unix();
    var now = moment().unix();

    while(trainFirstTime <= now){
        trainFirstTime += trainFrequencyInSecs;
    };

    var fromNow = moment(trainFirstTime - now, "X").format("mm:ss");

    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(traiDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(trainFirstTime, "X").format("HH:mm")),
        $("<td>").text(fromNow),
    );

    
    $("#trainTable").append(newRow);
});
