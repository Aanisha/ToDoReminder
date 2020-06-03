function updateClock(){
    var currentTime = new Date ();
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    	currentTime.setDate(currentTime.getDate());
    	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
    	currentHours = ( currentHours == 0 ) ? 12 : currentHours;
    	var currentTimeString = currentHours + ":" + currentMinutes;
    $(".time-cont").html(currentTimeString);
    $('.date').html(currentTime.getDate() + ' ' + monthNames[currentTime.getMonth()]);
}
$.fn.togglePlaceholder = function(){
    return this.each(function() {
        $(this)
        .data("holder", $(this).attr("placeholder"))
        .focusin(function(){
            $(this).attr('placeholder','');
        })
        .focusout(function(){
            $(this).attr('placeholder',$(this).data('holder'));
        });
    });
};
$(document).ready(function(){
	setInterval('updateClock()', 200);
    $('.settings').click(function(){
        $('.leftside').addClass('flipl');
        $('.rightside').addClass('flipr');
    });
    $('.return').click(function(){
        $('.leftside').removeClass('flipl');
        $('.rightside').removeClass('flipr');
    });
    $("[placeholder]").togglePlaceholder();
});
