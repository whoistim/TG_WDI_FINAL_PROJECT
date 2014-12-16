class AddVideoTimeToMarkers < ActiveRecord::Migration
  def change
    add_column :markers, :video_time, :integer
    add_column :markers, :video_length, :float

  end
end
