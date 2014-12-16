class AddYouTubeIdToMarkers < ActiveRecord::Migration
  def change
    add_column :markers, :user_id, :integer
    add_column :markers, :video_id, :string
  end
end
