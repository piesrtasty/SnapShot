class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string   :upload_file_name
      t.string   :upload_content_type
      t.integer  :upload_file_size
      t.datetime :upload_updated_at
      t.integer  :album_id

      t.timestamps
    end
  end
end
