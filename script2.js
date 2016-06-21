$( document ).ready(function() {
	$("input[type=tel]").mask("99 (999) 999 99 99");
	$("input[type=tel]").keyup(function () {
	   if ($(this).val()) {

	      $("button").fadeIn("fast", "linear");
	      $("button").removeClass("hidden");
	   }
	   else {
	      $("button").fadeOut("fast", "linear");
	   }
	});
	$("button").click(function () {
	   $("input").val('');
	   $(this).hide();
	});
});