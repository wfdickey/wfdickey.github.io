/* standard Ajax xhr function */

function getHTTPObject() {

    var xhr;

    if (window.XMLHttpRequest) { // check for support
    
        // if it's supported, use it beacuse it's better
        xhr = new XMLHttpRequest();
    
    } else if (window.ActiveXObject) { // check for the IE 6 Ajax
    
        // save it to the xhr variable
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    
    }
    
    // spit out the correct one so we can use it
    return xhr;
}

/* define the Ajax call */

function ajaxCall(dataUrl, outputElement, callback) {
    
    /* use our function to get the correct Ajax object based on support */
    var request = getHTTPObject();
    
    outputElement.innerHTML = "Loading";
    
    request.onreadystatechange = function() {
        
        // check to see if the Ajax call went through
        if ( request.readyState === 4 && request.status === 200 ) {
            
            // save the ajax response to a variable
            var contacts = JSON.parse(request.responseText);
            
            // make sure the callback is indeed a function before executing it
            if(typeof callback === "function"){
            
                callback(contacts);
            
            } // end check
    
        } // end ajax status check
    
    }; // end onreadystatechange
    
    request.open("GET", dataUrl, true);
    request.send(null);

}

/* wrap everything in an anonymous function to contain the variables */

(function(){
    
    /* define the DOM elements and common variables you'll need */
    var searchForm = document.getElementById("search-form"),
        searchField = document.getElementById("q"),
        getAllButton = document.getElementById("get-all"),
        target = document.getElementById("output");
    
    /* define address book methods */
    var addr = {
        
        search : function(event){
            
            // set the output element
            var output = document.getElementById("output"),
                mustacheTemplate = document.getElementById("mustache-template"),
                template = mustacheTemplate.innerHTML;
                
            // start Ajax call 
             ajaxCall('data/contacts.json', output, function (data) {

                // save the input value, contacts length and i to variables
                var searchValue = searchField.value,
                    addrBook = data.addressBook,
                    count = addrBook.length,
                    filteredData = { "addressBook" : [] },
                    i;
                
                // stop the default behavior
                event.preventDefault();
                
                // clear the target area just incase there's something in it.
                target.innerHTML = "";
                
                // check the count, of course
                if(count > 0 && searchValue !== ""){
                
                    // loop through the contacts
                    for(i = 0; i < count; i = i + 1) {
    
                        // look through the name value to see if it contains the searchterm string
                        var obj = addrBook[i],
                            whereFound = obj.name.indexOf(searchValue);
                            // what did you find? --> filteredData variable

                        // anything other than -1 means we found a match
                        if(whereFound !== -1) {

                            filteredData.addressBook.push(obj);

                        } // end if
    
                    } // end for loop
    
                } // end count check

                //render the mustache template by combining the HTML with the JSON data that was returned
                var renderedContent = Mustache.to_html(template, filteredData);

                //put the rendered template into the DOM 
                output.innerHTML = renderedContent;
            
            }); // end ajax call

        },


        getAllContacts : function () {

            // set the output element
            var output = document.getElementById("output"),
                mustacheTemplate = document.getElementById("mustache-template"),
                template = mustacheTemplate.innerHTML;
    

            // start Ajax call
            ajaxCall('data/contacts.json', output, function (data) {
                //render the mustache template by combining the HTML with the JSON data that was returned
                var renderedContent = Mustache.to_html(template, data);

                //put the rendered template into the DOM 
                output.innerHTML = renderedContent;
            
            }); // end ajax call

        } 
    
    }; // end addr object

    // get all contacts when you click the button 
    getAllButton.addEventListener("click", addr.getAllContacts, false);
    
    // activate auto complete on keyUp
    searchField.addEventListener("keyup", addr.search, false);
    
    // set active section on focus of the form field
    searchField.addEventListener("focus", addr.setActiveSection, false);
    
    // remove active section on blur of the form field
    searchField.addEventListener("blur", addr.removeActiveSection, false);
    
    // get all contacts when you click the button
    getAllButton.addEventListener("click", addr.getAllContacts, false);
    
    // add hover class on mouse over of the form field
    searchForm.addEventListener("mouseover", addr.addHoverClass, false);
    
     // remove hover class on mouse out of the form field
    searchForm.addEventListener("mouseout", addr.removeHoverClass, false);
    
    // activate search on form submit
    searchForm.addEventListener("submit", addr.search, false);

    
})(); // end anonymous function