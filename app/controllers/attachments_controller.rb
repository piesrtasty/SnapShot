class AttachmentsController < ApplicationController
  before_filter :authorize
  respond_to :json

  def create
    attachment = current_album.attachments.new({ :upload => params[:upload] })
    attachment.save
    respond_with(current_album, attachment)
  end

  private

  def current_album
    current_user.albums.find(params[:album_id])
  end
end
