class Album < ActiveRecord::Base
  belongs_to :user
  validates :user_id, :presence => true
  
  def to_json(options = {})
    super(options.merge(:only => [ :id, :title ]))
    end
end
