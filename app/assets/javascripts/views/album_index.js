ExampleApp.Views.AlbumsIndex = Support.CompositeView.extend({
  initialize: function() {
    _.bindAll(this, "render");
    this.collection.bind("add", this.render);
  },

  render: function () {
    this.renderTemplate();
    this.renderAlbums();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['albums/index']({ albums: this.collection }));
  },

  renderAlbums: function() {
    var self = this;
    this.collection.each(function(album) {
      var row = new ExampleApp.Views.AlbumItem({ model: album });
      self.renderChild(row);
      self.$('tbody').append(row.el);
    });
  }
});
