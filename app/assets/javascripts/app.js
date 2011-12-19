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

SnapShot.Views.AlbumsIndex = Backbone.View.extend({
	initialize: function()	{
		_.bindAll(this, "render");
		this.collection.bind("add", this.render);
		this.render();
	},
	
	render: function()	{
		this.renderAlbums();
		return this;
		
	},
	
	renderAlbums: function()	{
		var self = this;
		this.collection.each(function(album)	{
			$("#albums").append("<li>" + album.escape('title') + "</li>");
		})	
	}
})

SnapShot.Views.AlbumItem = Backbone.View.extend({
	
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
	}
});



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
