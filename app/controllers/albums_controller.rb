class AlbumsController < ApplicationController
  before_filter :authorize
  respond_to :html, :json

  def index
    respond_with(@albums = current_user.albums)
  end

  def show
    @album = current_user.albums.find(params[:id])
  end

  def create
    respond_with(current_user.albums.create(params[:album]))
  end

  def update
    album = current_user.albums.find(params[:id])
    album.update_attributes(params[:album])
    respond_with(album)
  end
end
