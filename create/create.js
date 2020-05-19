window.addEventListener("load", function(){
	console.log("asdf");
	var config = {
	  apiKey: "AIzaSyD7MYy8NoKAp8cD_rA6H9hGApIoIC1i8MY",
	  authDomain: "torontostudentservice-ed779.firebaseapp.com",
	  databaseURL: "https://torontostudentservice-ed779.firebaseio.com",
	  projectId: "torontostudentservice-ed779",
	  storageBucket: "torontostudentservice-ed779.appspot.com",
	  messagingSenderId: "696202748628",
	  appId: "1:696202748628:web:b4b7515d79d994d1119141",
	  measurementId: "G-BZHQRLW91Y"
	};

	firebase.initializeApp(config);


	function signIn() {
		var provider = new firebase.auth.GoogleAuthProvider();
	    firebase.auth().signInWithRedirect(provider).then(function(result) { 
	    	window.location.replace("fbtest.html");
	    });
	}

	var username;
	var userId;
	var userphoto;
	        
	// Check to see if you are logged i
	firebase.auth().onAuthStateChanged(function(user) {
	    if (user == null) {
	    	setTimeout(signIn, 1);
	    	//alert('Please Sign In')
	      	return;

	    } else {
	      	username = user.displayName;
	      	userId = user.uid; // you can also get .displayName, .photoURL, .email
	      	userphoto = user.photoURL;
	      	document.getElementById("name").innerHTML = username;
	                
	    } // end user null check

	}); // end check auth state
	var database = firebase.database();

	document.getElementById("Button").addEventListener("click", function(){
		var listing = document.getElementById("Listing").value;
		var address = document.getElementById("Adress").value;
		var email = document.getElementById("UserEmail").value;
		var time = document.getElementById("timeNeeded").value;
		var jobDescription = document.getElementById("Job").value;
		var classification = document.getElementById("format").value;

		document.getElementById("Listing").value = "";
		document.getElementById("Adress").value = "";
		document.getElementById("UserEmail").value = "";
		document.getElementById("timeNeeded").value = "";
		document.getElementById("Job").value = "";
		document.getElementById("format").value = "classification";

		try {
	      //message input
	      var js_time = Date.now;
	      var tweetid = firebase.database().ref('SA/').push(
	        {"name": listing, 
	         "address": address,
	         "sender": userId, 
	         "senderName": username,
	         "email": email,
	         "hours": time,
	         "description": jobDescription,
	         "class": classification});

	      window.alert("Sucess!"); 

	  	}

	    catch(error) {
	      alert("Message could not be sent due to: " + error );
	    };

	});

});