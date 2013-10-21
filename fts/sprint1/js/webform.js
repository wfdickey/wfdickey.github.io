/* wrap everything in an anonymous function to contain the variables */ 
(function () {

/* JSON address book to loop through */	

var contacts = {
	"addressBook" : [ 
		{
			"name": "will",
			"email": "wfdickey@gmail.com",
		},
		{
			"name": "charley",
			"email": "charley@gmail.com",
		},
		{
			"name": "sidi",
			"email": "sidi@gmail.com",
		},
		{
			"name": "corey",
			"email": "corey@gmail.com",
		},
		{
			"name": "james",
			"email": "james@gmail.com",
		}
	]
};

	/* define the DOM elements and common variables you'll need */ 
	var searchForm = document.getElementById("search-form"),
		searchField = document.getElementById("q"),
		getAllButton = document.getElementById("get-all"),
		count = contacts.addressBook.length,
		target = document.getElementById("output");

	/* define address book methods */
	var addr = { 

		search : function(event) {

			// save the input value, contacts length and i to variables 
			var searchValue = searchField.value,
				i;

			// stop the default behavior 
			event.preventDefault();

			// clear the target area just in case there's something in it. 
			target.innerHTML = "";

			// check the count, of course
			if(count > 0 && searchValue !== "") {

				// loop through the contacts 
				for(i = 0; i < count; i = i + 1) {

					//look thought the name value to see if it contains the searchterm

					var obj= contacts.addressBook[i]
						isItFound = obj.name.indexOf(searchValue);

					//anything other than -1 means we found a match 
					if(isItFound !== -1) {

						target.innerHTML += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email + '</a></p>';

					} // end if 
				} // end for loop 
			} // end count check 
		},

	getAllContacts : function () {

		var i; 

		// clear the target area just in case there's something in it. 
		target.innerHTML = "";

		// check the count, of course
		if(count > 0){

			//loop through contacts
			for (i = 0; i < count; i = i + 1)  {

				var obj = contacts.addressBook[i];


				/* insert each person's name & mailto link in the email */ 
				target.innerHTML += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">' + obj.email + '</a></p>';

			} // end for loop 	
				
		} // end check count	

	},
	setActiveSection : function(){

		// add a class of "active" to the wrapping div 
		this.parentNode.setAttribute("class", "active");

	},
	removeActiveSection : function(){

		//remove the class from the wrapping div 
		this.parentNode.removeAttribute("class");
	},
	addHoverClass : function(){

		// add the class to the wrapping div 
		searchForm.setAttribute("class", "hovering");
	},
	removeHoverClass : function () {

		// remove the class from the wrapping div 
		searchForm.removeAttribute("class");
	}

} // end addr object 

	/* activate the event listeners */
	searchField.addEventListener("keyup", addr.search, false);
	searchField.addEventListener("focus", addr.setActiveSection, false);
	searchField.addEventListener("blur", addr.removeActiveSection, false);
	getAllButton.addEventListener("click", addr.getAllContacts, false);
	searchForm.addEventListener("mouseover", addr.addHoverClass, false);
	searchForm.addEventListener("mouseout", addr.removeHoverClass, false);
	searchForm.addEventListener("submit", addr.search, false);

})(); // end anonymous function 
