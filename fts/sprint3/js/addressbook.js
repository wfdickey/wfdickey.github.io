(function(){

    /* define address book methods */
    var addr = {
        
        search : function (event) {
            
            // stop the default behavior
            event.preventDefault();
            
            $.getJSON('data/contacts.json', function (data) {
                
                // save the input value, contacts length and i to variables
                var searchValue = $("#q").val(),
                    addrBook = data.addressBook,
                    count = addrBook.length;
                
                // clear the target area just incase there's something in it.
                $('#output').empty();
                
                // check the count, of course
                if (count > 0 && searchValue !== "") {
                    
                    // loop through the contacts
                    $.each(addrBook, function (i, obj) {
                        
                        // look through the name value to see if it contains the searchterm string    
                        var isItFound = obj.name.indexOf(searchValue);
                        
                        // anything other than -1 means we found a match
                        if(isItFound !== -1) {
                        
                            $('#output').append('<p>' + obj.name + ', <a href="mailto:' + obj.email + '">'+ obj.email +'</a><p>');
                        
                        } // end if
                        
                    }); // end each loop
                
                } // end count check
                
            }); // end ajax call
        
        },
        getAllContacts : function () {
            
            // start Ajax call
            $.getJSON('data/contacts.json', function (data) {
                
                var addrBook = data.addressBook,
                    count = addrBook.length;
                
                // clear the target area just incase there's something in it.
                $('#output').empty();
                
                // check the count, of course
                if (count > 0) {
                    
                    // loop through the contacts
                    $.each(addrBook, function (i, obj) {
                       
                        $('#output').append('<p>' + obj.name + ', <a href="mailto:' + obj.email + '">'+ obj.email +'</a><p>');
                    
                    }); // end each
                
                } // end count check
            
            }); // end ajax call
        }
    
    }; // end addr object
    
    /*
        All events attached to the searchbox
    */
    
    $("#q").keyup(addr.search).focus(function () {
        
        $(this).parent().addClass("active");
        
    }).blur(function () {
    
        $(this).parent().removeClass("active");
    
    });
    
    /*
        All events attached to the search form
    */
    
    $("#search-form").hover(function () {
        
        $(this).addClass("hovering");
        
    }, function () {
    
        $(this).removeClass("hovering");
    
    }).submit(addr.search);
    
    /*
        Get all contacts action
    */
       
    $("#get-all").click(addr.getAllContacts);

})();