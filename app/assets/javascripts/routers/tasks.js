ExampleApp.Routers.Albums = Support.SwappingRouter.extend({
  initialize: function() {
    this.el = $('#albums');
    this.collection = ExampleApp.albums; // TODO eventually pass in
  },

  routes: {
    "":          "index",
    "new":       "newAlbum",
    "albums/:id": "show"
  },

  index: function() {
    var view = new ExampleApp.Views.AlbumsIndex({ collection: this.collection });
    this.swap(view);
  },

  newAlbum: function() {
    var view = new ExampleApp.Views.AlbumsNew({ collection: this.collection });
    this.swap(view);
  },

  show: function(albumId) {
    var album = this.collection.get(albumId);
    var albumsRouter = this;
    album.fetch({
      success: function() {
        var view = new ExampleApp.Views.AlbumShow({ model: album });
        albumsRouter.swap(view);
      }
    });
  }
});
