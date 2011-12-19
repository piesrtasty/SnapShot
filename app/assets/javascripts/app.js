

// $("#session_email").attr("placeholder", "Username");
// $("#session_password").attr("placeholder", "Password");

$("#settings-option").click(function()	{
	$("li.menu-category").each(function()	{
		$(this).removeClass("current");
	})
	$(this).addClass("current");
	$("#content").show();
});

