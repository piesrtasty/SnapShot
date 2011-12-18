class UserHasManyAlbums < ActiveRecord::Migration
  def up
    add_column :albums, :user_id, :integer
  end

  def down
    remove_column :albums, :user_id
  end
end
