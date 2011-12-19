var ExampleApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(albums) {
    this.albums = new ExampleApp.Collections.Albums(albums);

    new ExampleApp.Routers.Albums();
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};

$("#session_email").attr("placeholder", "Username");
$("#session_password").attr("placeholder", "Password");