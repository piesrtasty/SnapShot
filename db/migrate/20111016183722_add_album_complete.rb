class AddAlbumComplete < ActiveRecord::Migration
  def up
    add_column :albums, :complete, :boolean, :default => false, :null => false
  end

  def down
    remove_column :albums, :complete
  end
end
