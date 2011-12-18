class Attachment < ActiveRecord::Base
  has_attached_file :upload
  belongs_to :album

  def upload_url
    upload.url
  end
end
