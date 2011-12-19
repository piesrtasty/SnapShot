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

window.Albums = new SnapShot.Collections.Albums;

SnapShot.Views.AlbumsIndex = Backbone.View.extend({
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
			$("#albums").append("<li>" + album.escape('title') + "</li>");
		})	
	}
})

SnapShot.Views.AlbumItem = Backbone.View.extend({
	
})

SnapShot.Views.AlbumsNew = Backbone.View.extend({
	el: '#newAlbum',
	
	events: {
		'keypress': 'handleEnter'
	},
	
	initialize: function()	{
		$(this.el).focus();
	},
	
	handleEnter: function(e)	{
		var text = $(this.el).val();
		if (!text || e.keyCode != 13)	{
			return;
		}
		SnapShot.albums.create({
			title: text
		});
		$(this.el).val('');
	}
});

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

// ExampleApp.Views.AlbumsNew = Backbone.View.extend({
//   tagName: 'form',
//   id: "new-album",
// 
//   events: {
//     "submit": "save",
//     "click a.leave": "leave"
//   },
// 
//   initialize: function() {
//     _.bindAll(this, "render", "saved");
//     this.newAlbum();
//   },
// 
//   newAlbum: function() {
//     this.model = new ExampleApp.Models.Album();
//     this.form = new Backbone.Form({ model: this.model });
//   },
// 
//   render: function () {
//     $(this.el).html(this.form.render().el);
//     this.$('ul').append(JST['albums/form_buttons']());
//     return this;
//   },
// 
//   renderFlash: function(flashText) {
//     $(this.el).prepend(JST['albums/flash']({ flashText: flashText, type: 'success' }));
//   },
// 
//   save: function(event) {
//     this.form.commit();
//     this.model.save({}, { success: this.saved });
//     return false;
//   },
// 
//   saved: function() {
//     var flash = "Created album: " + this.model.escape('title');
// 
//     this.collection.add(this.model);
//     this.newAlbum();
//     this.render();
//     this.renderFlash(flash);
//   },
// 
//   leave: function() {
//     this.unbind();
//     this.remove();
//   }
// });


// ExampleApp.Views.AlbumsIndex = Support.CompositeView.extend({
//   initialize: function() {
//     _.bindAll(this, "render");
//     this.collection.bind("add", this.render);
//   },
// 
//   render: function () {
//     this.renderTemplate();
//     this.renderAlbums();
//     return this;
//   },
// 
//   renderTemplate: function() {
//     $(this.el).html(JST['albums/index']({ albums: this.collection }));
//   },
// 
//   renderAlbums: function() {
//     var self = this;
//     this.collection.each(function(album) {
//       var row = new ExampleApp.Views.AlbumItem({ model: album });
//       self.renderChild(row);
//       self.$('tbody').append(row.el);
//     });
//   }
// });

// SnapShot.Routers.Albums = Support.SwappingRouter.extend({
//   initialize: function() {
//     this.el = $('#albums');
//     this.collection = SnapShot.albums; // TODO eventually pass in
//   },
// 
//   routes: {
//     "":          "index",
//     "new":       "newAlbum",
//     "albums/:id": "show"
//   },
// 
//   index: function() {
//     var view = new SnapShot.Views.AlbumsIndex({ collection: this.collection });
//     this.swap(view);
//   },
// 
//   newAlbum: function() {
//     var view = new SnapShot.Views.AlbumsNew({ collection: this.collection });
//     this.swap(view);
//   },
// 
//   show: function(albumId) {
//     var album = this.collection.get(albumId);
//     var albumsRouter = this;
//     album.fetch({
//       success: function() {
//         var view = new SnapShot.Views.AlbumShow({ model: album });
//         albumsRouter.swap(view);
//       }
//     });
//   }
// });
