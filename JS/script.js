$(document).ready(function() {

	/* This is basic - uses default settings */
	
	$("a#fancybox").fancybox();
	$(this).css('z-index',100000);

	$('#fancybox-img').click(function(){
		//$(this).toggle();
		console.log("Test");
	});
	
	
});