

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

SnapShot.Models.Photos = Backbone.Collection.extend({
	model: SnapShot.Models.Photo,
	url: '/photos'
})

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
		alert("selecting");
			$("li.menu-category").each(function()	{
				$(this).removeClass("current");
			})
			$("#settings").removeClass("active");
			$(ev.target).addClass("current");
			$("#photo-album-holder").addClass("active");
			var modelId = $(ev.target).attr("model-id");
			// alert(modelId);
			new SnapShot.Views.AlbumShow({modelId: modelId});
			
			// $("#photo-album-holder h2:eq(2)").remove();
			
			
		}
})

SnapShot.Views.AlbumItem = Backbone.View.extend({
	events: {
	
	},
	
	initialize: function()	{
		_.bindAll(this, "render");
		this.render();
	},
	
	render: function()	{	
		$("#albums").append("<li model-id='" + this.model.get('id') +  "' class='album-item menu-category'>" + this.model.escape('title') + "</li>");
	},
	
	// albumUrl: function()	{
	// 		return "/albums/" + this.model.get('id');
	// 	}
	// 	
});

SnapShot.Views.AlbumShow = Backbone.View.extend({
	el: "#photo-album-holder",
	
	events: {
		"click #uploadButton": "upload"
	},
	
	initialize: function()	{
		_.bindAll(this, "render");
		this.render();
	},
	
	render: function()	{
		// this.renderPhotos()
		this.attachUploader()
	},
	
	renderPhotos: function()	{
		// alert("rendering photos");
	},
	
	attachUploader: function()	{
		var uploadurl = "/albums/" + this.options.modelId + '/photos.json';

		this.uploader = new uploader(this.uploadInput(), {
			url: uploadurl,
			success: this.uploadSuccess,
			prefix: 'upload'
		});
		
		this.uploader.prefilter = function()	{
			var token = $('meta[name="csrf-token"]').attr('content');
			if (token) this.xhr.setRequestHeader('X-CSRF-Token', token);
		}
	},
	
	uploadInput: function()	{
		return this.$('.upload input').get(0);
	},
	
	upload: function()	{
		this.uploader.send();
	},
	
	uploadSuccess: function(data)	{
		alert("win!");
	}
	
	
})


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

