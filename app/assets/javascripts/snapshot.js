

var SnapShot = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(albums) {
    this.albums = new SnapShot.Collections.Albums(albums);

    new SnapShot.Routers.Albums();
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};

SnapShot.Collections.Albums = Backbone.Collection.extend({ 
  model: SnapShot.Models.Album, 
  url: '/albums'
});

SnapShot.Models.Album = Backbone.Model.extend({
  urlRoot: '/albums',
});

SnapShot.Models.Photo = Backbone.Model.extend({});

SnapShot.Routers.Albums = Backbone.Router.extend({
	
	initialize: function()	{
		this.el = $("#albums");
		this.collection = SnapShot.albums;
	},	
	
	routes: {
		"": "index"
	},
	
	index: function()	{
		new SnapShot.Views.AlbumsIndex({ collection: this.collection });
		new SnapShot.Views.AlbumsNew()
	}
});

SnapShot.Views.AlbumsIndex = Backbone.View.extend({
	el: "#albums",
	
	events: {
		"click li.album-item": "selectAlbum"
	},
	
	initialize: function()	{
		_.bindAll(this, "render");
		this.collection.bind("all", this.render);
		this.render();
	},
	
	render: function()	{
		this.renderAlbums();
		return this;
		
	},
	
	renderAlbums: function()	{
		var self = this;
		$("#albums").html("");
		this.collection.each(function(album)	{
			new SnapShot.Views.AlbumItem({ model: album});
		})	
	},
	
	selectAlbum: function(ev)	{
		$("li.menu-category").each(function()	{
			$(this).removeClass("current");
		})
		$("#settings").removeClass("active");
		$(ev.target).addClass("current");
		$("#photo-album-holder").addClass("active");
		
		
		// $("#photo-album-holder h2:eq(2)").remove();
		
		
	}
})

SnapShot.Views.AlbumItem = Backbone.View.extend({
	initialize: function()	{
		_.bindAll(this, "render");
		this.render();
	},
	
	render: function()	{
		// $("#albums").append("<li>" + album.escape('title') + "</li>");
		$("#albums").append("<li class='album-item menu-category'>" + this.model.escape('title') + "</li>");
	}
	
})

// SnapShot.Views.AlbumsIndex = Backbone.View.extend({
// 	initialize: function()	{
// 		_.bindAll(this, "render");
// 		this.collection.bind("all", this.render);
// 		this.render();
// 	},
// 	
// 	render: function()	{
// 		this.renderAlbums();
// 		return this;
// 		
// 	},
// 	
// 	renderAlbums: function()	{
// 		var self = this;
// 		$("#albums").html("");
// 		this.collection.each(function(album)	{
// 			$("#albums").append("<li>" + album.escape('title') + "</li>");
// 		})	
// 	}
// })
// 
// SnapShot.Views.AlbumItem = Backbone.View.extend({
// 	
// })

SnapShot.Views.AlbumsNew = Backbone.View.extend({
	el: '#createAlbum',
	
	events: {
		'keypress #newAlbum': 'handleEnter',
		'click #newAlbumBtn': 'handleSubmit'
	},
	
	initialize: function()	{
		$(this.el).focus();
	},
	
	handleEnter: function(e)	{
		var text = $(this.el).find("#newAlbum").val();
		if (!text || e.keyCode != 13)	{
			return;
		}
		var text = $("#newAlbum").val();
		if (!text || e.keyCode != 13)	{
			return;
		}
		SnapShot.albums.create({
			title: text
		});
		$("#newAlbum").val('');
	},
	
	handleSubmit: function()	{
		var text = $("#newAlbum").val();
		if (!text)	{
			return;
		}
		SnapShot.albums.create({
			title: text
		});
		$("#newAlbum").val('');
	}
});

