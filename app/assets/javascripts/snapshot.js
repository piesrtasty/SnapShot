

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
	initialize: function()	{
		this.bind("change:photos", this.parsePhotos);
		this.parsePhotos();
	},
	
	parsePhotos: function()	{
		this.photos = new SnapShot.Collections.Photos(this.get('photos'));
	},
	
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
		"": "index",
		"albums/:id": "show"
	},
	
	index: function()	{
		new SnapShot.Views.AlbumsIndex({ collection: this.collection });
		new SnapShot.Views.AlbumsNew()
	},
	
	show: function(albumId)	{
		new SnapShot.Views.AlbumsIndex({ collection: this.collection });
		var album = this.collection.get(albumId);
		var albumRouter = this;
		album.fetch({
			success: function()	{
				$("li.menu-category").each(function()	{
					$(this).removeClass("current");
				})
				$("#settings").removeClass("active");
				// $(ev.target).addClass("current");
				$("#photo-album-holder").addClass("active");
				// var modelId = $(ev.target).attr("model-id");
				new SnapShot.Views.AlbumShow({model: album});
			}
		})
	}
	
});

SnapShot.Views.AlbumsIndex = Backbone.View.extend({
	el: "#albums",
	
	events: {
		// "click li.album-item": "selectAlbum"
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
		$("#albums").append("<li model-id='" + this.model.get('id') +  "' class='album-item menu-category'>" + "<a href='" + this.albumUrl() + "'> " +  this.model.escape('title') + "</a></li>");
	},
	
	albumUrl: function()	{
		return "#albums/" + this.model.get('id');
	}
	
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
		// _.bindAll(this, "render");
		// 		this.render();
		_.bindAll(this, "render", "uploadSuccess");
    this.model.bind("change", this.render);
		this.render();
	},
	
	render: function()	{
		this.renderPhotos()
		this.attachUploader()
		return this;
	},
	
	renderPhotos: function()	{
		var self = this;
		var $photos = this.$('ul.photos');
		$photos.html('');
		$(this.model.attributes.photos).each(function(index, value)	{
			var photoView = "<li class='photo-album-image'><img height='75' width='75' src=" + value.upload_url + "/><li>";
			$photos.append(photoView);
		});
	},
	
	attachUploader: function()	{
		var uploadurl = "/albums/" + this.model.get('id') + '/photos.json';

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
		this.model.fetch();
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

