

// $("#session_email").attr("placeholder", "Username");
// $("#session_password").attr("placeholder", "Password");

$("#content").show();

$("#settings-option").click(function()	{
	$("li.menu-category").each(function()	{
		$(this).removeClass("current");
	})
	$(this).addClass("current");
	$("#settings").addClass("active");
	$("#photo-album-holder").removeClass("active");
});




