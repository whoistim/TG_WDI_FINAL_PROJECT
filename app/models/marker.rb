class Marker < ActiveRecord::Base
  belongs_to :user
  validates :tag,
    presence: true
end
