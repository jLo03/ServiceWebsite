$('.drop').click(function () {
	$(this).toggleClass('open').siblings().removeClass('open');
})

$('.drop-menu li').each(function() {
var delay = $(this).index() * 100 + 'ms';

$(this).css({
	'-webkit-transition-delay': delay,
	'-moz-transition-delay': delay,
	'-o-transition-delay': delay,
	'transition-delay': delay
});                  
});



(function() {
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

	
	document.getElementById("button").addEventListener("click", function(){
	  console.log("work in progress");
	});
	$('select').each(function() {
		$(this).hide();
		makeElement($(this));
	});

	function makeElement(select) {
		var
		$div = $('<div />', {class:'ui-select'}).insertAfter(select),
		$nav = $('<span />').click(function() {
			$(this).parent().toggleClass('open');
		}).appendTo($div),
		$el = $('<ul />').appendTo($div);
		select.find('option').map(function(i) {
			
			var li = $('<li />').append($(this).text());
				li.click(onSelect.bind($div, li, $(this).val(), select, $nav));
			if($(this).attr('selected')) {
				li.addClass('selected');
			}
			var delay = i * 100 + 'ms';
			li.css({
				'-webkit-transition-delay': delay,
		        '-moz-transition-delay': delay,
		        '-o-transition-delay': delay,
		        'transition-delay': delay
			});
			$el.append(li);
		});
		var selected = $el.find('li.selected');
			selected = selected.length ? selected.html() : $el.find('li:first-child').addClass('selected').html();
		$nav.html(selected);
		// addAnimateDelay($el);
	}

	function onSelect(li, value, select, $nav) {
		this.removeClass('open');
		li.addClass('selected').siblings().removeClass('selected');
		select.val(value).trigger('change');
		$nav.html(li.html());
	}
})();
$('.click-me').click(function () {
	$('.drop-menu').toggleClass('open');
})