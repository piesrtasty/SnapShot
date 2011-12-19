object @album

attributes :id, :created_at, :updated_id, :title, :complete, :user_id

child :photos do
  attributes :id, :created_at, :updated_id, :upload_file_name, :upload_url
end
