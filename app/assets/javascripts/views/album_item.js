ExampleApp.Views.AlbumItem = Support.CompositeView.extend({
  tagName: "tr",

  events: {
    "change input": "update"
  },

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function () {
    $(this.el).html(JST['albums/item']({ album: this.model }));
    this.renderFormContents();
    return this;
  },

  renderFormContents: function() {
    this.$('label').attr("for", "album_completed_" + this.model.get('id'));
    this.$('label').text(this.model.escape('title'));

    this.$('input').attr("id", "album_completed_" + this.model.get('id'));
    this.$('input').prop("checked", this.model.isComplete());

    this.$('a').attr("href", this.albumUrl());
  },

  albumUrl: function() {
    return "#albums/" + this.model.get('id');
  },

  update: function() {
    var complete = this.$('input').prop('checked');
    this.model.save({ complete: complete });
  }
});
