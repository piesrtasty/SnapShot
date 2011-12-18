var PhotoAlbum = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	init: function()	{
		this.albums = new PhotoAlbum.Collections.Albums(albums);
	  new PhotoAlbum.Routers.Albums()
		if (!Backbone.history.started)	{
			Backbone.history.start();
			Backbone.history.started = true;
		}
	}
}