$(function() {
	$( "#tabs" ).tabs();
	$( ".accordion" ).accordion({
		autoHeight: false
	});
	$( "#weight-add-close" ).click(function(){
		$( "#weight-add" ).fadeOut();
	});
	$( "input:submit" ).button().click(function(){ 
		$( "#weight-add" ).fadeOut();
		return false;
	});

});