class PhotosController < ApplicationController
  before_filter :authorize
  respond_to :json

  def create
    photo = current_album.photos.new({ :upload => params[:upload] })
    photo.save
    respond_with(current_album, photo)
  end

  private

  def current_album
    current_user.albums.find(params[:album_id])
  end
end
