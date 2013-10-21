/* Checking for local storage */
if(typeof(localStorage))


$(document).ready(function() {
	/* Click submit button to add item to list */ 
    $("#button").click(function() {
        var toAdd = $("input[name=checkListItem]").val();
        $(".list").append($("<a href='#'><div class='item'>" + toAdd + "</div></a>"));

    });

    /*Hit enter to click submit button*/
 	$("form").keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $("#button").click();//Trigger search button click event
        }
    });

 	 /*Click Item to remove it*/
    $(document).on("click", ".item",  function(){
        $(this).remove();
    });
}); 




