class Album < ActiveRecord::Base
  belongs_to :user
  has_many :photos
  validates :user_id, :presence => true
end
